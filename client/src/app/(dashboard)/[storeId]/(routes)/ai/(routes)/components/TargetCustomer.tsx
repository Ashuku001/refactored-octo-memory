import { CustomerSearchType } from "@/types";

type TargetCustomerProp = {
    customer: CustomerSearchType
}
export const TargetCustomer = ({customer}: TargetCustomerProp) => {
  return (
    <div>
        <h1 className="font-semibold">Target Customer</h1>
        <p className="line-clamp-1">{(customer?.first_name && customer?.last_name)  ? customer?.first_name.trim() + " " + customer?.last_name.trim() : customer?.first_name ?? customer?.last_name}</p>
        <p className="line-clamp-1">{customer?.phone_number ?? "No phone number result"}</p>
        <p className="line-clamp-1">{customer?.customerSegment ?? ""}</p>
        <p className="line-clamp-1">{customer?.incomeCategory ?? ""}</p>
        <p className="line-clamp-1">{customer?.age ?? ""}</p>
        <p className="line-clamp-1">{customer?.gender ?? ""}</p>
    </div>);
};