// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Savings calculator functionality
const savingsForm = document.getElementById('savings-calculator');
const savingsResult = document.getElementById('savings-result');
const savingsAmount = document.getElementById('savings-amount');
const monthlySavings = document.getElementById('monthly-savings');

savingsForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get the current bill amount
  const currentBill = parseFloat(document.getElementById('current-bill').value);
  
  // Calculate solar rate (15% less than current bill)
  const solarRate = currentBill * 0.85;
  
  // Calculate 25-year savings
  const totalSavings = calculateSavings(currentBill, solarRate, 25);
  const monthlySaved = (currentBill - solarRate).toFixed(2);
  
  // Display the results
  savingsAmount.textContent = formatCurrency(totalSavings);
  monthlySavings.textContent = formatCurrency(monthlySaved);
  savingsResult.style.display = 'block';
});

// Helper functions for calculations
function calculateSavings(currentBill, solarRate, years) {
  const monthlySavings = currentBill - solarRate;
  const annualSavings = monthlySavings * 12;
  return annualSavings * years;
}

function formatCurrency(amount) {
  return '$' + amount.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
}

// Social sharing
document.querySelectorAll('.share-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    
    const platform = this.getAttribute('data-platform');
    const savings = savingsAmount.textContent;
    const message = `I could save ${savings} over 25 years with solar. What would you do with that much saved? 💸 Contact Sunman Energy → https://sunman.energy/`;
    
    let shareUrl;
    
    switch(platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://sunman.energy/')}&quote=${encodeURIComponent(message)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent('Check out my solar savings!')}&body=${encodeURIComponent(message)}`;
        break;
    }
    
    window.open(shareUrl, '_blank');
  });
});

// Shake animation for Sunman logo to reveal promo code
const logoElements = document.querySelectorAll('.feature-icon');

// Add shake animation on logo hover
if (logoElements.length > 0) {
  logoElements[0].addEventListener('mouseenter', function() {
    this.style.animation = 'shake 0.5s ease-in-out';
    // Show promo code tooltip
    const tooltip = document.createElement('div');
    tooltip.textContent = 'Promo Code: #Summer2025';
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = 'var(--secondary)';
    tooltip.style.color = 'var(--dark)';
    tooltip.style.padding = '5px 10px';
    tooltip.style.borderRadius = '5px';
    tooltip.style.top = '100%';
    tooltip.style.left = '50%';
    tooltip.style.transform = 'translateX(-50%)';
    tooltip.style.zIndex = '100';
    tooltip.style.fontWeight = 'bold';
    tooltip.classList.add('promo-tooltip');
    
    // Append if not already present
    if (!document.querySelector('.promo-tooltip')) {
      this.style.position = 'relative';
      this.appendChild(tooltip);
      
      // Remove after 3 seconds
      setTimeout(() => {
        tooltip.remove();
      }, 3000);
    }
  });
  
  logoElements[0].addEventListener('animationend', function() {
    this.style.animation = '';
  });
}