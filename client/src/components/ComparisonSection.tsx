import { useState, useEffect, useRef, useMemo } from "react";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import Chart from "chart.js/auto";

interface SavingsChartProps {
  currentBill: number;
  solarRate: number;
}

const ComparisonSection = () => {
  const [currentBill, setCurrentBill] = useState<number>(120);
  const [utilityProvider, setUtilityProvider] = useState<string>("PSEG");
  const [monthlySavings, setMonthlySavings] = useState<number>(12);
  const [totalSavings, setTotalSavings] = useState<number>(20189);
  
  // Calculate SolarMan fixed rate as 15% less than current bill (always)
  const solarRate = useMemo(() => {
    return Math.round(currentBill * 0.85);
  }, [currentBill]);
  
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  // Initialize chart on component mount
  useEffect(() => {
    if (chartRef.current) {
      initializeChart();
    }
    
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  // Update chart and calculate savings whenever current bill or solar rate changes
  useEffect(() => {
    if (chartInstance.current) {
      updateChart();
    }
    
    // Calculate and display savings
    const monthSavings = currentBill - solarRate;
    
    // Calculate 25-year savings with the 4% annual increase in utility bills
    let totalSavingsAmount = 0;
    for (let year = 0; year < 25; year++) {
      const yearlyUtilityBill = currentBill * 12 * Math.pow(1.04, year);
      const yearlySolarBill = solarRate * 12;
      totalSavingsAmount += (yearlyUtilityBill - yearlySolarBill);
    }
    
    setMonthlySavings(monthSavings);
    setTotalSavings(Math.round(totalSavingsAmount));
  }, [currentBill, solarRate]);

  const initializeChart = () => {
    const ctx = chartRef.current?.getContext('2d');
    if (!ctx) return;

    // Default data for 25 years
    const labels = Array.from({ length: 26 }, (_, i) => i);
    
    // Calculate utility bills with 4% annual increase
    const utilityData = labels.map(year => currentBill * Math.pow(1.04, year));
    
    // SolarMan rate stays flat
    const solarData = labels.map(() => solarRate);
    
    // Create the chart
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Utility Bills',
            data: utilityData,
            borderColor: '#EF4444',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            borderWidth: 2,
            tension: 0.1,
            fill: false
          },
          {
            label: 'SolarMan Fixed Rate',
            data: solarData,
            borderColor: 'hsl(var(--primary))',
            backgroundColor: 'rgba(28, 100, 242, 0.1)',
            borderWidth: 2,
            tension: 0.1,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': $' + context.parsed.y.toFixed(2);
              }
            }
          }
        },
        scales: {
          x: {
            display: false,
            title: {
              display: true,
              text: 'Years'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Monthly Cost ($)'
            },
            ticks: {
              callback: function(value) {
                return '$' + value;
              }
            }
          }
        }
      }
    });
  };

  const updateChart = () => {
    if (!chartInstance.current) return;
    
    // Calculate utility bills with 4% annual increase for 25 years
    const labels = Array.from({ length: 26 }, (_, i) => i);
    const utilityData = labels.map(year => currentBill * Math.pow(1.04, year));
    
    // SolarMan rate stays flat
    const solarData = labels.map(() => solarRate);
    
    // Update chart data
    chartInstance.current.data.datasets[0].data = utilityData;
    chartInstance.current.data.datasets[1].data = solarData;
    chartInstance.current.update();
  };

  return (
    <section id="compare" className="section py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[hsl(var(--dark))] mb-4">See How Much You'll Save</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Compare your current utility bill with SolarMan's fixed rate and watch your savings grow over time.
          </p>
        </div>
        
        <Card className="bg-white rounded-xl shadow-xl p-6 md:p-8 max-w-4xl mx-auto">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="mb-6">
                  <Label htmlFor="current-bill" className="block text-gray-700 font-medium mb-2">
                    Your Current Monthly Bill ($)
                  </Label>
                  <Input 
                    id="current-bill" 
                    type="number" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" 
                    placeholder="e.g. 120" 
                    value={currentBill} 
                    onChange={(e) => setCurrentBill(Number(e.target.value))}
                  />
                </div>
                
                <div className="mb-6">
                  <Label htmlFor="solar-rate" className="block text-gray-700 font-medium mb-2">
                    SolarMan Fixed Rate ($)
                  </Label>
                  <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 font-medium">
                    ${solarRate} <span className="text-sm text-green-600 ml-2">(Always 10% less than your current bill)</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <Label htmlFor="utility-provider" className="block text-gray-700 font-medium mb-2">
                    Your Utility Provider
                  </Label>
                  <Select 
                    value={utilityProvider} 
                    onValueChange={setUtilityProvider}
                  >
                    <SelectTrigger id="utility-provider" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                      <SelectValue placeholder="Select your provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PSEG">PSEG</SelectItem>
                      <SelectItem value="PECO">PECO</SelectItem>
                      <SelectItem value="PPL">PPL</SelectItem>
                      <SelectItem value="JCP&L">JCP&L</SelectItem>
                      <SelectItem value="Atlantic City Electric">Atlantic City Electric</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="font-bold text-green-700 text-lg mb-2">Your 25-Year Savings</div>
                  <div className="text-2xl font-bold text-green-800">${totalSavings.toLocaleString()}</div>
                  <div className="text-green-600 mt-1">You'll save ${monthlySavings.toFixed(0)} every month!</div>
                </div>
              </div>
              
              <div>
                <div className="h-80">
                  <canvas ref={chartRef} id="savings-chart"></canvas>
                </div>
                <div className="mt-4 flex justify-between text-sm text-gray-500">
                  <div>Year 1</div>
                  <div>Year 5</div>
                  <div>Year 10</div>
                  <div>Year 15</div>
                  <div>Year 20</div>
                  <div>Year 25</div>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center mb-2">
                    <span className="inline-block w-4 h-4 bg-red-500 rounded-full mr-2"></span>
                    <span className="text-gray-700">Utility Bills (4% annual increase)</span>
                  </div>
                  <div className="flex items-center">
                    <span className="inline-block w-4 h-4 bg-primary rounded-full mr-2"></span>
                    <span className="text-gray-700">SolarMan Fixed Rate</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ComparisonSection;
