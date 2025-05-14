import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateSavings(currentBill: number, solarRate: number, years: number = 20): number {
  let totalSavings = 0;
  const annualIncrease = 0.04; // 4% annual increase for utility bills
  
  for (let year = 0; year < years; year++) {
    const yearlyUtilityBill = currentBill * 12 * Math.pow(1 + annualIncrease, year);
    const yearlySolarBill = solarRate * 12;
    totalSavings += (yearlyUtilityBill - yearlySolarBill);
  }
  
  return totalSavings;
}
