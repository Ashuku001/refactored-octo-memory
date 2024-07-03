import { formatter } from "@/lib/utils";

type Props = {
    type: string;
    value: number;
}
export function DiscountFormatter({type, value}: Props) {
  return (
    type === "fixed" ? `${formatter.format(value)} off` : `${value} % off`
  );
}

