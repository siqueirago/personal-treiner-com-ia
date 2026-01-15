import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";

interface FrequencyOption {
  days: number;
  label: string;
  type: string;
  description: string;
}

interface FrequencySelectorProps {
  options: FrequencyOption[];
  selected: number | null;
  onSelect: (days: number) => void;
}

const FrequencySelector = ({ options, selected, onSelect }: FrequencySelectorProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {options.map((option, index) => (
        <motion.button
          key={option.days}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.03, y: -3 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(option.days)}
          className={cn(
            "relative p-6 rounded-2xl text-center transition-all duration-300",
            "bg-card/60 backdrop-blur-sm border border-white/5",
            "hover:border-primary/30 hover:bg-card/80",
            selected === option.days && "border-primary bg-primary/10 glow-effect"
          )}
        >
          <div className={cn(
            "w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-colors",
            selected === option.days ? "bg-primary/20" : "bg-secondary"
          )}>
            <Calendar className={cn(
              "w-8 h-8 transition-colors",
              selected === option.days ? "text-primary" : "text-muted-foreground"
            )} />
          </div>
          <div className={cn(
            "text-4xl font-display font-bold mb-1 transition-colors",
            selected === option.days ? "text-primary" : "text-foreground"
          )}>
            {option.days}
          </div>
          <div className="text-sm text-muted-foreground mb-2">{option.label}</div>
          <div className={cn(
            "inline-block px-3 py-1 rounded-full text-xs font-medium transition-colors",
            selected === option.days 
              ? "bg-primary/20 text-primary" 
              : "bg-secondary text-muted-foreground"
          )}>
            {option.type}
          </div>
          <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
            {option.description}
          </p>
        </motion.button>
      ))}
    </div>
  );
};

export default FrequencySelector;
