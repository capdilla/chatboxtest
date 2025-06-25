import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plane } from "lucide-react";

import { OnboardingData } from "./OnboardingFlow";

const popularDestinations = [
  "Paris, France",
  "Tokyo, Japan",
  "New York City, USA",
  "London, UK",
  "Rome, Italy",
  "Bali, Indonesia",
  "Barcelona, Spain",
  "Dubai, UAE",
  "Sydney, Australia",
  "Santorini, Greece",
  "Kyoto, Japan",
  "Amsterdam, Netherlands",
];

interface DestinationStepProps {
  data: OnboardingData;
  updateData: (field: keyof OnboardingData, value: string) => void;
  onNext: () => void;
}

const DestinationStep = ({ data, updateData }: DestinationStepProps) => {
  return (
    <div className="w-full space-y-6 animate-in fade-in-0 duration-500">
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-indigo-100 rounded-full">
            <Plane className="w-8 h-8 text-indigo-600" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-800">
          {"What's your dream destination?"}
        </h3>
        <p className="text-gray-600">
          {"The specific place you'd love to visit or revisit"}
        </p>
      </div>

      <div className="space-y-4">
        <Label htmlFor="destination" className="text-base font-medium">
          Favorite Destination
        </Label>
        <Input
          id="destination"
          type="text"
          placeholder="e.g., Paris, Bali, Tokyo..."
          value={data.destination}
          onChange={(e) => updateData("destination", e.target.value)}
          className="bg-gray-200"
        />
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-gray-700">
          Popular destinations:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {popularDestinations.map((destination) => (
            <button
              key={destination}
              onClick={() => updateData("destination", destination)}
              className={`p-3 text-sm text-left rounded-lg border transition-all hover:border-indigo-500 hover:bg-indigo-50 ${
                data.destination === destination
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                  : "border-gray-200 text-gray-700"
              }`}
            >
              {destination}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DestinationStep;
