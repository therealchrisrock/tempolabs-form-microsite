import React from "react";
import StarRating from "./StarRating";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

interface RatingData {
  overallRating: number;
  featureRatings: {
    usability: number;
    performance: number;
    features: number;
    support: number;
  };
}

interface RatingSectionProps {
  onRatingChange?: (ratings: RatingData) => void;
}

export default function RatingSection({
  onRatingChange = () => {},
}: RatingSectionProps) {
  const [ratings, setRatings] = React.useState<RatingData>({
    overallRating: 0,
    featureRatings: {
      usability: 0,
      performance: 0,
      features: 0,
      support: 0,
    },
  });

  const handleRatingChange = (
    category: keyof typeof ratings.featureRatings | "overall",
    value: number,
  ) => {
    const newRatings = { ...ratings };
    if (category === "overall") {
      newRatings.overallRating = value;
    } else {
      newRatings.featureRatings[category] = value;
    }
    setRatings(newRatings);
    onRatingChange(newRatings);
  };

  return (
    <Card className="p-6 bg-white">
      <div className="space-y-6">
        <div>
          <Label className="text-lg font-semibold mb-2 block">
            Overall Experience
          </Label>
          <p className="text-sm text-gray-600 mb-3">
            How would you rate your overall experience with our product?
          </p>
          <StarRating
            rating={ratings.overallRating}
            onRatingChange={(value) => handleRatingChange("overall", value)}
          />
        </div>

        <Separator />

        <div className="space-y-4">
          <Label className="text-lg font-semibold block">Feature Ratings</Label>
          <p className="text-sm text-gray-600 mb-3">
            Please rate the following aspects of our product:
          </p>

          <div className="grid gap-4">
            <div>
              <Label className="mb-2 block">Usability</Label>
              <StarRating
                rating={ratings.featureRatings.usability}
                onRatingChange={(value) =>
                  handleRatingChange("usability", value)
                }
              />
            </div>

            <div>
              <Label className="mb-2 block">Performance</Label>
              <StarRating
                rating={ratings.featureRatings.performance}
                onRatingChange={(value) =>
                  handleRatingChange("performance", value)
                }
              />
            </div>

            <div>
              <Label className="mb-2 block">Features</Label>
              <StarRating
                rating={ratings.featureRatings.features}
                onRatingChange={(value) =>
                  handleRatingChange("features", value)
                }
              />
            </div>

            <div>
              <Label className="mb-2 block">Support</Label>
              <StarRating
                rating={ratings.featureRatings.support}
                onRatingChange={(value) => handleRatingChange("support", value)}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
