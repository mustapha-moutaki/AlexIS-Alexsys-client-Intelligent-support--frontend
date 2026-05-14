import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BORDER = "1px solid #e5e7eb";
const BG = "#ffffff";

const ButtonGoBack = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center justify-center rounded-xl transition-all hover:bg-gray-50 hover:scale-[1.03] cursor-pointer"
      style={{
        width: 34,
        height: 34,
        border: BORDER,
        background: BG,
      }}
    >
      <ArrowLeft size={16} className="text-gray-700" />
    </button>
  );
};

export default ButtonGoBack;