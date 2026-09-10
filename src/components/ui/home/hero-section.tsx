import { GitBranch, Sparkles, Star, Terminal } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center text-center space-y-6 mx-auto px-4">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/60 bg-muted/50 backdrop-blur-md text-xs font-medium text-muted-foreground shadow-sm animate-fade-in">
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        <span>GitHub Analytics & Card Generator</span>
      </div>

      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-balance leading-tight sm:leading-none">
        Discover & Export <br />
        <span className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          GitHub Developer Profiles
        </span>
      </h1>

      <p className="text-muted-foreground text-base sm:text-lg max-w-xl text-balance">
        Search any username to inspect top repositories, generate crisp card
        images, and export developer stats in seconds.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs font-medium text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500/20" />
          <span>Starred Repos</span>
        </div>
        <div className="flex items-center gap-1.5">
          <GitBranch className="w-4 h-4 text-indigo-500" />
          <span>Forks Included</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Terminal className="w-4 h-4 text-emerald-500" />
          <span>JSON Export</span>
        </div>
      </div>
    </section>
  );
}
