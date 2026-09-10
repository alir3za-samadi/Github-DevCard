import { Separator } from "@/components/ui/separator";

export default function PageHeader({ title }: { title: string }) {
  return (
    <>
      <h1 className="text-2xl text-center font-semibold">{title}</h1>

      <Separator />
    </>
  );
}
