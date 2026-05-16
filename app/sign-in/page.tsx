import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-16 bg-surface">
        <div className="max-w-xs">
          <h1 className="text-2xl font-bold text-primary mb-2">Chost AI</h1>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            Real-time collaborative system design workspace
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <span className="text-accent-primary mt-0.5 shrink-0">•</span>
              <span>Collaborative canvas for system design</span>
            </li>
            <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <span className="text-accent-primary mt-0.5 shrink-0">•</span>
              <span>AI-powered architecture generation</span>
            </li>
            <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <span className="text-accent-primary mt-0.5 shrink-0">•</span>
              <span>Generate technical specifications</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-base">
        <div className="w-full max-w-sm">
          <SignIn />
        </div>
      </div>
    </div>
  );
}
