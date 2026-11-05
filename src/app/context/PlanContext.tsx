"use client";

import { createContext, useContext, useState, ReactNode } from "react";

import { IGymCardType } from "../types/GymCardType";

interface PlanContextType {
  todayPlan: IGymCardType[];
  savedCards: IGymCardType[];
  addToPlan: (card: IGymCardType) => boolean;
  removeFromPlan: (id: number) => void;
  toggleSaved: (card: IGymCardType) => void;
  removeSaved: (id: number) => void;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider = ({ children }: { children: ReactNode }) => {
  const [todayPlan, setTodayPlan] = useState<IGymCardType[]>([]);
  const [savedCards, setSavedCards] = useState<IGymCardType[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Add workout to today's plan (maximum 5)
  const addToPlan = (card: IGymCardType) => {
    if (todayPlan.some((item) => item.id === card.id)) {
      return false;
    }

    if (todayPlan.length >= 5) {
      return false;
    }

    setTodayPlan((prev) => [...prev, card]);
    return true;
  };

  // Remove workout from today's plan
  const removeFromPlan = (id: number) => {
    setTodayPlan((prev) => prev.filter((card) => card.id !== id));
  };

  // Save or unsave a workout
  const toggleSaved = (card: IGymCardType) => {
    setSavedCards((prev) =>
      prev.some((item) => item.id === card.id)
        ? prev.filter((item) => item.id !== card.id)
        : [...prev, card],
    );
  };

  const removeSaved = (id: number) => {
    setSavedCards((prev) => prev.filter((card) => card.id !== id));
  };

  const isInPlan = (id: number) => todayPlan.some((card) => card.id === id);

  const isSaved = (id: number) => savedCards.some((card) => card.id === id);

  return (
    <PlanContext.Provider
      value={{
        todayPlan,
        savedCards,
        addToPlan,
        removeFromPlan,
        toggleSaved,
        removeSaved,
        isInPlan,
        isSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error("usePlan must be used inside PlanProvider");
  }

  return context;
};
