import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BiotipoCardProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  selected: boolean;
  onSelect: (id: string) => void;
}

const BiotipoCard = ({ id, title, description, icon, selected, onSelect }: BiotipoCardProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(id)}
      className={cn(
        "relative w-full p-6 rounded-2xl text-left transition-all duration-300",
        "bg-card/60 backdrop-blur-sm border border-white/5",
        "hover:border-primary/30 hover:bg-card/80",
        selected && "border-primary bg-primary/10 glow-effect"
      )}
    >
      <div className="flex items-start gap-4">
        <span className="text-4xl">{icon}</span>
        <div className="flex-1">
          <h3 className={cn(
            "font-display text-xl font-bold mb-2 transition-colors",
            selected ? "text-primary" : "text-foreground"
          )}>
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
        <div className={cn(
          "w-6 h-6 rounded-full border-2 transition-all duration-300 flex items-center justify-center",
          selected ? "border-primary bg-primary" : "border-muted-foreground"
        )}>
          {selected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-2 h-2 rounded-full bg-background"
            />
          )}
        </div>
      </div>
    </motion.button>
  );
};

export default BiotipoCard;
