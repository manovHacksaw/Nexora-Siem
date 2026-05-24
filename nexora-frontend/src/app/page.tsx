'use client';

import { useEffect, useState } from 'react';
import KPICards from '@/components/KPICards';
import ThreatActivityTimeline from '@/components/ThreatActivityTimeline';
import LoginFailureHeatmap from '@/components/LoginFailureHeatmap';
import ThreatSeverityGauge from '@/components/ThreatSeverityGauge';
import LiveEventStream from '@/components/LiveEventStream';
import HuntConsole from '@/components/HuntConsole';
import MitreMatrix from '@/components/MitreMatrix';
import IOCFeedsTable from '@/components/IOCFeedsTable';
import AttackChainFlow from '@/components/AttackChainFlow';
import RecentAlerts from '@/components/RecentAlerts';
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
      <div className="px-6 py-6 space-y-6">
        {/* KPI Cards Section */}
        <KPICards alerts={alerts} />

        {/* Analytics Grid - 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <ThreatActivityTimeline alerts={alerts} />
            <LoginFailureHeatmap />
          </div>
          <div className="space-y-6">
            <ThreatSeverityGauge alerts={alerts} />
            <LiveEventStream alerts={alerts} />
          </div>
        </div>

        {/* Hunt Console - Full Width */}
        <HuntConsole />

        {/* MITRE Matrix - Full Width */}
        <MitreMatrix />

        {/* IOC Feeds - Full Width */}
        <IOCFeedsTable />

        {/* Attack Chain Flow - Full Width */}
        <AttackChainFlow />

        {/* Recent Alerts Table - Full Width */}
        <RecentAlerts alerts={alerts} onInvestigate={handleInvestigate} />
      </div>

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
