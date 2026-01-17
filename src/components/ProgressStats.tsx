import { motion } from "framer-motion";
import { Trophy, Flame, Calendar, TrendingUp, Target, Zap } from "lucide-react";
import { WorkoutStats } from "@/hooks/useWorkoutProgress";

interface ProgressStatsProps {
  stats: WorkoutStats;
}

const ProgressStats = ({ stats }: ProgressStatsProps) => {
  const statCards = [
    {
      icon: Trophy,
      label: "Treinos Completos",
      value: stats.totalCompleted,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/20",
    },
    {
      icon: Flame,
      label: "Sequência Atual",
      value: `${stats.currentStreak} dias`,
      color: "text-orange-500",
      bgColor: "bg-orange-500/20",
    },
    {
      icon: Zap,
      label: "Maior Sequência",
      value: `${stats.longestStreak} dias`,
      color: "text-primary",
      bgColor: "bg-primary/20",
    },
    {
      icon: Calendar,
      label: "Esta Semana",
      value: stats.thisWeek,
      color: "text-blue-500",
      bgColor: "bg-blue-500/20",
    },
    {
      icon: TrendingUp,
      label: "Este Mês",
      value: stats.thisMonth,
      color: "text-green-500",
      bgColor: "bg-green-500/20",
    },
    {
      icon: Target,
      label: "Taxa de Conclusão",
      value: `${stats.completionRate}%`,
      color: "text-purple-500",
      bgColor: "bg-purple-500/20",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="font-display text-xl font-bold mb-2">Suas Estatísticas</h3>
        <p className="text-sm text-muted-foreground">Acompanhe seu progresso</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="glass-card p-4 text-center"
          >
            <div className={`w-10 h-10 mx-auto mb-3 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="font-display text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-4"
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Meta Semanal</span>
          <span className="text-sm text-muted-foreground">{stats.thisWeek}/3 treinos</span>
        </div>
        <div className="h-3 bg-secondary rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, (stats.thisWeek / 3) * 100)}%` }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="h-full bg-gradient-to-r from-primary to-orange-500 rounded-full"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default ProgressStats;
