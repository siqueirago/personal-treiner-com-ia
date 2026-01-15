import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, ChevronRight, ChevronLeft, Zap, Settings, Heart, Scale, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import BiotipoCard from "@/components/BiotipoCard";
import FrequencySelector from "@/components/FrequencySelector";
import ExerciseTypeCard from "@/components/ExerciseTypeCard";
import StepIndicator from "@/components/StepIndicator";
import WorkoutPlan from "@/components/WorkoutPlan";
import heroBg from "@/assets/hero-bg.jpg";

const BIOTIPOS = [
  {
    id: "ectomorfo",
    title: "Ectomorfo",
    description: "Corpo mais magro, difícil ganhar peso e massa muscular. Metabolismo rápido.",
    icon: "🏃"
  },
  {
    id: "mesomorfo",
    title: "Mesomorfo",
    description: "Corpo naturalmente musculoso, facilidade para ganhar massa muscular e perder gordura.",
    icon: "💪"
  },
  {
    id: "endomorfo",
    title: "Endomorfo",
    description: "Corpo com tendência a acumular gordura, maior dificuldade em perder peso.",
    icon: "🎯"
  }
];

const FREQUENCY_OPTIONS = [
  {
    days: 1,
    label: "dia por semana",
    type: "Full Body",
    description: "Treino completo em uma única sessão"
  },
  {
    days: 3,
    label: "dias por semana",
    type: "ABC",
    description: "Divisão em 3 grupos musculares"
  },
  {
    days: 5,
    label: "dias por semana",
    type: "ABCDE",
    description: "Máxima divisão e especificidade"
  }
];

const EXERCISE_TYPES = [
  {
    id: "funcional",
    title: "Funcional",
    description: "Movimentos naturais e dinâmicos",
    Icon: Zap
  },
  {
    id: "maquinario",
    title: "Maquinário",
    description: "Equipamentos de academia tradicionais",
    Icon: Settings
  },
  {
    id: "peso_livre",
    title: "Peso Livre",
    description: "Halteres, barras e kettlebells",
    Icon: Dumbbell
  },
  {
    id: "cardio",
    title: "Cardio",
    description: "Exercícios aeróbicos e de resistência",
    Icon: Heart
  },
  {
    id: "hiit",
    title: "HIIT",
    description: "Alta intensidade intervalada",
    Icon: Activity
  }
];

const STEP_LABELS = ["Biotipo", "Frequência", "Exercícios", "Plano"];

const Index = () => {
  const [step, setStep] = useState(0); // 0 = hero, 1-4 = steps
  const [biotipo, setBiotipo] = useState<string | null>(null);
  const [frequency, setFrequency] = useState<number | null>(null);
  const [exerciseTypes, setExerciseTypes] = useState<string[]>([]);

  const handleExerciseToggle = (id: string) => {
    setExerciseTypes(prev =>
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  const canProceed = () => {
    if (step === 1) return biotipo !== null;
    if (step === 2) return frequency !== null;
    if (step === 3) return exerciseTypes.length > 0;
    return true;
  };

  const handleReset = () => {
    setStep(0);
    setBiotipo(null);
    setFrequency(null);
    setExerciseTypes([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {step === 0 ? (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${heroBg})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary mb-8"
              >
                <Dumbbell className="w-4 h-4" />
                <span className="text-sm font-medium">Personal Trainer IA</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              >
                Seu Treino <span className="gradient-text">Personalizado</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
              >
                Descubra o plano de treino ideal para seu corpo. 
                Baseado no seu biotipo, disponibilidade e preferências.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  size="lg"
                  onClick={() => setStep(1)}
                  className="group px-8 py-6 text-lg font-semibold bg-primary hover:bg-primary/90 glow-effect"
                >
                  Começar Agora
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
              >
                {[
                  { icon: Scale, label: "Biotipo" },
                  { icon: Activity, label: "Frequência" },
                  { icon: Dumbbell, label: "Exercícios" }
                ].map((feature, index) => (
                  <div key={feature.label} className="text-center">
                    <feature.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                    <span className="text-sm text-muted-foreground">{feature.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen py-8 px-6"
          >
            <div className="max-w-3xl mx-auto">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center mb-8"
              >
                <div className="inline-flex items-center gap-2 text-primary">
                  <Dumbbell className="w-6 h-6" />
                  <span className="font-display font-bold text-xl">FitAI</span>
                </div>
              </motion.div>

              {/* Step Indicator */}
              {step < 4 && (
                <StepIndicator
                  currentStep={step}
                  totalSteps={3}
                  labels={STEP_LABELS.slice(0, 3)}
                />
              )}

              {/* Step Content */}
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
                        Qual é o seu biotipo?
                      </h2>
                      <p className="text-muted-foreground">
                        Escolha o que mais se aproxima do seu corpo atual
                      </p>
                    </div>
                    <div className="space-y-4">
                      {BIOTIPOS.map((bio, index) => (
                        <motion.div
                          key={bio.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <BiotipoCard
                            {...bio}
                            selected={biotipo === bio.id}
                            onSelect={setBiotipo}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
                        Quantos dias você pode treinar?
                      </h2>
                      <p className="text-muted-foreground">
                        Escolha sua disponibilidade semanal
                      </p>
                    </div>
                    <FrequencySelector
                      options={FREQUENCY_OPTIONS}
                      selected={frequency}
                      onSelect={setFrequency}
                    />
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
                        Tipos de exercícios preferidos
                      </h2>
                      <p className="text-muted-foreground">
                        Selecione um ou mais tipos
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {EXERCISE_TYPES.map((exercise, index) => (
                        <motion.div
                          key={exercise.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <ExerciseTypeCard
                            {...exercise}
                            selected={exerciseTypes.includes(exercise.id)}
                            onToggle={handleExerciseToggle}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 4 && biotipo && frequency && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <WorkoutPlan
                      biotipo={biotipo}
                      frequency={frequency}
                      exercises={exerciseTypes}
                      onReset={handleReset}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation */}
              {step > 0 && step < 4 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-between items-center mt-12"
                >
                  <Button
                    variant="ghost"
                    onClick={() => setStep(s => s - 1)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Voltar
                  </Button>
                  <Button
                    onClick={() => setStep(s => s + 1)}
                    disabled={!canProceed()}
                    className="bg-primary hover:bg-primary/90 disabled:opacity-50"
                  >
                    {step === 3 ? "Gerar Plano" : "Continuar"}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
