
import React from "react";
import { StatsCard } from "./StatsCard";

interface ExpenseDisplayProps {
  totals: Record<string, number>;
  title: string;
}

export const ExpenseDisplay: React.FC<ExpenseDisplayProps> = ({ totals, title }) => {
  return (
    <StatsCard
      title={title}
      value={
        <>
          {totals.EUR > 0 && <div>€{totals.EUR.toFixed(2)}</div>}
          {totals.USD > 0 && <div>${totals.USD.toFixed(2)}</div>}
          {totals.GBP > 0 && <div>£{totals.GBP.toFixed(2)}</div>}
          {totals.CHF > 0 && <div>CHF {totals.CHF.toFixed(2)}</div>}
          {!totals.EUR && !totals.USD && !totals.GBP && !totals.CHF && <div>No expenses</div>}
        </>
      }
    />
  );
};
