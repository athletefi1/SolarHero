import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { useLocation } from "wouter";

const ChartPage = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [, setLocation] = useLocation();
  const [currentBill, setCurrentBill] = useState<number>(300);
  const [solarRate, setSolarRate] = useState<number>(255);
  const [annualIncrease, setAnnualIncrease] = useState<number>(4);
  const [yearlyData, setYearlyData] = useState<{utility: number[], solar: number[]}>({
    utility: [],
    solar: []
  });
  const [totalSavings, setTotalSavings] = useState<number>(0);
  
  // Edit states
  const [editingCurrentBill, setEditingCurrentBill] = useState<boolean>(false);
  const [editingSolarRate, setEditingSolarRate] = useState<boolean>(false);
  const [editingAnnualRate, setEditingAnnualRate] = useState<boolean>(false);
  const [tempCurrentBill, setTempCurrentBill] = useState<string>('300');
  const [tempSolarRate, setTempSolarRate] = useState<string>('255');
  const [tempAnnualRate, setTempAnnualRate] = useState<string>('4');
  
  useEffect(() => {
    // Get query parameters if any
    const params = new URLSearchParams(window.location.search);
    const billParam = params.get('bill');
    const rateParam = params.get('rate');
    const increaseParam = params.get('increase');
    
    if (billParam) {
      const bill = parseInt(billParam);
      setCurrentBill(bill);
      setTempCurrentBill(bill.toString());
    }
    
    if (rateParam) {
      const rate = parseInt(rateParam);
      setSolarRate(rate);
      setTempSolarRate(rate.toString());
    }
    
    if (increaseParam) {
      const increase = parseFloat(increaseParam);
      setAnnualIncrease(increase);
      setTempAnnualRate(increase.toString());
    }
  }, []);
  
  useEffect(() => {
    // Calculate 25-year data for the chart
    const years = Array.from({ length: 26 }, (_, i) => i);
    const annualRateMultiplier = 1 + (annualIncrease / 100);
    
    const utilityData = years.map(year => 
      parseFloat((currentBill * Math.pow(annualRateMultiplier, year)).toFixed(2))
    );
    const solarData = Array(26).fill(solarRate);
    
    setYearlyData({
      utility: utilityData,
      solar: solarData
    });
    
    // Calculate total savings
    let totalSavingsAmount = 0;
    for (let year = 0; year < 25; year++) {
      const yearlyUtilityBill = currentBill * 12 * Math.pow(annualRateMultiplier, year);
      const yearlySolarBill = solarRate * 12;
      totalSavingsAmount += (yearlyUtilityBill - yearlySolarBill);
    }
    
    setTotalSavings(Math.round(totalSavingsAmount));
  }, [currentBill, solarRate, annualIncrease]);
  
  // Handle editing bill value
  const handleBillEdit = () => {
    setEditingCurrentBill(true);
  };
  
  const saveBillEdit = () => {
    const newValue = parseInt(tempCurrentBill);
    if (!isNaN(newValue) && newValue > 0) {
      setCurrentBill(newValue);
    } else {
      setTempCurrentBill(currentBill.toString());
    }
    setEditingCurrentBill(false);
  };
  
  // Handle editing solar rate
  const handleRateEdit = () => {
    setEditingSolarRate(true);
  };
  
  const saveRateEdit = () => {
    const newValue = parseInt(tempSolarRate);
    if (!isNaN(newValue) && newValue > 0) {
      setSolarRate(newValue);
    } else {
      setTempSolarRate(solarRate.toString());
    }
    setEditingSolarRate(false);
  };
  
  // Handle editing annual increase
  const handleAnnualEdit = () => {
    setEditingAnnualRate(true);
  };
  
  const saveAnnualEdit = () => {
    const newValue = parseFloat(tempAnnualRate);
    if (!isNaN(newValue) && newValue >= 0) {
      setAnnualIncrease(newValue);
    } else {
      setTempAnnualRate(annualIncrease.toString());
    }
    setEditingAnnualRate(false);
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
            display: false // Hide the legend since we're using our custom legend
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
          {/* Legend at the top */}
          <div className="flex items-center justify-center gap-8 mb-6">
            <div className="flex items-center">
              <span className="inline-block w-4 h-4 bg-red-500 rounded-full mr-2"></span>
              <span className="text-gray-700">
                Utility Bills (
                {editingAnnualRate ? (
                  <input
                    type="text"
                    value={tempAnnualRate}
                    onChange={(e) => setTempAnnualRate(e.target.value)}
                    onBlur={saveAnnualEdit}
                    onKeyDown={(e) => e.key === 'Enter' && saveAnnualEdit()}
                    className="w-10 bg-gray-100 border border-gray-300 rounded px-1 text-center"
                    autoFocus
                  />
                ) : (
                  <span 
                    className="cursor-pointer hover:text-blue-600 hover:underline"
                    onDoubleClick={handleAnnualEdit}
                    title="Double-click to edit"
                  >
                    {annualIncrease}%
                  </span>
                )}
                {' '}annual increase)
              </span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-4 h-4 bg-primary rounded-full mr-2"></span>
              <span className="text-gray-700">SolarMan Fixed Rate</span>
            </div>
          </div>
          
          {/* Monthly Bills Comparison */}
          <div className="grid md:grid-cols-2 gap-8 mb-6">
            <div className="border border-gray-200 rounded p-4">
              <div className="font-bold mb-2">Your Current Monthly Bill</div>
              {editingCurrentBill ? (
                <div className="text-3xl">
                  $<input
                    type="text"
                    value={tempCurrentBill}
                    onChange={(e) => setTempCurrentBill(e.target.value)}
                    onBlur={saveBillEdit}
                    onKeyDown={(e) => e.key === 'Enter' && saveBillEdit()}
                    className="w-20 bg-gray-100 border border-gray-300 rounded px-1"
                    autoFocus
                  />
                </div>
              ) : (
                <div 
                  className="text-3xl cursor-pointer hover:text-blue-600" 
                  onDoubleClick={handleBillEdit}
                  title="Double-click to edit"
                >
                  ${currentBill}
                </div>
              )}
            </div>
            <div className="border border-gray-200 rounded p-4">
              <div className="font-bold mb-2">SolarMan Fixed Rate</div>
              {editingSolarRate ? (
                <div className="text-3xl">
                  $<input
                    type="text"
                    value={tempSolarRate}
                    onChange={(e) => setTempSolarRate(e.target.value)}
                    onBlur={saveRateEdit}
                    onKeyDown={(e) => e.key === 'Enter' && saveRateEdit()}
                    className="w-20 bg-gray-100 border border-gray-300 rounded px-1"
                    autoFocus
                  />
                </div>
              ) : (
                <div 
                  className="text-3xl cursor-pointer hover:text-blue-600" 
                  onDoubleClick={handleRateEdit}
                  title="Double-click to edit"
                >
                  ${solarRate}
                </div>
              )}
            </div>
          </div>
          
          {/* Savings Box */}
          <div className="max-w-lg mx-auto mb-8">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="font-bold text-green-700 text-lg mb-2">Your 25-Year Savings</div>
              <div className="text-3xl font-bold text-green-800">${totalSavings.toLocaleString()}</div>
              <div className="text-green-600 mt-1">You'll save ${((currentBill - solarRate) * 12).toFixed(0)} in the first year!</div>
            </div>
          </div>
          
          {/* Chart footnote */}
          <div className="text-center text-sm text-gray-500 mb-2">
            * Chart shows monthly payment comparison over 25 years
          </div>
          
          {/* Chart */}
          <div className="h-[400px]">
            <canvas ref={chartRef} id="savings-chart"></canvas>
          </div>
        </div>
        
        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => setLocation('/')}
            className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Back to Homepage
          </button>
          <button 
            onClick={() => setLocation('/#contact')}
            className="px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
          >
            Schedule My Consultation
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChartPage;