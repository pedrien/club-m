import React from "react";

interface StepsProps {
  currentStep: number;
}

const steps = [
  { number: 1, label: "Situation actuelle" },
  { number: 2, label: "Niveau entrépreneuriat" },
  { number: 3, label: "Attente" },
  { number: 4, label: "Infos personnelles" },
];

const Steps: React.FC<StepsProps> = ({ currentStep }) => {
  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="relative mb-14 lg:w-[100%] w-[90%] mx-auto">
      <div className="content-step flex relative z-10 w-full items-center justify-between">
        <div className="line absolute left-0 h-[2px] w-full bg-[#f5f5f5] -z-10 rounded-full"></div>
        <div
          className="line absolute left-0 h-[2px] bg-black -z-10 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
        {steps.map((step) => {
          const isActive = step.number <= currentStep;
          return (
            <div
              key={step.number}
              className="item-step flex flex-col items-center justify-center"
            >
              <div
                className={`num rounded-full w-8 h-8 flex items-center justify-center text-sm transition-colors duration-300 ${
                  isActive ? "bg-black text-white" : "bg-[#f5f5f5] text-black"
                }`}
              >
                {step.number}
              </div>
              <div
                className={`text-xs absolute top-[130%] whitespace-nowrap text-center hidden md:block transition-colors duration-300 ${
                  isActive ? "text-black" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Steps;
