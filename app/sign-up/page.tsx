import { SignUp } from "@clerk/nextjs";
import { Sparkles, Users, FileText } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI Architecture Generation",
    description: "Describe your system, AI maps it to nodes and edges on a live canvas.",
  },
  {
    icon: Users,
    title: "Real-time Collaboration",
    description: "Live cursors, presence indicators, and shared node editing across your team.",
  },
  {
    icon: FileText,
    title: "Instant Spec Generation",
    description: "Export a complete Markdown technical spec directly from the canvas graph.",
  },
];

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col bg-surface">
        {/* Logo */}
        <div className="px-8 pt-6">
          <div className="flex items-center gap-3">
            <div className="size-6 rounded bg-accent-primary" />
            <span className="text-lg font-semibold text-primary">Ghost AI</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center px-12 pb-16">
          <div className="max-w-lg">
            <h1 className="text-4xl font-bold text-primary leading-tight mb-4">
              Design systems at the
              <br />
              speed of thought.
            </h1>
            <p className="text-base text-muted-foreground mb-12 leading-relaxed">
              Describe your architecture in plain English. Ghost AI maps it to a
              shared canvas your whole team can refine in real time.
            </p>

            <div className="space-y-8">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="size-9 rounded-lg bg-accent-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <feature.icon className="size-4 text-accent-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-primary mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-base">
        <div className="w-full max-w-md">
          <SignUp
            routing="path"
            path="/sign-up"
            signInUrl="/sign-in"
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "bg-surface border border-border rounded-2xl shadow-none",
                headerTitle: "text-xl font-semibold text-primary",
                headerSubtitle: "text-sm text-muted-foreground",
                socialButtonsBlockButton:
                  "bg-surface border border-border text-primary hover:bg-elevated rounded-xl h-11",
                socialButtonsBlockButtonArrow: "text-muted-foreground",
                dividerLine: "bg-border",
                dividerText: "text-muted-foreground text-xs",
                formFieldLabel: "text-sm font-medium text-primary",
                formFieldInput:
                  "bg-elevated border-border text-primary rounded-xl h-11",
                formButtonPrimary:
                  "bg-accent-primary hover:bg-accent-primary/90 text-primary-foreground rounded-xl h-11 font-medium",
                footerActionLink: "text-accent-primary hover:text-accent-primary/80",
                footerActionText: "text-muted-foreground text-sm",
                identityPreviewText: "text-sm text-muted-foreground",
                identityPreviewEditButton: "text-accent-primary",
                formResendCodeLink: "text-accent-primary",
                unsafeMetadataText: "text-muted-foreground text-xs",
                badge: "hidden",
                footer: "border-t border-border",
                footerAction: "pb-4",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
