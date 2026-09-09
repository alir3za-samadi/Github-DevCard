import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-100 gap-4 text-center mx-auto">
      <AlertCircle className="w-12 h-12 text-destructive" />
      <h2 className="text-xl font-bold">User Not Found 404!</h2>
      <p className="text-muted-foreground text-sm">
        The requested username is not available on GitHub.
      </p>

      <Button render={<Link href="/" />}>Search another Username</Button>
    </div>
  );
}
