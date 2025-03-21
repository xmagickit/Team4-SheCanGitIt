document.addEventListener('DOMContentLoaded', function() {
    const loadingText = document.getElementById('loading-text');
    const progressFill = document.getElementById('progress-fill');
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
  
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
  });