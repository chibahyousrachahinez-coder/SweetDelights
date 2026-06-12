"use client";

import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
}

function DisplayCard({
  className,
  icon = <Star className="size-4 text-amber-300 fill-amber-300" />,
  title = "Happy Customer",
  description = "Amazing cakes and service!",
  date = "Just now",
  iconClassName = "text-amber-500",
  titleClassName = "text-pink-500",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-40 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-2xl border-2 border-pink-200/30 bg-white/90 backdrop-blur-sm px-5 py-4 transition-all duration-700 shadow-lg after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-rose-50 after:to-transparent after:content-[''] hover:border-pink-300/50 hover:bg-white hover:shadow-xl [&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className
      )}
    >
      <div>
        <span className={cn("relative inline-block rounded-full bg-gradient-to-br from-pink-100 to-amber-100 p-1.5", iconClassName)}>
          {icon}
        </span>
        <p className={cn("text-lg font-serif font-medium", titleClassName)}>{title}</p>
      </div>
      <p className="whitespace-nowrap text-base text-foreground/80 italic">&ldquo;{description}&rdquo;</p>
      <p className="text-sm text-muted-foreground">{date}</p>
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const defaultCards: DisplayCardProps[] = [
    {
      className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-2xl before:outline-pink-200/30 before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-white/30 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className: "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-2xl before:outline-pink-200/30 before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-white/30 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className: "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}

export { DisplayCard };
