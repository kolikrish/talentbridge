/* eslint-disable react/prop-types */
import * as React from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

// Context for Select
const SelectContext = React.createContext(null);

const Select = ({ value, onValueChange, defaultValue, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(
    value !== undefined ? value : defaultValue || ""
  );
  const containerRef = React.useRef(null);

  // Sync controlled value
  React.useEffect(() => {
    if (value !== undefined) setSelectedValue(value);
  }, [value]);

  // Close on outside click
  React.useEffect(() => {
    const handleClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelect = (val) => {
    if (value === undefined) setSelectedValue(val);
    onValueChange?.(val);
    setIsOpen(false);
  };

  // Collect label from SelectItems
  const [labelMap, setLabelMap] = React.useState({});
  const registerLabel = React.useCallback((val, label) => {
    setLabelMap((prev) => ({ ...prev, [val]: label }));
  }, []);

  return (
    <SelectContext.Provider
      value={{ selectedValue, isOpen, setIsOpen, handleSelect, labelMap, registerLabel }}
    >
      <div ref={containerRef} className="relative w-full">
        {children}
      </div>
    </SelectContext.Provider>
  );
};

const SelectGroup = ({ children }) => <div>{children}</div>;

const SelectValue = ({ placeholder }) => {
  const ctx = React.useContext(SelectContext);
  const displayLabel = ctx?.labelMap?.[ctx?.selectedValue] || ctx?.selectedValue;
  return (
    <span className={!displayLabel ? "text-slate-400" : "text-slate-800 font-medium"}>
      {displayLabel || placeholder || "Select..."}
    </span>
  );
};

const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => {
  const ctx = React.useContext(SelectContext);
  return (
    <button
      ref={ref}
      type="button"
      onClick={() => ctx?.setIsOpen((o) => !o)}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 hover:border-blue-400 transition-colors",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown
        className={cn(
          "h-4 w-4 text-slate-400 transition-transform duration-200 flex-shrink-0",
          ctx?.isOpen && "rotate-180"
        )}
      />
    </button>
  );
});
SelectTrigger.displayName = "SelectTrigger";

const SelectContent = ({ className, children }) => {
  const ctx = React.useContext(SelectContext);
  if (!ctx?.isOpen) return null;
  return (
    <div className={cn("custom-select-dropdown", className)}>
      {children}
    </div>
  );
};

const SelectLabel = ({ className, children }) => (
  <div className={cn("py-2 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider", className)}>
    {children}
  </div>
);

const SelectItem = React.forwardRef(({ className, children, value, ...props }, ref) => {
  const ctx = React.useContext(SelectContext);
  const isSelected = ctx?.selectedValue === value;

  // Register label
  React.useEffect(() => {
    ctx?.registerLabel(value, typeof children === "string" ? children : value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, children]);

  return (
    <div
      ref={ref}
      onClick={() => ctx?.handleSelect(value)}
      className={cn(
        "custom-select-item flex items-center justify-between",
        isSelected && "active font-semibold",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {isSelected && <Check className="h-4 w-4 text-blue-500" />}
    </div>
  );
});
SelectItem.displayName = "SelectItem";

const SelectSeparator = ({ className }) => (
  <div className={cn("my-1 h-px bg-slate-100", className)} />
);

const SelectScrollUpButton = ({ className }) => (
  <div className={cn("flex cursor-default items-center justify-center py-1", className)} />
);
const SelectScrollDownButton = ({ className }) => (
  <div className={cn("flex cursor-default items-center justify-center py-1", className)} />
);

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
