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
    
    // Function to adjust screen position dynamically based on viewport width
    function adjustScreenPosition() {
      // Only apply JS positioning if CSS media queries aren't handling it properly
      const viewportWidth = window.innerWidth;
      
      // Get the actual dimensions of the computer container
      const containerWidth = computerContainer.offsetWidth;
      const containerHeight = computerContainer.offsetHeight;
      
      // Apply positioning only if the container dimensions look off
      // This is a fallback for edge cases when CSS isn't working properly
      if (containerHeight < 200 || containerWidth < 300) {
        console.log("Applying emergency screen positioning fix");
        
        // Force the container to maintain minimum dimensions
        computerContainer.style.minHeight = '300px';
        computerContainer.style.minWidth = '320px';
        
        // Recalculate based on viewport width
        if (viewportWidth < 400) {
          // Very small screens
          screen.style.top = '17%';
          screen.style.left = '27%';
          screen.style.width = '46%';
          screen.style.height = '30%';
        } else if (viewportWidth < 580) {
          // Small screens
          screen.style.top = '18%';
          screen.style.left = '28%';
          screen.style.width = '44%';
          screen.style.height = '32%';
        } else if (viewportWidth < 1024) {
          // Medium screens
          screen.style.top = '20%';
          screen.style.left = '30.5%';
          screen.style.width = '35%';
          screen.style.height = '34%';
        } else if (viewportWidth < 1400) {
          // Large screens
          screen.style.top = '20%';
          screen.style.left = '32%';
          screen.style.width = '32%';
          screen.style.height = '35%';
        } else {
          // Extra large screens
          screen.style.top = '20%';
          screen.style.left = '32.5%';
          screen.style.width = '31%';
          screen.style.height = '36%';
        }
      }
      
      // Adjust font size based on screen width for better readability
      if (mainContent) {
        if (viewportWidth < 400) {
          mainContent.style.fontSize = '6px';
        } else if (viewportWidth < 580) {
          mainContent.style.fontSize = '7px';
        } else if (viewportWidth < 1024) {
          mainContent.style.fontSize = '8px';
        } else {
          mainContent.style.fontSize = '10px';
        }
      }
    }
    
    // Helper function 
    function isBeingInspected(element) {
      // Check for style attributes that are commonly applied by dev tools
      return element.hasAttribute('data-highlighted-for-devtools') || 
             element.style.outline.includes('devtools') ||
             element.style.backgroundColor !== computerContainer.style.backgroundColor;
    }
    
    // Event Listeners for viewport changes
    window.addEventListener('resize', adjustScreenPosition);
    window.addEventListener('orientationchange', adjustScreenPosition);
    
    // Handle screen size changes 
    const observer = new MutationObserver(function(mutations) {
      let needsAdjustment = false;
      
      mutations.forEach(function(mutation) {
        if (mutation.type === 'attributes' && 
           (mutation.attributeName === 'style' || 
            mutation.attributeName === 'class')) {
          needsAdjustment = true;
        }
      });
      
      if (needsAdjustment || isBeingInspected(computerContainer)) {
        adjustScreenPosition();
      }
    });
    
    // Observe both computer container and screen for changes
    observer.observe(computerContainer, { 
      attributes: true,
      attributeFilter: ['style', 'class']
    });
    
    observer.observe(screen, { 
      attributes: true,
      attributeFilter: ['style', 'class']
    });
    
    // Initial position adjustment with a slight delay to ensure DOM is fully loaded
    setTimeout(adjustScreenPosition, 100);
    
    // Additional fix for when inspect tool is open
    document.addEventListener('mousemove', function(e) {
      // Check if cursor is near the edges of the computer 
      const rect = computerContainer.getBoundingClientRect();
      const edgeThreshold = 20; // pixels from edge
      
      const nearEdge = 
        (Math.abs(e.clientX - rect.left) < edgeThreshold) || 
        (Math.abs(e.clientX - rect.right) < edgeThreshold) ||
        (Math.abs(e.clientY - rect.top) < edgeThreshold) || 
        (Math.abs(e.clientY - rect.bottom) < edgeThreshold);
      
      if (nearEdge) {
        // dev tool fun stuff
        setTimeout(adjustScreenPosition, 100);
      }
    });
  });