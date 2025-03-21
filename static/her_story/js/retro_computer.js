document.addEventListener('DOMContentLoaded', function() {
    const loadingText = document.getElementById('loading-text');
    const progressFill = document.getElementById('progress-fill');
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    const computerContainer = document.querySelector('.computer-container');
    const screen = document.querySelector('.screen');
  
    // The text that will type out
    const typewriterText = 
  `Initializing Women in Tech OS...
  Paying tribute to the pioneers of computing.
  Loading modules: Sister Mary, Evelyn, Carol, and more...
  Please wait...`;
  
    let charIndex = 0;
    const typeSpeed = 75; // ms per character
  
    function typeWriter() {
      if (charIndex < typewriterText.length) {
        // If we encounter a newline, add a line break
        if (typewriterText.charAt(charIndex) === '\n') {
          loadingText.innerHTML += '<br>';
        } else {
          loadingText.innerHTML += typewriterText.charAt(charIndex);
        }
        charIndex++;
        setTimeout(typeWriter, typeSpeed);
      }
    }
    
    typeWriter();
  
    // Simulated progress bar
    let progress = 0;
    const progressInterval = setInterval(() => {
      // Random increment for "loading" effect
      progress += Math.random() * 2 + 1; 
      if (progress >= 100) {
        progress = 100;
        clearInterval(progressInterval);
        // Small delay before showing main content
        setTimeout(() => {
          loadingScreen.style.display = 'none';
          mainContent.style.display = 'block';
        }, 600);
      }
      progressFill.style.width = progress + '%';
    }, 200); // Update every 200ms
    
    // Function to adjust screen position on resize
    function adjustScreenPosition() {
      // This is a backup to ensure responsiveness works correctly
      // even if CSS positioning has issues
      const containerWidth = computerContainer.offsetWidth;
      const containerHeight = containerContainer.offsetHeight;
      
      // These values might need to be adjusted based on image
      screen.style.width = (containerWidth * 0.32) + 'px';
      screen.style.height = (containerHeight * 0.35) + 'px';
      screen.style.top = (containerHeight * 0.20) + 'px';
      screen.style.left = (containerWidth * 0.31) + 'px';
    }
    
    // Handle resize and orientation change events
    window.addEventListener('resize', adjustScreenPosition);
    window.addEventListener('orientationchange', adjustScreenPosition);
    
    // Fix for inspect tool - detect DOM mutations
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'attributes' && 
           (mutation.attributeName === 'style' || 
            mutation.attributeName === 'class')) {
          adjustScreenPosition();
        }
      });
    });
    
    // Observe the computer container for attribute changes
    observer.observe(computerContainer, { 
      attributes: true,
      attributeFilter: ['style', 'class']
    });
    
    // Initial adjustment
    // Uncomment if you need this additional positioning help
    // setTimeout(adjustScreenPosition, 100);
  });