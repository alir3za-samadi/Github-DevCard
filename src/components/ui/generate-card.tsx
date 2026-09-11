"use client";

import { useRef, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { toBlob } from "html-to-image";

export default function GenerateCard({
  cardName,
  triggerClassName,
  children,
}: {
  cardName?: string | null;
  triggerClassName?: string;
  children: ReactNode;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    const node = cardRef.current;

    const blob = await toBlob(node, {
      cacheBust: true,
      height: node.scrollHeight,
      width: node.scrollWidth,
      pixelRatio: 4,
      style: {
        borderRadius: "0",
        overflow: "visible",
        maxHeight: "none",
      },
    });
    if (!blob) return;

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.download = `${cardName || "github"}-card.png`;
    link.href = url;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button className={`text-xs md:text-sm md:w-30 ${triggerClassName}`}>
            Generate card
          </Button>
        }
      />
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Generate card</DialogTitle>
        </DialogHeader>

        <div
          ref={cardRef}
          className="bg-background p-6 rounded-2xl space-y-6 max-h-[60vh] overflow-y-auto"
        >
          {children}
        </div>

        <DialogFooter className="flex-col sm:justify-between gap-2 sm:gap-0">
          <Button onClick={handleDownload}>Download Card</Button>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
