import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, Clock, Flame, Target, ChevronRight, CheckCircle2, BarChart3, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useWorkoutProgress } from "@/hooks/useWorkoutProgress";
import ProgressStats from "@/components/ProgressStats";
import WorkoutHistory from "@/components/WorkoutHistory";
import { toast } from "sonner";

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

type TabType = "plan" | "stats" | "history";

const WorkoutPlan = ({ biotipo, frequency, exercises, onReset }: WorkoutPlanProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("plan");
  const plan = getWorkoutPlan(biotipo, frequency, exercises);
  const { addWorkoutRecord, removeWorkoutRecord, getStats, getRecentRecords, hasTrainedToday } = useWorkoutProgress();

  const stats = getStats();
  const recentRecords = getRecentRecords(10);
  
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

  const handleCompleteWorkout = (day: WorkoutDay) => {
    if (hasTrainedToday(day.day)) {
      toast.info("Você já registrou esse treino hoje!");
      return;
    }
    
    const durationMatch = day.duration.match(/\d+/);
    const duration = durationMatch ? parseInt(durationMatch[0]) : undefined;
    
    addWorkoutRecord(day.day, day.focus, duration);
    toast.success(`Treino ${day.day} registrado! 💪`, {
      description: `${day.focus} - Parabéns pelo esforço!`,
    });
  };

  const tabs = [
    { id: "plan" as TabType, label: "Plano", icon: Dumbbell },
    { id: "stats" as TabType, label: "Estatísticas", icon: BarChart3 },
    { id: "history" as TabType, label: "Histórico", icon: History },
  ];

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

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="inline-flex bg-secondary/50 rounded-lg p-1 gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === "plan" && (
          <motion.div
            key="plan"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Tip Card */}
            <div className="glass-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Dica para seu biotipo</h3>
                  <p className="text-sm text-muted-foreground">{biotipoTips[biotipo]}</p>
                </div>
              </div>
            </div>

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
                  transition={{ delay: 0.1 + index * 0.05 }}
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
              {plan.map((day, index) => {
                const trainedToday = hasTrainedToday(day.day);
                
                return (
                  <motion.div
                    key={day.day}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className={`glass-card p-6 ${trainedToday ? "ring-2 ring-green-500/50" : ""}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-display font-bold ${
                          trainedToday ? "bg-green-500" : "bg-primary"
                        }`}>
                          {trainedToday ? <CheckCircle2 className="w-5 h-5" /> : day.day}
                        </div>
                        <div>
                          <h3 className="font-semibold">{day.focus}</h3>
                          <p className="text-xs text-muted-foreground">{day.duration}</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant={trainedToday ? "outline" : "default"}
                        onClick={() => handleCompleteWorkout(day)}
                        disabled={trainedToday}
                        className={trainedToday ? "border-green-500/50 text-green-500" : "bg-primary hover:bg-primary/90"}
                      >
                        {trainedToday ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 mr-1" />
                            Feito
                          </>
                        ) : (
                          <>
                            Marcar Completo
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </>
                        )}
                      </Button>
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
                );
              })}
            </div>
          </motion.div>
        )}

        {activeTab === "stats" && (
          <motion.div
            key="stats"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <ProgressStats stats={stats} />
          </motion.div>
        )}

        {activeTab === "history" && (
          <motion.div
            key="history"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <WorkoutHistory records={recentRecords} onRemove={removeWorkoutRecord} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reset Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
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

export default WorkoutPlan;
