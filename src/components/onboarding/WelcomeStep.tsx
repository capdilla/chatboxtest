import { Plane, MapPin, Globe } from "lucide-react";

import { Button } from "@/components/ui/button";

import { OnboardingData } from "./OnboardingFlow";

interface WelcomeStepProps {
  data: OnboardingData;
  updateData: (field: keyof OnboardingData, value: string) => void;
  onNext: () => void;
}

const WelcomeStep = ({ onNext }: WelcomeStepProps) => {
  return (
    <div className="text-center space-y-6 animate-in fade-in-0 duration-500">
      <div className="flex justify-center space-x-4 mb-6">
        <div className="p-3 bg-blue-100 rounded-full">
          <Globe className="w-8 h-8 text-blue-600" />
        </div>
        <div className="p-3 bg-purple-100 rounded-full">
          <MapPin className="w-8 h-8 text-purple-600" />
        </div>
        <div className="p-3 bg-indigo-100 rounded-full">
          <Plane className="w-8 h-8 text-indigo-600" />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          {"Let's personalize your travel experience!"}
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          {`We'd love to learn about your travel preferences to create a more
          personalized experience for you.`}
        </p>
        <p className="text-sm dark:text-gray-500">
          This will only take a minute
        </p>
      </div>

      <Button
        onClick={onNext}
        className="mt-8 px-8 py-3 text-white text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
      >
        Get Started
      </Button>
    </div>
  );
};

export default WelcomeStep;
