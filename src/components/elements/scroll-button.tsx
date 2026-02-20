import { ChevronLeft, ChevronRight } from "lucide-react";

type ScrollButtonProps = {
  direction: "left" | "right";
  onClick: () => void;
};

export function ScrollButton({ direction, onClick }: ScrollButtonProps) {
  const isLeft = direction === "left"

  return (
    <button
      onClick={onClick}
      className={`absolute 
        ${isLeft ? "left-0" : "right-0"} 
        top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70
      `}
    >
      {isLeft ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
    </button>
  );
}
