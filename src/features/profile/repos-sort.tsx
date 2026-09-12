import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/base/select";
import { SORT_OPTIONS } from "@/lib/constants";
import type { SortOptionsValue } from "@/lib/types";

export default function ReposSort({
  sortBy,
  onValueChange,
}: {
  sortBy: SortOptionsValue;
  onValueChange: (value: SortOptionsValue) => void;
}) {
  return (
    <div className="flex items-center w-1/2 gap-2 text-xs text-muted-foreground">
      <span className="min-w-fit">Sort by:</span>

      <Select
        items={SORT_OPTIONS}
        value={sortBy}
        onValueChange={(val) => {
          if (val) onValueChange(val);
        }}
      >
        <SelectTrigger className="w-full max-w-40 text-xs md:text-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort Type</SelectLabel>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
