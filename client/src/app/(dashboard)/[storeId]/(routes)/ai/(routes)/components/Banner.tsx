import { cn } from "@/lib/utils";
type Props = {
    heading: string;
    children: React.ReactNode,
    className?: string,
  }
  
  export const Banner = ({children, heading, className}: Props) => {
    return (
      <div className={cn("bg-[url('/card-bg-2.png')] bg-cover rounded-lg grid place-items-center", className)}>
        <div className="drop-shadow-md backdrop-filter backdrop-blur-sm bg-opacity-30 dark:bg-black/30 h-[90%] rounded-md px-5 border-slate-600 text-white dark:text-white">
          <h1 className="font-semibold text-2xl text-center py-3 pt-6">{heading}</h1>
          {children}
        </div>
      </div>
    );
  };
  