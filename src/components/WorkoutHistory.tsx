import { motion } from "framer-motion";
import { Calendar, Clock, Trash2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkoutRecord } from "@/hooks/useWorkoutProgress";
import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface WorkoutHistoryProps {
  records: WorkoutRecord[];
  onRemove: (id: string) => void;
}

const WorkoutHistory = ({ records, onRemove }: WorkoutHistoryProps) => {
  if (records.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-card p-8 text-center"
      >
        <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="font-semibold mb-2">Nenhum treino registrado</h3>
        <p className="text-sm text-muted-foreground">
          Comece a marcar seus treinos como completos para ver seu histórico aqui.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-display text-xl font-bold">Histórico Recente</h3>
        <span className="text-sm text-muted-foreground">{records.length} treinos</span>
      </div>

      <div className="space-y-3">
        {records.map((record, index) => (
          <motion.div
            key={record.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="glass-card p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Treino {record.dayLabel}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-500">
                      Completo
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">{record.focus}</div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {format(new Date(record.date), "dd/MM/yyyy", { locale: ptBR })}
                    </span>
                    {record.duration && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {record.duration} min
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground hidden md:block">
                  {formatDistanceToNow(new Date(record.date), { addSuffix: true, locale: ptBR })}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemove(record.id)}
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutHistory;
