"use client";

import { useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/base/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/base/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/base/dropdown-menu";
import { toBlob } from "html-to-image";
import { Download, Share2, Copy, Check, Send } from "lucide-react";

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
  const [copied, setCopied] = useState(false);

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

  const handleShare = (platform: "telegram" | "twitter" | "linkedin") => {
    const currentUrl = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Check out this Github stats on DevCard!");

    const shareUrls = {
      telegram: `https://t.me/share/url?url=${currentUrl}&text=${text}`,
      twitter: `https://twitter.com/intent/tweet?url=${currentUrl}&text=${text}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`,
    };

    window.open(shareUrls[platform], "_blank", "noopener,noreferrer");
  };

  const handleCopyLink = async () => {
    const currentUrl = window.location.href;
    await navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          <div className="flex gap-2">
            <Button onClick={handleDownload} className="flex-1 gap-2 ">
              <Download />
              Download Card
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="outline" className="flex-1 gap-2">
                    <Share2 size={16} />
                    Share
                  </Button>
                }
              />
              <DropdownMenuContent align="center" className="w-full">
                <DropdownMenuItem
                  onClick={handleCopyLink}
                  className="gap-2 cursor-pointer"
                >
                  {copied ? (
                    <Check size={16} className="text-green-500" />
                  ) : (
                    <Copy size={16} />
                  )}
                  {copied ? "Copied!" : "Copy Link"}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleShare("telegram")}
                  className="gap-2 cursor-pointer"
                >
                  <Send size={16} />
                  Telegram
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleShare("twitter")}
                  className="gap-2 cursor-pointer"
                >
                  <XIcon className="h-4 w-4" />
                  Twitter / X
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleShare("linkedin")}
                  className="gap-2 cursor-pointer"
                >
                  <LinkedinIcon className="h-4 w-4" />
                  LinkedIn
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <DialogClose render={<Button variant="outline">Cancel</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <title>X (formerly Twitter)</title>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.598-6.638 7.598H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <title>LinkedIn</title>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.73V1.729C24 .774 23.205 0 22.225 0z" />
    </svg>
  );
}
