export default function Header() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <span className="text-lg font-bold text-primary-foreground">N</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Nexora SIEM</h1>
            <p className="text-xs text-muted-foreground">Security Intelligence Platform</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="relative w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-muted-foreground">SOC ACTIVE</span>
          </div>
        </div>
      </div>
    </header>
  );
}
