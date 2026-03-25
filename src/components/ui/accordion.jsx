/* eslint-disable react/prop-types */
import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Custom Accordion without Radix UI
const AccordionContext = React.createContext(null);

const Accordion = ({ type = "single", children, className, defaultValue }) => {
  const [openItems, setOpenItems] = React.useState(
    defaultValue ? (Array.isArray(defaultValue) ? defaultValue : [defaultValue]) : []
  );

  const toggle = (value) => {
    if (type === "single") {
      setOpenItems((prev) => (prev.includes(value) ? [] : [value]));
    } else {
      setOpenItems((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      );
    }
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggle }}>
      <div className={cn("", className)}>{children}</div>
    </AccordionContext.Provider>
  );
};

const AccordionItem = React.forwardRef(({ className, value, children, ...props }, ref) => {
  const ctx = React.useContext(AccordionContext);
  const isOpen = ctx?.openItems.includes(value);

  return (
    <AccordionContext.Provider value={{ ...ctx, isOpen, value }}>
      <div
        ref={ref}
        className={cn(
          "border-b border-slate-200",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
});
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => {
  const ctx = React.useContext(AccordionContext);

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => ctx?.toggle(ctx?.value)}
      className={cn(
        "flex w-full flex-1 items-center justify-between py-4 font-medium text-slate-800 transition-all hover:text-blue-600 text-left",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown
        className={cn(
          "h-4 w-4 text-slate-400 shrink-0 transition-transform duration-200 ml-2",
          ctx?.isOpen && "rotate-180"
        )}
      />
    </button>
  );
});
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => {
  const ctx = React.useContext(AccordionContext);

  return (
    <div
      ref={ref}
      className={cn("accordion-content", ctx?.isOpen && "open")}
      {...props}
    >
      <div className={cn("pb-4 pt-0 text-slate-600 text-sm leading-relaxed", className)}>
        {children}
      </div>
    </div>
  );
});
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
