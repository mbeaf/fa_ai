import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left panel - branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 bg-surface">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold text-primary mb-4">Chost AI</h1>
          <p className="text-secondary text-lg mb-8">
            Real-time collaborative system design workspace
          </p>
          <ul className="space-y-3 text-secondary">
            <li className="flex items-start">
              <span className="text-accent-primary mr-2">•</span>
              <span>Collaborative canvas for system design</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent-primary mr-2">•</span>
              <span>AI-powered architecture generation</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent-primary mr-2">•</span>
              <span>Generate technical specifications</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Right panel - sign-in form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-base">
        <div className="w-full max-w-md">
          <SignIn />
        </div>
      </div>
    </div>
  );
}
