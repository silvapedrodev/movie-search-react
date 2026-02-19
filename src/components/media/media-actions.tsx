import ActionButton from "@/components/ui/action-button";
import { Bookmark, Check } from "lucide-react";

export const MediaActions = () => {
  return (
    <div className="flex gap-4 max-w-3xs">
      <ActionButton label="Watchlist" icon={Bookmark} filled />
      <ActionButton label="Seen" icon={Check} />
    </div>
  );
}
