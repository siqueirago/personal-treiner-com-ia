import { motion } from "framer-motion";
import { Dumbbell, Clock, Flame, Target, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WorkoutDay {
  day: string;
  focus: string;
  exercises: string[];
  duration: string;
}

interface WorkoutPlanProps {
  biotipo: string;
  frequency: number;
  exercises: string[];
  onReset: () => void;
}

const getWorkoutPlan = (biotipo: string, frequency: number, exercises: string[]): WorkoutDay[] => {
  const biotipoTips: Record<string, string> = {
    ectomorfo: "Foco em exercícios compostos e carga progressiva para ganho de massa",
    mesomorfo: "Combinação equilibrada de força e resistência para manter a forma",
    endomorfo: "Ênfase em cardio e circuitos para acelerar o metabolismo"
  };

  const exerciseMap: Record<string, string[]> = {
    funcional: ["Burpees", "Kettlebell Swings", "Box Jumps", "Battle Ropes", "TRX"],
    maquinario: ["Leg Press", "Pulley", "Cadeira Extensora", "Peck Deck", "Smith"],
    peso_livre: ["Supino", "Agachamento", "Levantamento Terra", "Desenvolvimento", "Rosca"],
    cardio: ["Corrida", "Bicicleta", "Elíptico", "Remo", "Caminhada Inclinada"],
    hiit: ["Sprints", "Tabata", "EMOM", "AMRAP", "Circuitos"]
  };

  const selectedExercises = exercises.flatMap(e => exerciseMap[e] || []);
  
  if (frequency === 1) {
    return [{
      day: "Full Body",
      focus: "Corpo Completo",
      exercises: selectedExercises.slice(0, 8),
      duration: "60-75 min"
    }];
  } else if (frequency === 3) {
    return [
      { day: "A", focus: "Peito, Ombro e Tríceps", exercises: selectedExercises.slice(0, 5), duration: "45-60 min" },
      { day: "B", focus: "Costas e Bíceps", exercises: selectedExercises.slice(2, 7), duration: "45-60 min" },
      { day: "C", focus: "Pernas e Core", exercises: selectedExercises.slice(4, 9), duration: "50-65 min" }
    ];
  } else {
    return [
      { day: "A", focus: "Peito", exercises: selectedExercises.slice(0, 4), duration: "40-50 min" },
      { day: "B", focus: "Costas", exercises: selectedExercises.slice(1, 5), duration: "40-50 min" },
      { day: "C", focus: "Ombros e Traps", exercises: selectedExercises.slice(2, 6), duration: "40-50 min" },
      { day: "D", focus: "Pernas", exercises: selectedExercises.slice(3, 7), duration: "50-60 min" },
      { day: "E", focus: "Braços e Core", exercises: selectedExercises.slice(4, 8), duration: "40-50 min" }
    ];
  }
};

const WorkoutPlan = ({ biotipo, frequency, exercises, onReset }: WorkoutPlanProps) => {
  const plan = getWorkoutPlan(biotipo, frequency, exercises);
  
  const biotipoLabels: Record<string, string> = {
    ectomorfo: "Ectomorfo",
    mesomorfo: "Mesomorfo",
    endomorfo: "Endomorfo"
  };

  const biotipoTips: Record<string, string> = {
    ectomorfo: "Foco em exercícios compostos com cargas pesadas e descansos mais longos. Priorize o ganho de massa muscular.",
    mesomorfo: "Combinação equilibrada de força e resistência. Seu corpo responde bem a variações de treino.",
    endomorfo: "Inclua mais cardio e circuitos. Mantenha os descansos curtos para manter o metabolismo acelerado."
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center"
        >
          <Dumbbell className="w-10 h-10 text-primary" />
        </motion.div>
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
          Seu Plano de Treino
        </h2>
        <p className="text-muted-foreground">
          Personalizado para biotipo <span className="text-primary font-semibold">{biotipoLabels[biotipo]}</span>
        </p>
      </div>

      {/* Tip Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
            <Target className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">Dica para seu biotipo</h3>
            <p className="text-sm text-muted-foreground">{biotipoTips[biotipo]}</p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: Calendar, label: "Frequência", value: `${frequency}x/semana` },
          { icon: Clock, label: "Duração", value: "45-60 min" },
          { icon: Flame, label: "Intensidade", value: biotipo === "endomorfo" ? "Alta" : "Moderada" }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="glass-card p-4 text-center"
          >
            <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
            <div className="text-xs text-muted-foreground mb-1">{stat.label}</div>
            <div className="font-semibold">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Workout Days */}
      <div className="space-y-4">
        {plan.map((day, index) => (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center font-display font-bold">
                  {day.day}
                </div>
                <div>
                  <h3 className="font-semibold">{day.focus}</h3>
                  <p className="text-xs text-muted-foreground">{day.duration}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex flex-wrap gap-2">
              {day.exercises.map((exercise) => (
                <span
                  key={exercise}
                  className="px-3 py-1 rounded-full bg-secondary text-sm text-muted-foreground"
                >
                  {exercise}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Reset Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center pt-4"
      >
        <Button
          variant="outline"
          size="lg"
          onClick={onReset}
          className="border-primary/30 hover:bg-primary/10 hover:text-primary"
        >
          Criar Novo Plano
        </Button>
      </motion.div>
    </motion.div>
  );
};

// Import Calendar for stats section
import { Calendar } from "lucide-react";

export default WorkoutPlan;
