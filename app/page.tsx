import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Layers, Sparkles, FileText } from "lucide-react";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/editor");
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] px-6 text-center">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground mb-8">
            <Sparkles className="size-4 text-accent-primary" />
            AI-powered system design workspace
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-primary mb-6">
            Design systems with <span className="text-accent-primary">AI</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Describe your architecture in plain English. Fa AI maps it onto a
            shared canvas, your team refines it, and the app generates a
            technical specification from the final graph.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/sign-up">
                Get started
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/sign-in">Sign in</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto grid gap-6 sm:grid-cols-3">
          <Card className="p-6">
            <div className="size-10 rounded-lg bg-accent-primary/10 flex items-center justify-center mb-4">
              <Layers className="size-5 text-accent-primary" />
            </div>
            <h3 className="text-base font-medium text-primary mb-2">
              Collaborative Canvas
            </h3>
            <p className="text-sm text-muted-foreground">
              Real-time shared canvas with live cursors, presence indicators,
              and node/edge editing for your whole team.
            </p>
          </Card>
          <Card className="p-6">
            <div className="size-10 rounded-lg bg-accent-primary/10 flex items-center justify-center mb-4">
              <Sparkles className="size-5 text-accent-primary" />
            </div>
            <h3 className="text-base font-medium text-primary mb-2">
              AI Generation
            </h3>
            <p className="text-sm text-muted-foreground">
              Describe your system in natural language and let AI generate
              nodes, edges, and structure into your canvas.
            </p>
          </Card>
          <Card className="p-6">
            <div className="size-10 rounded-lg bg-accent-primary/10 flex items-center justify-center mb-4">
              <FileText className="size-5 text-accent-primary" />
            </div>
            <h3 className="text-base font-medium text-primary mb-2">
              Tech Specs
            </h3>
            <p className="text-sm text-muted-foreground">
              Convert your finalized architecture graph into a polished Markdown
              technical specification with one click.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
}
