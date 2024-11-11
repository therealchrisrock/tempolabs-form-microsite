import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import RatingSection from "./RatingSection";
import TextFeedbackSection from "./TextFeedbackSection";
import ContactSection from "./ContactSection";
import MarketingConsent from "./MarketingConsent";
import SubmissionStatus from "./SubmissionStatus";
import CharacterCounter from "./CharacterCounter";

const formSchema = z.object({
  ratings: z.object({
    overall: z.number().min(1, "Please provide an overall rating"),
    features: z.object({
      usability: z.number().min(1, "Please rate the usability"),
      performance: z.number().min(1, "Please rate the performance"),
      features: z.number().min(1, "Please rate the features"),
      support: z.number().min(1, "Please rate the support"),
    }),
  }),
  feedback: z.object({
    comments: z
      .string()
      .max(1000, "Comments must be less than 1000 characters"),
    suggestions: z
      .string()
      .max(500, "Suggestions must be less than 500 characters"),
  }),
  contact: z.object({
    name: z.string().optional(),
    email: z.string().email("Please enter a valid email").optional(),
  }),
  marketingConsent: z.boolean().default(false),
});

type FormData = z.infer<typeof formSchema>;

export default function FeedbackForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<
    "idle" | "success" | "error"
  >("idle");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ratings: {
        overall: 0,
        features: {
          usability: 0,
          performance: 0,
          features: 0,
          support: 0,
        },
      },
      feedback: {
        comments: "",
        suggestions: "",
      },
      contact: {
        name: "",
        email: "",
      },
      marketingConsent: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form submitted:", data);
      setSubmitStatus("success");
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto p-6 bg-white">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">
              Share Your Feedback
            </h1>
            <p className="text-gray-500">
              We value your opinion and would love to hear about your experience
              with our product.
            </p>
          </div>

          <RatingSection
            onRatingChange={(ratings) => {
              form.setValue("ratings", ratings, { shouldValidate: true });
            }}
          />

          <div className="space-y-2">
            <Label htmlFor="comments" className="text-lg font-semibold block">
              General Comments
            </Label>
            <Textarea
              id="comments"
              placeholder="Share any general thoughts or comments about our product."
              maxLength={1000}
              className="resize-y"
              {...form.register("feedback.comments")}
            />
            <CharacterCounter
              current={form.watch("feedback.comments").length}
              max={1000}
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="suggestions"
              className="text-lg font-semibold block"
            >
              Suggestions for Improvement
            </Label>
            <Textarea
              id="suggestions"
              placeholder="Let us know how we can improve our product."
              maxLength={500}
              className="resize-y"
              {...form.register("feedback.suggestions")}
            />
            <CharacterCounter
              current={form.watch("feedback.suggestions").length}
              max={500}
            />
          </div>

          <ContactSection
            onContactChange={(contact) => {
              form.setValue("contact", contact, { shouldValidate: true });
            }}
          />

          <MarketingConsent
            onConsentChange={(consent) => {
              form.setValue("marketingConsent", consent, {
                shouldValidate: true,
              });
            }}
          />

          <div className="flex flex-col items-center gap-4">
            <Button
              type="submit"
              className="w-full max-w-md"
              disabled={isSubmitting || !form.formState.isValid}
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </Button>

            <SubmissionStatus status={submitStatus} />
          </div>
        </form>
      </Form>
    </Card>
  );
}
