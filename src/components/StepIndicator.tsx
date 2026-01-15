import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}

const StepIndicator = ({ currentStep, totalSteps, labels }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center gap-2 md:gap-4 mb-8">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div key={index} className="flex items-center gap-2 md:gap-4">
          <div className="flex flex-col items-center">
            <motion.div
              initial={false}
              animate={{
                scale: currentStep === index + 1 ? 1.1 : 1,
              }}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300",
                currentStep > index + 1 
                  ? "bg-primary text-primary-foreground" 
                  : currentStep === index + 1 
                    ? "bg-primary text-primary-foreground animate-pulse-glow" 
                    : "bg-secondary text-muted-foreground"
              )}
            >
              {currentStep > index + 1 ? (
                <Check className="w-5 h-5" />
              ) : (
                index + 1
              )}
            </motion.div>
            <span className={cn(
              "text-xs mt-2 hidden md:block transition-colors",
              currentStep >= index + 1 ? "text-foreground" : "text-muted-foreground"
            )}>
              {labels[index]}
            </span>
          </div>
          {index < totalSteps - 1 && (
            <div className={cn(
              "w-8 md:w-16 h-0.5 transition-colors duration-300",
              currentStep > index + 1 ? "bg-primary" : "bg-secondary"
            )} />
          )}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
