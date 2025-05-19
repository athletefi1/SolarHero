import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { useLocation } from "wouter";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

const ChartPage = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [, setLocation] = useLocation();
  const [currentBill, setCurrentBill] = useState<number>(300);
  const [solarRate, setSolarRate] = useState<number>(255);
  const [annualIncrease, setAnnualIncrease] = useState<number>(4);
  const [yearsToProject, setYearsToProject] = useState<number>(25);
  const [yearlyData, setYearlyData] = useState<{
    utility: number[], 
    solar: number[],
    cumulativeUtility: number[],
    cumulativeSolar: number[],
    savings: number[]
  }>({
    utility: [],
    solar: [],
    cumulativeUtility: [],
    cumulativeSolar: [],
    savings: []
  });
  const [totalSavings, setTotalSavings] = useState<number>(0);
  const [firstYearSavings, setFirstYearSavings] = useState<number>(0);
  
  useEffect(() => {
    // Get query parameters if any
    const params = new URLSearchParams(window.location.search);
    const billParam = params.get('bill');
    const rateParam = params.get('rate');
    const increaseParam = params.get('increase');
    
    if (billParam) {
      const bill = parseInt(billParam);
      setCurrentBill(bill);
    }
    
    if (rateParam) {
      const rate = parseInt(rateParam);
      setSolarRate(rate);
    }
    
    if (increaseParam) {
      const increase = parseFloat(increaseParam);
      setAnnualIncrease(increase);
    }
  }, []);
  
  useEffect(() => {
    // Calculate multi-year data for the chart
    const years = Array.from({ length: yearsToProject + 1 }, (_, i) => i);
    const annualRateMultiplier = 1 + (annualIncrease / 100);
    
    // Monthly data
    const utilityData = years.map(year => 
      parseFloat((currentBill * Math.pow(annualRateMultiplier, year)).toFixed(2))
    );
    const solarData = Array(yearsToProject + 1).fill(solarRate);
    
    // Yearly data (monthly * 12)
    const yearlyUtilityData = utilityData.map(monthlyValue => monthlyValue * 12);
    const yearlySolarData = solarData.map(monthlyValue => monthlyValue * 12);
    
    // Cumulative data
    let cumulativeUtility: number[] = [];
    let cumulativeSolar: number[] = [];
    let cumulativeSavings: number[] = [];
    
    let utilitySum = 0;
    let solarSum = 0;
    
    years.forEach(year => {
      utilitySum += yearlyUtilityData[year];
      solarSum += yearlySolarData[year];
      
      cumulativeUtility.push(utilitySum);
      cumulativeSolar.push(solarSum);
      cumulativeSavings.push(utilitySum - solarSum);
    });
    
    setYearlyData({
      utility: utilityData,
      solar: solarData,
      cumulativeUtility,
      cumulativeSolar,
      savings: cumulativeSavings
    });
    
    // Set derived values
    setTotalSavings(Math.round(cumulativeSavings[yearsToProject]));
    setFirstYearSavings(Math.round((currentBill - solarRate) * 12));
  }, [currentBill, solarRate, annualIncrease, yearsToProject]);

  // Handle share button
  const handleShare = () => {
    const shareableUrl = `${window.location.origin}/chart?bill=${currentBill}&rate=${solarRate}&increase=${annualIncrease}`;
    navigator.clipboard.writeText(shareableUrl);
    alert("Shareable link copied to clipboard!");
  };

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
        labels: Array.from({ length: yearsToProject + 1 }, (_, i) => `Year ${i}`),
        datasets: [
          {
            label: 'Utility Bills',
            data: yearlyData.utility,
            borderColor: '#EF4444',
            backgroundColor: 'rgba(239, 68, 68, 0.05)',
            borderWidth: 2,
            tension: 0.3,
            fill: false
          },
          {
            label: 'SolarMan Fixed Rate',
            data: yearlyData.solar,
            borderColor: '#1C64F2',
            backgroundColor: 'rgba(28, 100, 242, 0.05)',
            borderWidth: 4,
            tension: 0.3,
            fill: false,
            pointBackgroundColor: '#1C64F2',
            pointRadius: 5
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1000,
          easing: 'easeOutQuart'
        },
        plugins: {
          legend: {
            display: false // Hide the legend since we're using our custom legend
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(30, 41, 59, 0.9)',
            titleFont: {
              size: 14,
              weight: 'bold'
            },
            bodyFont: {
              size: 13
            },
            padding: 12,
            cornerRadius: 8,
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': $' + context.parsed.y.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                });
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(226, 232, 240, 0.8)'
            },
            title: {
              display: true,
              text: 'Years',
              font: {
                size: 14,
                weight: 'bold'
              },
              color: '#64748b'
            },
            ticks: {
              callback: function(value, index) {
                if (index % 5 === 0) return `Year ${index}`;
                return '';
              },
              font: {
                size: 12
              },
              color: '#64748b'
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(226, 232, 240, 0.8)'
            },
            title: {
              display: true,
              text: "Monthly Cost ($)",
              font: {
                size: 14,
                weight: 'bold'
              },
              color: '#64748b'
            },
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              },
              font: {
                size: 12
              },
              color: '#64748b'
            }
          }
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
        },
        elements: {
          point: {
            radius: 3,
            hoverRadius: 5
          },
          line: {
            tension: 0.3
          }
        }
      }
    });
    
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [yearlyData, yearsToProject]);
  
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 text-center text-[hsl(var(--dark))]">
            25-Year Energy Cost Comparison
          </h1>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            See how much you can save by switching to SolarMan's fixed rate plan compared to your current utility provider's increasing rates.
          </p>
          
          <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 mb-8">
            {/* Input Controls */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 border-b border-gray-100 pb-8">
              <div>
                <Label htmlFor="current-bill" className="block text-gray-700 font-medium mb-2">
                  Monthly Utility Bill ($)
                </Label>
                <div>
                  <Input 
                    id="current-bill" 
                    type="number" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" 
                    value={currentBill} 
                    onChange={(e) => setCurrentBill(Number(e.target.value))}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="solar-rate" className="block text-gray-700 font-medium mb-2">
                  SolarMan Fixed Rate ($)
                </Label>
                <div>
                  <Input 
                    id="solar-rate" 
                    type="number" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" 
                    value={solarRate} 
                    onChange={(e) => setSolarRate(Number(e.target.value))}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="annual-increase" className="block text-gray-700 font-medium mb-2">
                  Annual Rate Increase
                </Label>
                <div className="flex items-center space-x-2">
                  <Input 
                    id="annual-increase" 
                    type="number" 
                    className="w-20 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" 
                    value={annualIncrease} 
                    onChange={(e) => setAnnualIncrease(Number(e.target.value))}
                  />
                  <span className="text-gray-700">%</span>
                  <div className="flex-1">
                    <Slider 
                      value={[annualIncrease]} 
                      min={1} 
                      max={20} 
                      step={1}
                      onValueChange={(values) => setAnnualIncrease(values[0])}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="projection-years" className="block text-gray-700 font-medium mb-2">
                  Projection Years
                </Label>
                <div className="flex items-center space-x-2">
                  <Input 
                    id="projection-years" 
                    type="number" 
                    className="w-20 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" 
                    value={yearsToProject} 
                    onChange={(e) => setYearsToProject(Number(e.target.value))}
                    min={5}
                    max={40}
                  />
                  <span className="text-gray-700">years</span>
                  <div className="flex-1">
                    <Slider 
                      value={[yearsToProject]} 
                      min={5} 
                      max={40} 
                      step={5}
                      onValueChange={(values) => setYearsToProject(values[0])}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Savings Summary */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="p-5 bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg text-center">
                <div className="text-green-700 font-medium mb-2">Total {yearsToProject}-Year Savings</div>
                <div className="text-3xl font-bold text-green-800">${totalSavings.toLocaleString()}</div>
              </div>
              
              <div className="p-5 bg-gradient-to-br from-green-50/80 to-green-100/80 border border-green-200 rounded-lg text-center">
                <div className="text-green-700 font-medium mb-2">First Year Savings</div>
                <div className="text-3xl font-bold text-green-800/90">${firstYearSavings.toLocaleString()}</div>
              </div>
              
              <div className="p-5 bg-gradient-to-br from-green-50/60 to-green-100/60 border border-green-200 rounded-lg text-center">
                <div className="text-green-700 font-medium mb-2">Monthly Savings</div>
                <div className="text-3xl font-bold text-green-800/80">${(firstYearSavings / 12).toFixed(0)}</div>
              </div>
            </div>
            
            {/* Chart Title */}
            <div className="mb-6 border-b border-gray-200 pb-3">
              <h3 className="text-xl font-semibold text-center text-gray-800">
                Monthly Payment Comparison
              </h3>
            </div>
            
            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-6">
              <div className="flex items-center">
                <span className="inline-block w-4 h-4 bg-red-500 rounded-full mr-2"></span>
                <span className="text-gray-700">
                  Utility Bills ({annualIncrease}% annual increase)
                </span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-4 h-4 bg-primary rounded-full mr-2"></span>
                <span className="text-gray-700">SolarMan Fixed Rate</span>
              </div>
            </div>
            
            {/* Chart */}
            <div className="h-[500px] mb-6">
              <canvas ref={chartRef} id="savings-chart"></canvas>
            </div>
            
            {/* Additional Information */}
            <div className="text-center text-sm text-gray-500 mb-4">
              * Chart shows cost comparison over {yearsToProject} years based on current rates and projected increases
            </div>
            
            {/* Share Button */}
            <div className="flex justify-center">
              <button 
                onClick={handleShare}
                className="flex items-center gap-2 px-5 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
                Share This Calculation
              </button>
            </div>
          </div>
          
          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => setLocation('/')}
              className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-md"
            >
              Back to Homepage
            </button>
            <button 
              onClick={() => setLocation('/#contact')}
              className="px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg font-medium hover:bg-yellow-500 transition-colors shadow-md"
            >
              Request a Solar Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartPage;