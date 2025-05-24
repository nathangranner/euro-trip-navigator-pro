
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface DatabaseExpense {
  id: string;
  trip_day_id: string;
  category: string;
  amount: number;
  currency: string;
  description?: string;
  receipt_image_url?: string;
  created_at: string;
}

export const useExpenses = (tripDayId?: string) => {
  const [expenses, setExpenses] = useState<DatabaseExpense[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchExpenses = async () => {
    try {
      let query = supabase.from('expenses').select('*');
      
      if (tripDayId) {
        query = query.eq('trip_day_id', tripDayId);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      setExpenses(data || []);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      toast({
        title: "Error",
        description: "Failed to fetch expenses",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createExpense = async (expenseData: Omit<DatabaseExpense, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('expenses')
        .insert([expenseData])
        .select()
        .single();

      if (error) throw error;

      setExpenses(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Expense added successfully"
      });
      
      return data;
    } catch (error) {
      console.error('Error creating expense:', error);
      toast({
        title: "Error",
        description: "Failed to add expense",
        variant: "destructive"
      });
    }
  };

  const updateExpense = async (expenseId: string, updates: Partial<DatabaseExpense>) => {
    try {
      const { error } = await supabase
        .from('expenses')
        .update(updates)
        .eq('id', expenseId);

      if (error) throw error;

      await fetchExpenses();
      toast({
        title: "Success",
        description: "Expense updated successfully"
      });
    } catch (error) {
      console.error('Error updating expense:', error);
      toast({
        title: "Error",
        description: "Failed to update expense",
        variant: "destructive"
      });
    }
  };

  const deleteExpense = async (expenseId: string) => {
    try {
      const { error } = await supabase
        .from('expenses')
        .delete()
        .eq('id', expenseId);

      if (error) throw error;

      setExpenses(prev => prev.filter(expense => expense.id !== expenseId));
      toast({
        title: "Success",
        description: "Expense deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting expense:', error);
      toast({
        title: "Error",
        description: "Failed to delete expense",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [tripDayId]);

  return {
    expenses,
    loading,
    createExpense,
    updateExpense,
    deleteExpense,
    refetchExpenses: fetchExpenses
  };
};
