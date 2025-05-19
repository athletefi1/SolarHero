import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { useLocation } from "wouter";

const ChartPage = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [, setLocation] = useLocation();
  const [currentBill, setCurrentBill] = useState<number>(300);
  const [solarRate, setSolarRate] = useState<number>(255);
  const [yearlyData, setYearlyData] = useState<{utility: number[], solar: number[]}>({
    utility: [],
    solar: []
  });
  const [totalSavings, setTotalSavings] = useState<number>(0);
  
  useEffect(() => {
    // Get query parameters if any
    const params = new URLSearchParams(window.location.search);
    const billParam = params.get('bill');
    const rateParam = params.get('rate');
    
    if (billParam) {
      setCurrentBill(parseInt(billParam));
    }
    
    if (rateParam) {
      setSolarRate(parseInt(rateParam));
    }
  }, []);
  
  useEffect(() => {
    // Calculate 25-year data for the chart
    const years = Array.from({ length: 26 }, (_, i) => i);
    const utilityData = years.map(year => 
      parseFloat((currentBill * Math.pow(1.04, year)).toFixed(2))
    );
    const solarData = Array(26).fill(solarRate);
    
    setYearlyData({
      utility: utilityData,
      solar: solarData
    });
    
    // Calculate total savings
    let totalSavingsAmount = 0;
    for (let year = 0; year < 25; year++) {
      const yearlyUtilityBill = currentBill * 12 * Math.pow(1.04, year);
      const yearlySolarBill = solarRate * 12;
      totalSavingsAmount += (yearlyUtilityBill - yearlySolarBill);
    }
    
    setTotalSavings(Math.round(totalSavingsAmount));
  }, [currentBill, solarRate]);
  
  // Initialize chart
  useEffect(() => {
    if (!chartRef.current || yearlyData.utility.length === 0) return;
    
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;
    
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({ length: 26 }, (_, i) => `Year ${i}`),
        datasets: [
          {
            label: 'Utility Bills',
            data: yearlyData.utility,
            borderColor: '#EF4444',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            borderWidth: 2,
            tension: 0.1,
            fill: false
          },
          {
            label: 'SolarMan Fixed Rate',
            data: yearlyData.solar,
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
            position: 'top',
            align: 'center',
            labels: {
              usePointStyle: true,
              padding: 20,
              font: {
                size: 14
              }
            }
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
            title: {
              display: true,
              text: 'Years',
              font: {
                size: 14
              }
            },
            ticks: {
              callback: function(value, index) {
                if (index % 5 === 0) return `Year ${index}`;
                return '';
              },
              font: {
                size: 12
              }
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Monthly Cost ($)',
              font: {
                size: 14
              }
            },
            ticks: {
              callback: function(value) {
                return '$' + value;
              },
              font: {
                size: 12
              }
            }
          }
        }
      }
    });
    
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [yearlyData]);
  
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          25-Year Energy Cost Comparison
        </h1>
        
        <div className="bg-white rounded-xl shadow-xl p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="mb-4">
                <div className="font-bold mb-2">Your Current Monthly Bill</div>
                <div className="text-2xl">${currentBill}</div>
              </div>
              
              <div className="mb-4">
                <div className="font-bold mb-2">SolarMan Fixed Rate</div>
                <div className="text-2xl">${solarRate}</div>
              </div>
              
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="font-bold text-green-700 text-lg mb-2">Your 25-Year Savings</div>
                <div className="text-3xl font-bold text-green-800">${totalSavings.toLocaleString()}</div>
                <div className="text-green-600 mt-1">You'll save ${((currentBill - solarRate) * 12).toFixed(0)} in the first year!</div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span className="inline-block w-4 h-4 bg-red-500 rounded-full mr-2"></span>
                  <span className="text-gray-700">Utility Bills (4% annual increase)</span>
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-4 h-4 bg-primary rounded-full mr-2"></span>
                  <span className="text-gray-700">SolarMan Fixed Rate</span>
                </div>
              </div>
              <div className="text-sm text-gray-500 mb-2">
                * Chart shows monthly payment comparison over 25 years
              </div>
            </div>
          </div>
          
          <div className="h-[500px]">
            <canvas ref={chartRef} id="savings-chart"></canvas>
          </div>
        </div>
        
        <div className="flex justify-center">
          <button 
            onClick={() => setLocation('/')}
            className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Back to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChartPage;