
  document.addEventListener('DOMContentLoaded', function() {
    // Get all avatar radio inputs
    const avatarRadios = document.querySelectorAll('input[name="avatar_choice"]');
    
    // Add event listeners to each radio input
    avatarRadios.forEach(radio => {
      radio.addEventListener('change', function() {
        // Remove highlight class from all avatar labels
        const allLabels = document.querySelectorAll('label[for^="avatar_"]');
        allLabels.forEach(label => {
          label.classList.remove('bg-retro-highlight', 'border-2', 'border-retro-purple');
        });
        
        // Add highlight class to the selected label
        if(this.checked) {
          const label = document.querySelector(`label[for="${this.id}"]`);
          label.classList.add('bg-retro-highlight', 'border-2', 'border-retro-purple');
        }
      });
    });
  });
