import Image from "next/image";
import { SpinnerButton } from "@/src/shared/components/ui/ButtonSnipper";
export default function Home() {
  return (
    <>
    <h1>
      Welcome to Alexis Support System
    </h1>
    <p>system: <span className="text-green-400">status: up</span></p>
    <div>
      <SpinnerButton />
    </div>
    </>
  );
}
