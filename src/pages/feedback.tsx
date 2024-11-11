import React from "react";
import FeedbackForm from "@/components/feedback/FeedbackForm";

export default function FeedbackPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            We Value Your Feedback
          </h1>
          <p className="mt-4 text-lg leading-6 text-gray-600">
            Help us improve our product by sharing your experience. Your
            feedback is important to us.
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
            <p className="text-sm text-gray-500">
              Please take a moment to fill out this form. Your insights will
              help us serve you better.
            </p>
          </div>

          <div className="px-4 py-5 sm:p-6">
            <FeedbackForm />
          </div>

          <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <p className="text-xs text-gray-500 text-center">
              By submitting this form, you agree to our privacy policy and terms
              of service. We appreciate your time and effort in providing
              feedback.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
