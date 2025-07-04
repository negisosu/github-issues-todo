import { LPContents } from "@/components/landing/LPContents";
import { LPFooter } from "@/components/landing/LPFooter";
import { LPHeader } from "@/components/landing/LPHeader";

export default async function Home() {

  return (
    <div className="flex flex-col min-h-screen">
      <LPHeader/>
      <LPContents/>
      <LPFooter/>
    </div>
  );
}
