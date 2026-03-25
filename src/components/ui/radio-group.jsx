/* eslint-disable react/prop-types */
import * as React from "react";
import { cn } from "@/lib/utils";

// Custom RadioGroup without Radix UI
const RadioGroupContext = React.createContext(null);

const RadioGroup = React.forwardRef(({ className, onValueChange, value, defaultValue, children, ...props }, ref) => {
  const [selected, setSelected] = React.useState(value || defaultValue || "");

  React.useEffect(() => {
    if (value !== undefined) setSelected(value);
  }, [value]);

  const handleChange = (val) => {
    if (value === undefined) setSelected(val);
    onValueChange?.(val);
  };

  return (
    <RadioGroupContext.Provider value={{ selected, handleChange }}>
      <div ref={ref} className={cn("grid gap-2", className)} role="radiogroup" {...props}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
});
RadioGroup.displayName = "RadioGroup";

const RadioGroupItem = React.forwardRef(({ className, value, id, ...props }, ref) => {
  const ctx = React.useContext(RadioGroupContext);
  const isChecked = ctx?.selected === value;

  return (
    <button
      ref={ref}
      type="button"
      role="radio"
      aria-checked={isChecked}
      id={id}
      onClick={() => ctx?.handleChange(value)}
      className={cn(
        "aspect-square h-5 w-5 rounded-full border-2 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 flex items-center justify-center flex-shrink-0",
        isChecked
          ? "border-blue-600 bg-blue-600"
          : "border-slate-300 bg-white hover:border-blue-400",
        className
      )}
      {...props}
    >
      {isChecked && (
        <span className="h-2 w-2 rounded-full bg-white block" />
      )}
    </button>
  );
});
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
