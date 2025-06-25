import { MapPin } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { OnboardingData } from "./OnboardingFlow";

const popularCountries = [
  "Japan",
  "Italy",
  "France",
  "Spain",
  "United States",
  "Australia",
  "Thailand",
  "Greece",
  "United Kingdom",
  "Germany",
  "Canada",
  "Brazil",
];

interface CountryStepProps {
  data: OnboardingData;
  updateData: (field: keyof OnboardingData, value: string) => void;
  onNext: () => void;
}

const CountryStep = ({ data, updateData }: CountryStepProps) => {
  return (
    <div className="w-full space-y-6 animate-in fade-in-0 duration-500">
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <MapPin className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-800">
          {"What's your favorite country to visit?"}
        </h3>
        <p className="text-gray-600">
          Tell us about the country that captures your heart
        </p>
      </div>

      <div className="space-y-4">
        <Label htmlFor="country" className="text-base font-medium">
          Favorite Country
        </Label>
        <Input
          id="country"
          type="text"
          placeholder="e.g., Japan, Italy, France..."
          value={data.country}
          onChange={(e) => updateData("country", e.target.value)}
          className="bg-gray-200"
        />
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-gray-700">Popular choices:</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {popularCountries.map((country) => (
            <button
              key={country}
              onClick={() => updateData("country", country)}
              className={`p-2 text-sm rounded-lg border transition-all hover:border-blue-500 hover:bg-blue-50 ${
                data.country === country
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 text-gray-700"
              }`}
            >
              {country}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CountryStep;
