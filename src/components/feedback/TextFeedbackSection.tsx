import React from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import CharacterCounter from "./CharacterCounter";

interface TextFeedbackProps {
  onFeedbackChange?: (feedback: {
    comments: string;
    suggestions: string;
  }) => void;
}

export default function TextFeedbackSection({
  onFeedbackChange = () => {},
}: TextFeedbackProps) {
  const [feedback, setFeedback] = React.useState({
    comments: "",
    suggestions: "",
  });

  const handleTextChange = (
    field: "comments" | "suggestions",
    value: string,
  ) => {
    const newFeedback = {
      ...feedback,
      [field]: value,
    };
    setFeedback(newFeedback);
    onFeedbackChange(newFeedback);
  };

  return (
    <Card className="p-6 bg-white">
      <div className="space-y-6">
        <div>
          <Label className="text-lg font-semibold mb-2 block">
            Your Feedback
          </Label>
          <p className="text-sm text-gray-600 mb-4">
            Please share your thoughts and experiences with our product
          </p>

          <div className="space-y-2">
            <Label htmlFor="comments">General Comments</Label>
            <Textarea
              id="comments"
              placeholder="Tell us what you think about our product..."
              className="min-h-[120px] resize-y"
              value={feedback.comments}
              onChange={(e) => handleTextChange("comments", e.target.value)}
              maxLength={1000}
            />
            <div className="flex justify-end">
              <CharacterCounter current={feedback.comments.length} max={1000} />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="suggestions">Suggestions for Improvement</Label>
          <Textarea
            id="suggestions"
            placeholder="How can we make our product better?"
            className="min-h-[100px] resize-y"
            value={feedback.suggestions}
            onChange={(e) => handleTextChange("suggestions", e.target.value)}
            maxLength={500}
          />
          <div className="flex justify-end">
            <CharacterCounter current={feedback.suggestions.length} max={500} />
          </div>
        </div>
      </div>
    </Card>
  );
}
