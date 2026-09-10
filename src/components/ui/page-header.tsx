import { Separator } from "@/components/ui/separator";

export default function PageHeader({ title }: { title: string }) {
  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-semibold">{title}</h1>
      </div>
      <Separator />
    </>
  );
}
