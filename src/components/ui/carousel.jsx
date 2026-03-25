/* eslint-disable react/prop-types */
import * as React from "react";
import { cn } from "@/lib/utils";

// Simple auto-scrolling carousel using CSS animation
const CarouselContext = React.createContext(null);

const Carousel = React.forwardRef(({ className, plugins, children, ...props }, ref) => {
  // Extract autoplay delay from plugins if provided
  const delay = plugins?.[0]?.options?.delay || 2500;
  return (
    <CarouselContext.Provider value={{ delay }}>
      <div
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        role="region"
        aria-roledescription="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
});
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef(({ className, children, ...props }, ref) => {
  const items = React.Children.toArray(children);

  return (
    <div className="overflow-hidden w-full" ref={ref}>
      <div
        className={cn(
          "flex gap-10 sm:gap-20 items-center will-change-transform",
          className
        )}
        style={{
          animation: `carousel-scroll ${items.length * 3}s linear infinite`,
          width: "max-content",
        }}
        {...props}
      >
        {/* Duplicate items for seamless loop */}
        {children}
        {children}
      </div>
      <style>{`
        @keyframes carousel-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="group"
    aria-roledescription="slide"
    className={cn("flex-shrink-0", className)}
    {...props}
  />
));
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = () => null;
const CarouselNext = () => null;

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };
