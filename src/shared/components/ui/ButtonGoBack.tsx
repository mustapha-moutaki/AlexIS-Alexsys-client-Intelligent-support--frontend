import {
  ArrowLeft,
} from "lucide-react";

const BORDER = "1px solid rgba(255,255,255,0.08)";
const GLASS = "rgba(255,255,255,0.03)";
import { useRouter } from "next/navigation";

const ButtonGoBack = () => {
    const router = useRouter();
    return (
        <button
                  onClick={() => router.back()}
                  className="flex items-center justify-center rounded-xl transition-all hover:scale-105 hover:bg-white/5"
                  style={{ width: 34, height: 34, border: BORDER, background: GLASS }}
                >
                  <ArrowLeft size={16} className="text-white/60" />
                </button>
    )
}
export default ButtonGoBack;