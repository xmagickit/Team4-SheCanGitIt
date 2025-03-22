// Affirmation Generator
  const affirmations = {
    discouraged: [
      "You are capable of overcoming any challenge.",
      "Every expert was once a beginner. Keep going!",
      "Your efforts today are building a brighter tomorrow.",
    ],
    motivated: [
      "Your passion for learning is your superpower.",
      "You are making progress every single day.",
      "Your dedication inspires those around you.",
    ],
    confident: [
      "You have the skills to tackle any problem.",
      "Your confidence is your greatest strength.",
      "You are a leader in your field.",
    ],
  };

  document.getElementById("generate-btn").addEventListener("click", () => {
    const mood = document.getElementById("mood").value;
    const careerStage = document.getElementById("career-stage").value;

    const moodAffirmations = affirmations[mood] || [];
    const randomAffirmation =
      moodAffirmations[Math.floor(Math.random() * moodAffirmations.length)];

    const affirmationBox = document.getElementById("affirmation-box");
    affirmationBox.textContent =
      randomAffirmation || "Keep pushing forward, you're doing great!";
    affirmationBox.style.display = "block";
  });