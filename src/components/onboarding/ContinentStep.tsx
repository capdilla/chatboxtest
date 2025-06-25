import { Globe } from "lucide-react";

import { Label } from "@/components/ui/label";

import { OnboardingData } from "./OnboardingFlow";

interface ContinentStepProps {
  data: OnboardingData;
  updateData: (field: keyof OnboardingData, value: string) => void;
  onNext: () => void;
}

const continents = [
  { name: "Europe", emoji: "🇪🇺", description: "Rich history and culture" },
  {
    name: "Asia",
    emoji: "🌏",
    description: "Diverse traditions and landscapes",
  },
  {
    name: "North America",
    emoji: "🌎",
    description: "Modern cities and natural wonders",
  },
  {
    name: "South America",
    emoji: "🌎",
    description: "Vibrant culture and rainforests",
  },
  {
    name: "Africa",
    emoji: "🌍",
    description: "Wildlife and ancient civilizations",
  },
  {
    name: "Australia/Oceania",
    emoji: "🇦🇺",
    description: "Unique wildlife and islands",
  },
  {
    name: "Antarctica",
    emoji: "🐧",
    description: "Pristine wilderness and ice",
  },
];

const ContinentStep = ({ data, updateData }: ContinentStepProps) => {
  return (
    <div className="w-full space-y-6 animate-in fade-in-0 duration-500">
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-purple-100 rounded-full">
            <Globe className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-800">
          Which continent do you love most?
        </h3>
        <p className="text-gray-600">
          Choose the continent that excites you the most
        </p>
      </div>

      <div className="space-y-4">
        <Label className="text-base font-medium">Favorite Continent</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {continents.map((continent) => (
            <button
              key={continent.name}
              onClick={() => updateData("continent", continent.name)}
              className={`p-4 text-left rounded-xl border-2 transition-all hover:border-purple-500 hover:bg-purple-50 ${
                data.continent === continent.name
                  ? "border-purple-500 bg-purple-50"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{continent.emoji}</span>
                <div>
                  <div className="font-medium text-gray-800">
                    {continent.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {continent.description}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContinentStep;
