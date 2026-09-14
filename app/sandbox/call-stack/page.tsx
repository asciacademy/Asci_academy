import CallStackDive from "@/components/dsa/call-stack-dive";
import Link from "next/link";
import { ArrowLeft, Layers, Terminal } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AxelStage } from "@/components/axel/axel-stage";

export const metadata = {
  title: "Call Stack Simulator Sandbox | ASCI",
};

export default function SandboxCallStackPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-300">
      <Navbar />
      <div className="h-[68px]" />

      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16 w-full flex-1 flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <Link
            href="/programs"
            className="flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={14} />
            <span className="uppercase tracking-widest font-semibold">Back to Courses</span>
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-mono uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
            Interactive Code Sandbox
          </div>
        </div>

        <section id="sandbox-hero" className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 scroll-mt-24">
          <div className="space-y-3">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground tracking-tight">
              How Recursion Works in Memory
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground font-sans max-w-3xl leading-relaxed">
              Step through program memory to see how functions run one by one.
              Watch how a recursive function calls itself, waits for the answer, and passes results back up until complete.
            </p>
          </div>
          <AxelStage
            id="sandbox-hero-robot-anchor"
            sectionId="sandbox-hero"
            label="Call Stack Visualizer"
            emotion="curious"
            scale={0.46}
            size="sm"
          />
        </section>

        {/* Simulator Component */}
        <div className="rounded-2xl border border-border overflow-hidden shadow-xl bg-card">
          <CallStackDive />
        </div>
      </div>

      <Footer />
    </main>
  );
}
