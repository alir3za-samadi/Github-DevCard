"use client";

import { Button } from "@/components/base/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/base/select";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TOP_LANGUAGES } from "@/lib/constants";
import type { Language, Languages } from "@/lib/types";

export default function SortSection({
  languages,
  currentLang,
}: {
  languages: Languages;
  currentLang: Language;
}) {
  const router = useRouter();

  return (
    <>
      <div className="hidden w-2/3 md:flex md:flex-wrap items-center gap-2">
        {languages.map((lang) => {
          const isActive = lang.value === currentLang.value;
          return (
            <Button
              key={lang.value}
              variant={isActive ? "default" : "outline"}
              className="px-4"
              nativeButton={false}
              render={
                <Link href={`/trending?lang=${lang.value}`} scroll={false}>
                  {lang.label}
                </Link>
              }
            />
          );
        })}
      </div>

      <div className="md:hidden">
        <Select
          items={TOP_LANGUAGES}
          value={currentLang}
          onValueChange={(val) => {
            router.push(`/trending?lang=${val}`, { scroll: false });
          }}
        >
          <SelectTrigger className="w-full max-w-40 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Filtered Type</SelectLabel>
              {TOP_LANGUAGES.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
