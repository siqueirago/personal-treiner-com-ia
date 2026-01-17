import { useState, useEffect } from "react";

export interface WorkoutRecord {
  id: string;
  date: string;
  dayLabel: string;
  focus: string;
  completed: boolean;
  duration?: number; // in minutes
}

export interface WorkoutStats {
  totalCompleted: number;
  currentStreak: number;
  longestStreak: number;
  thisWeek: number;
  thisMonth: number;
  completionRate: number;
}

const STORAGE_KEY = "fitai-workout-progress";

export const useWorkoutProgress = () => {
  const [records, setRecords] = useState<WorkoutRecord[]>([]);

  // Load records from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setRecords(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse workout records", e);
      }
    }
  }, []);

  // Save records to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  }, [records]);

  const addWorkoutRecord = (dayLabel: string, focus: string, duration?: number) => {
    const newRecord: WorkoutRecord = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      date: new Date().toISOString(),
      dayLabel,
      focus,
      completed: true,
      duration,
    };
    setRecords(prev => [...prev, newRecord]);
    return newRecord;
  };

  const removeWorkoutRecord = (id: string) => {
    setRecords(prev => prev.filter(r => r.id !== id));
  };

  const getStats = (): WorkoutStats => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const completedRecords = records.filter(r => r.completed);
    const totalCompleted = completedRecords.length;

    // This week
    const thisWeek = completedRecords.filter(r => new Date(r.date) >= startOfWeek).length;

    // This month
    const thisMonth = completedRecords.filter(r => new Date(r.date) >= startOfMonth).length;

    // Calculate streaks
    const sortedDates = [...new Set(
      completedRecords.map(r => new Date(r.date).toDateString())
    )].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    // Check if trained today or yesterday for current streak
    if (sortedDates.length > 0) {
      const lastTrainingDate = new Date(sortedDates[0]);
      lastTrainingDate.setHours(0, 0, 0, 0);

      if (lastTrainingDate.getTime() === today.getTime() || 
          lastTrainingDate.getTime() === yesterday.getTime()) {
        currentStreak = 1;
        
        for (let i = 1; i < sortedDates.length; i++) {
          const currentDate = new Date(sortedDates[i - 1]);
          const prevDate = new Date(sortedDates[i]);
          const diffDays = Math.floor((currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));
          
          if (diffDays === 1) {
            currentStreak++;
          } else {
            break;
          }
        }
      }
    }

    // Calculate longest streak
    for (let i = 0; i < sortedDates.length; i++) {
      if (i === 0) {
        tempStreak = 1;
      } else {
        const currentDate = new Date(sortedDates[i - 1]);
        const prevDate = new Date(sortedDates[i]);
        const diffDays = Math.floor((currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          tempStreak++;
        } else {
          longestStreak = Math.max(longestStreak, tempStreak);
          tempStreak = 1;
        }
      }
    }
    longestStreak = Math.max(longestStreak, tempStreak);

    // Completion rate (based on assumed 3 days per week goal)
    const weeksSinceStart = records.length > 0 
      ? Math.ceil((now.getTime() - new Date(records[0].date).getTime()) / (1000 * 60 * 60 * 24 * 7)) || 1
      : 1;
    const expectedWorkouts = weeksSinceStart * 3;
    const completionRate = Math.min(100, Math.round((totalCompleted / expectedWorkouts) * 100));

    return {
      totalCompleted,
      currentStreak,
      longestStreak,
      thisWeek,
      thisMonth,
      completionRate,
    };
  };

  const getRecentRecords = (limit: number = 10): WorkoutRecord[] => {
    return [...records]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  };

  const hasTrainedToday = (dayLabel: string): boolean => {
    const today = new Date().toDateString();
    return records.some(
      r => r.dayLabel === dayLabel && new Date(r.date).toDateString() === today
    );
  };

  return {
    records,
    addWorkoutRecord,
    removeWorkoutRecord,
    getStats,
    getRecentRecords,
    hasTrainedToday,
  };
};
