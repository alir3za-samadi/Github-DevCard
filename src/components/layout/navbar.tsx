import Link from "next/link";
import { Code2, GitCompare, TrendingUp, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Navbar() {
  const navItems = [
    { href: "/compare", label: "Compare", icon: GitCompare },
    { href: "/trending", label: "Trending", icon: TrendingUp },
  ];

  return (
    <header className="border-b border-border bg-background/70 backdrop-blur sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Code2 className="w-6 h-6 text-primary" />
          <span>DevCard</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger aria-label="Open Menu" render={<button />}>
              <Menu className="w-5 h-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-62.5 sm:w-75">
              <SheetHeader>
                <SheetTitle className="text-left flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-primary" />
                  DevCard
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-6">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 text-base text-muted-foreground hover:text-foreground transition-colors py-2 pl-4 border-b border-border/40"
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
