import React from "react";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating?: number;
  maxRating?: number;
  size?: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
}

export const StarRating = ({
  rating = 0,
  maxRating = 5,
  size = 24,
  onRatingChange,
  readonly = false,
}: StarRatingProps) => {
  const [hoverRating, setHoverRating] = React.useState(0);

  return (
    <div className="flex items-center gap-1 bg-white p-2">
      {Array.from({ length: maxRating }, (_, index) => (
        <Star
          key={index}
          size={size}
          className={cn(
            "transition-colors cursor-pointer",
            index < rating || index < hoverRating
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300",
            readonly && "cursor-default",
            !readonly && "hover:text-yellow-400",
          )}
          onClick={() => {
            if (!readonly && onRatingChange) {
              onRatingChange(index + 1);
            }
          }}
          onMouseEnter={() => {
            if (!readonly) {
              setHoverRating(index + 1);
            }
          }}
          onMouseLeave={() => {
            if (!readonly) {
              setHoverRating(0);
            }
          }}
        />
      ))}
      <span className="ml-2 text-sm text-gray-600">
        {rating} / {maxRating}
      </span>
    </div>
  );
};

export default StarRating;
