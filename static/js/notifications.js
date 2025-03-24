/**
 * Notifications functionality
 * Handles the notification bell dropdown toggle
 */

document.addEventListener("DOMContentLoaded", function() {
    const toggleBtn = document.getElementById("notif-toggle");
    
    if (toggleBtn) {
      toggleBtn.addEventListener("click", function(e) {
        const panel = document.getElementById("notif-panel");
        if (panel) {
          panel.classList.toggle("hidden");
          
          // Close when clicking outside
          document.addEventListener("click", function(event) {
            if (!toggleBtn.contains(event.target) && !panel.contains(event.target)) {
              panel.classList.add("hidden");
            }
          });
        }
      });
    }
  });

