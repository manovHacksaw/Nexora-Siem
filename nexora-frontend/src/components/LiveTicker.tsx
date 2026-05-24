import { Alert } from '@/types/alert';

interface LiveTickerProps {
  alerts: Alert[];
}

export default function LiveTicker({ alerts }: LiveTickerProps) {
  const latestAlerts = alerts.slice(0, 5);

  return (
    <div className="border-b border-border bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3 overflow-hidden">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-accent animate-pulse">LIVE</span>
          <div className="flex-1 overflow-hidden">
            <div className="animate-scroll whitespace-nowrap text-sm text-muted-foreground">
              {latestAlerts.length > 0
                ? latestAlerts
                    .map((alert) => `🚨 ${alert.alert_type} from ${alert.source_ip}`)
                    .join('   •   ')
                : 'Waiting for alerts...'}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
