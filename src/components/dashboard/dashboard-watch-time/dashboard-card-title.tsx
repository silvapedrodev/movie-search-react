import { CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

type CardTitleProps = {
  label: string
  Icon: LucideIcon
}

export const DashboardCardTitle = ({ label, Icon }: CardTitleProps) => {
  return (
    <CardHeader>
      <CardTitle className="text-sm flex items-center gap-2">
        <Icon size={18} className="text-slate-400" />
        {label}
      </CardTitle>
    </CardHeader>
  )
}