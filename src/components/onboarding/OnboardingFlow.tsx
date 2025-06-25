import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import CountryStep from "./CountryStep";
import ContinentStep from "./ContinentStep";
import DestinationStep from "./DestinationStep";
import WelcomeStep from "./WelcomeStep";
import CompletionStep from "./CompletionStep";

export interface OnboardingData {
  country?: string;
  continent?: string;
  destination?: string;
}

interface Step {
  id: string;
  title: string;
  component: React.ComponentType<{
    data: OnboardingData;
    updateData: (field: keyof OnboardingData, value: string) => void;
    onNext: () => void;
  }>;
  validation?: (data: OnboardingData) => boolean; // Optional validation function
}

const steps = [
  {
    id: "welcome",
    title: "Welcome",
    component: WelcomeStep,
  },
  {
    id: "continent",
    title: "Favorite Continent",
    component: ContinentStep,
    validation: (data) => data.continent?.trim() !== "",
  },
  {
    id: "country",
    title: "Favorite Country",
    component: CountryStep,
    validation: (data) => data.country?.trim() !== "",
  },
  {
    id: "destination",
    title: "Favorite Destination",
    component: DestinationStep,
    validation: (data) => data.destination?.trim() !== "",
  },
  { id: "completion", title: "Complete", component: CompletionStep },
] as Step[];

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
}

const OnboardingFlow = (props: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    country: "",
    continent: "",
    destination: "",
  });

  const currentStepData = steps[currentStep];
  const CurrentStepComponent = currentStepData.component;
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }

    // is last step, call onComplete
    if (currentStep === steps.length - 1) {
      props.onComplete(data);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateData = (field: keyof OnboardingData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const isStepValid = () => {
    const validationFn = currentStepData.validation;
    if (validationFn) {
      return validationFn(data);
    }
    return true; // If no validation function, consider step valid
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 text-black">
      <Card className="w-full max-w-2xl mx-auto shadow-2xl border-0 dark:bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <div className="mb-4">
            <Progress value={progress} className="w-full h-2" />
            <p className="text-sm text-muted-foreground mt-2">
              Step {currentStep + 1} of {steps.length}
            </p>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {currentStepData.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="min-h-[300px] flex items-center justify-center">
            <CurrentStepComponent
              data={data}
              updateData={updateData}
              onNext={handleNext}
            />
          </div>

          {currentStep > 0 && currentStep < steps.length - 1 && (
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                className="flex items-center gap-2 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
              >
                <ChevronLeft size={16} />
                Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="flex items-center gap-2 bg-gradient-to-r text-white from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Next
                <ChevronRight size={16} />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingFlow;
