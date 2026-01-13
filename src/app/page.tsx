export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">Lender</h1>
        <p className="text-muted-foreground text-lg">
          Your application is ready. Start building!
        </p>
        <div className="flex gap-4 justify-center">
          <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
            Get Started
          </button>
          <button className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium border border-border hover:bg-accent transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </main>
  );
}
