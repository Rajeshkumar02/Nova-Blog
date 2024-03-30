import cn from "clsx";
import type { ComponentProps, ReactElement } from "react";
import "../styles/time-line.css";

export function TimeLine({
  children,
  className,
  ...props
}: ComponentProps<"div">): ReactElement {
  return (
    <div
      className={cn(
        "time-line ml-4 mb-12 border-l border-gray-200 pl-6 ",
        "dark:border-neutral-800 [counter-reset:step] ",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
