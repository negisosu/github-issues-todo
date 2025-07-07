import { LPContents } from "@/components/landing/LPContents";
import { LPFooter } from "@/components/landing/LPFooter";

export default async function Home() {

  return (
    <div className="flex flex-col min-h-screen">
      <LPContents/>
      <LPFooter/>
    </div>
  );
}
