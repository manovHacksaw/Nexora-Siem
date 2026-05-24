'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import AlertStats from '@/components/AlertStats';
import LiveTicker from '@/components/LiveTicker';
import AlertCharts from '@/components/AlertCharts';
import RecentAlerts from '@/components/RecentAlerts';
import ThreatHunt from '@/components/ThreatHunt';
import MitrePanel from '@/components/MitrePanel';
import CorrelationPanel from '@/components/CorrelationPanel';
import ThreatIntelPanel from '@/components/ThreatIntelPanel';
import AlertModal from '@/components/AlertModal';
import { Alert } from '@/types/alert';

export default function Dashboard() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadDashboard();

    // WebSocket connection for live alerts
    const connectWebSocket = () => {
      try {
        const socket = new WebSocket('ws://127.0.0.1:8000/ws/live-alerts');

        socket.onopen = () => {
          console.log('[INFO] WebSocket connected');
          socket.send('frontend_connected');
        };

        socket.onmessage = () => {
          loadDashboard();
        };

        socket.onclose = () => {
          console.log('[INFO] WebSocket disconnected');
          // Reconnect after 5 seconds
          setTimeout(connectWebSocket, 5000);
        };

        socket.onerror = () => {
          socket.close();
        };
      } catch (error) {
        console.error('WebSocket error:', error);
      }
    };

    connectWebSocket();

    // Fallback refresh every 30 seconds
    const interval = setInterval(loadDashboard, 30000);

    return () => clearInterval(interval);
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/alerts/recent');
      const data = await response.json();
      setAlerts(data.alerts || []);
    } catch (error) {
      console.error('Dashboard load error:', error);
    }
  };

  const handleInvestigate = (alert: Alert) => {
    setSelectedAlert(alert);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAlert(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <LiveTicker alerts={alerts} />

      {/* Main content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Alert Statistics */}
        <AlertStats alerts={alerts} />

        {/* Charts */}
        <AlertCharts alerts={alerts} />

        {/* Threat Hunt */}
        <ThreatHunt />

        {/* MITRE ATT&CK Mapping */}
        <MitrePanel alerts={alerts} />

        {/* Threat Intelligence */}
        <ThreatIntelPanel alerts={alerts} />

        {/* Correlated Attack Chains */}
        <CorrelationPanel />

        {/* Recent Alerts Table */}
        <RecentAlerts alerts={alerts} onInvestigate={handleInvestigate} />
      </main>

      {/* Alert Modal */}
      {selectedAlert && (
        <AlertModal
          alert={selectedAlert}
          isOpen={showModal}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
