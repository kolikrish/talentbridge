import * as React from "react";
import * as ReactDOM from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

// Custom Drawer without Vaul/Radix
const DrawerContext = React.createContext(null);

const Drawer = ({ open, onOpenChange, children }) => {
  const [isOpen, setIsOpen] = React.useState(open !== undefined ? open : false);

  React.useEffect(() => {
    if (open !== undefined) setIsOpen(open);
  }, [open]);

  const handleOpen = () => {
    const next = true;
    setIsOpen(next);
    onOpenChange?.(next);
  };

  const handleClose = () => {
    const next = false;
    setIsOpen(next);
    onOpenChange?.(next);
  };

  // Prevent body scroll when open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <DrawerContext.Provider value={{ isOpen, handleOpen, handleClose }}>
      {children}
    </DrawerContext.Provider>
  );
};

const DrawerTrigger = ({ asChild, children, ...props }) => {
  const ctx = React.useContext(DrawerContext);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...children.props,
      onClick: (e) => {
        children.props.onClick?.(e);
        ctx?.handleOpen();
      },
    });
  }

  return (
    <button type="button" onClick={ctx?.handleOpen} {...props}>
      {children}
    </button>
  );
};

const DrawerPortal = ({ children }) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return ReactDOM.createPortal(children, document.body);
};

const DrawerClose = ({ asChild, children, ...props }) => {
  const ctx = React.useContext(DrawerContext);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...children.props,
      onClick: (e) => {
        children.props.onClick?.(e);
        ctx?.handleClose();
      },
    });
  }

  return (
    <button type="button" onClick={ctx?.handleClose} {...props}>
      {children}
    </button>
  );
};

const DrawerOverlay = React.forwardRef(({ className, ...props }, ref) => {
  const ctx = React.useContext(DrawerContext);
  if (!ctx?.isOpen) return null;
  return (
    <div
      ref={ref}
      className={cn("drawer-overlay", className)}
      onClick={ctx?.handleClose}
      {...props}
    />
  );
});
DrawerOverlay.displayName = "DrawerOverlay";

const DrawerContent = React.forwardRef(({ className, children, ...props }, ref) => {
  const ctx = React.useContext(DrawerContext);
  if (!ctx?.isOpen) return null;

  return (
    <DrawerPortal>
      <DrawerOverlay />
      <div
        ref={ref}
        className={cn("drawer-panel", className)}
        {...props}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={ctx?.handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X size={18} />
        </button>
        {children}
      </div>
    </DrawerPortal>
  );
});
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = ({ className, ...props }) => (
  <div
    className={cn("grid gap-1.5 p-5 pb-0 text-left", className)}
    {...props}
  />
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({ className, ...props }) => (
  <div
    className={cn("mt-auto flex flex-col gap-2 p-5", className)}
    {...props}
  />
);
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "text-lg font-bold leading-none tracking-tight text-slate-900",
      className
    )}
    {...props}
  />
));
DrawerTitle.displayName = "DrawerTitle";

const DrawerDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-slate-500 mt-1", className)}
    {...props}
  />
));
DrawerDescription.displayName = "DrawerDescription";

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
