/**
 * Notifications functionality
 * Handles the notification bell dropdown toggle
 */

document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("notif-toggle");
    const panel = document.getElementById("notif-panel");

    if (toggleBtn && panel) {
      toggleBtn.addEventListener("click", function (e) {
        panel.classList.toggle("hidden");

        // Send AJAX to mark all as read
        fetch("/mentor/notifications/mark-all-read/", {
          method: "POST",
          headers: {
            "X-CSRFToken": getCookie("csrftoken"),
            "Content-Type": "application/json"
          }
        })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            // Hide badge
            const badge = document.querySelector("#notif-toggle span");
            if (badge) badge.remove();

            // Grey out notifications
            document.querySelectorAll(".unread-note").forEach(btn => {
              btn.classList.add("text-gray-400", "line-through");
              btn.classList.remove("unread-note");
            });
          }
        });
      });

      document.addEventListener("click", function (event) {
        if (!toggleBtn.contains(event.target) && !panel.contains(event.target)) {
          panel.classList.add("hidden");
        }
      });
    }

    function getCookie(name) {
      let cookieValue = null;
      if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          if (cookie.substring(0, name.length + 1) === name + "=") {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
          }
        }
      }
      return cookieValue;
    }
  });

