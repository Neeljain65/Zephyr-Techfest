import { cn } from "../../lib/utils";

export const BentoGrid = ({ className, children }) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  showOnHover = false, // New prop to determine if hover effect applies
}) => {
  return (
    <div
      className={cn(
        "relative row-span-1 rounded-xl  transition duration-200 shadow-input dark:shadow-none p-4 bg-black dark:border-white/[0.2] border border-transparent justify-between flex flex-col space-y-4",
        className
      )}
    >
      {header}
      <div
        className={cn(
          "group-hover:translate-x-2 transition duration-200",
          showOnHover && "group-hover:opacity-0"
        )}
      >
        {icon}
        <div className="font-sans font-bold text-neutral-200 mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal text-xs text-neutral-300">
          {description}
        </div>
      </div>
      {/* Blackout overlay with additional information */}
      {showOnHover && (
        <div
          className={cn(
            "absolute inset-0 p-2 bg-black bg-opacity-90 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition duration-300"
          )}
        >
          <h3 className="text-lg font-bold mb-2">Additional Information</h3>
          <p className="text-sm text-center">Here is the extra information displayed on hover.</p>
        </div>
      )}
    </div>
  );
};
