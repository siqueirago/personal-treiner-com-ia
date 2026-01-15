import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ExerciseTypeCardProps {
  id: string;
  title: string;
  description: string;
  Icon: LucideIcon;
  selected: boolean;
  onToggle: (id: string) => void;
}

const ExerciseTypeCard = ({ id, title, description, Icon, selected, onToggle }: ExerciseTypeCardProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onToggle(id)}
      className={cn(
        "relative p-5 rounded-xl text-left transition-all duration-300",
        "bg-card/40 backdrop-blur-sm border border-white/5",
        "hover:border-primary/30 hover:bg-card/60",
        selected && "border-primary bg-primary/10"
      )}
    >
      <div className="flex items-center gap-4">
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center transition-all",
          selected ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
        )}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h4 className={cn(
            "font-semibold transition-colors",
            selected ? "text-primary" : "text-foreground"
          )}>
            {title}
          </h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            {description}
          </p>
        </div>
        <div className={cn(
          "w-5 h-5 rounded-md border-2 transition-all duration-300 flex items-center justify-center",
          selected ? "border-primary bg-primary" : "border-muted-foreground"
        )}>
          {selected && (
            <motion.svg
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-3 h-3 text-background"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </motion.svg>
          )}
        </div>
      </div>
    </motion.button>
  );
};

export default ExerciseTypeCard;
