"use client";

import { startTransition } from "react";
import { Button } from "@/components/base/button";
import { CloudAlert } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { refresh } = useRouter();

  function handleRetry() {
    startTransition(() => {
      refresh();
      reset();
    });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-100 gap-4 text-center mx-auto">
      <CloudAlert className="w-12 h-12 text-destructive" />
      <h2 className="text-xl font-bold">Something Went Wrong!</h2>
      <p className="text-muted-foreground text-sm">
        {error.message || "An unexpected error has occurred"}
      </p>

      <Button onClick={handleRetry}>Try Again</Button>
    </div>
  );
}
