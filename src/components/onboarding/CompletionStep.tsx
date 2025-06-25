import { CheckCircle, MapPin, Globe, Plane } from "lucide-react";

import { Button } from "@/components/ui/button";

import { OnboardingData } from "./OnboardingFlow";

interface CompletionStepProps {
  data: OnboardingData;
  updateData: (field: keyof OnboardingData, value: string) => void;
  onNext: () => void;
}

const CompletionStep = ({ data, onNext }: CompletionStepProps) => {
  const handleComplete = () => {
    onNext();
  };

  return (
    <div className="text-center space-y-6 animate-in fade-in-0 duration-500">
      <div className="flex justify-center mb-6">
        <div className="p-4 bg-green-100 dark:bg-green-900/50 rounded-full">
          <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {"Perfect! We've got your preferences"}
        </h2>
        <p className="text-gray-600">
          {"Here's what we learned about your travel style:"}
        </p>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 space-y-4 text-left">
        <div className="flex items-center space-x-3">
          <MapPin className="w-5 h-5 text-blue-600" />
          <div>
            <span className="font-medium text-gray-700">Favorite Country:</span>
            <span className="ml-2 text-gray-900">{data.country}</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Globe className="w-5 h-5 text-purple-600" />
          <div>
            <span className="font-medium text-gray-700">
              Favorite Continent:
            </span>
            <span className="ml-2 text-gray-900">{data.continent}</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Plane className="w-5 h-5 text-indigo-600" />
          <div>
            <span className="font-medium text-gray-700">
              Dream Destination:
            </span>
            <span className="ml-2 text-gray-900">{data.destination}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          onClick={handleComplete}
          className="w-full py-3 text-lg text-white bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
        >
          Complete Setup
        </Button>
        <p className="text-sm text-gray-500">
          {"We'll use this information to personalize your experience"}
        </p>
      </div>
    </div>
  );
};

export default CompletionStep;
