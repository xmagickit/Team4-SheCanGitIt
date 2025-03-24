/**
 * Navbar Mobile Toggle Functionality
 */

// Execute immediately
(function() {
    initMobileMenu();
  })();
  
  // Also execute when DOM is loaded
  document.addEventListener("DOMContentLoaded", function() {
    initMobileMenu();
  });
  
  function initMobileMenu() {
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    
    if (menuToggle && mobileMenu) {
      // Remove existing listeners
      const newMenuToggle = menuToggle.cloneNode(true);
      menuToggle.parentNode.replaceChild(newMenuToggle, menuToggle);
      
      // Add fresh listener
      newMenuToggle.addEventListener("click", function(e) {
        e.preventDefault();
        console.log("Menu toggle clicked");
        mobileMenu.classList.toggle("hidden");
      });
    }
  }