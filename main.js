const progress = document.getElementById("progress");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const circles = document.querySelectorAll(".circle");
let activeStep = 1;
// main function for check values and add styles
const updateProgress = () => {
  localStorage.setItem("activeStep", activeStep);
  // check the values for turn on/off circles
  circles.forEach((circle, index) => {
    if (index < activeStep) {
      circle.classList.add("active");
    } else {
      circle.classList.remove("active");
    }
  });

  // create new width style and set into progress
  const progressWidth = ((activeStep - 1) / (circles.length - 1)) * 100;
  progress.style.width = progressWidth + "%";

  // disable btns by logics
  if (activeStep === 1) {
    prev.disabled = true;
  } else {
    prev.disabled = false;
  }
  if (activeStep === circles.length) {
    next.disabled = true;
  } else {
    next.disabled = false;
  }
};

// set event into next btn
next.addEventListener("click", () => {
  activeStep++;
  if (activeStep > circles.length) {
    activeStep = circles.length;
  }
  // run update progress function
  updateProgress();
});

// set event into prev btn
prev.addEventListener("click", () => {
  activeStep--;
  if (activeStep < 1) {
    activeStep = 1;
  }
  // run update progress function
  updateProgress();
});
// set click event for circles
circles.forEach((circle, index) => {
  circle.addEventListener("click", () => {
    activeStep = index + 1; // set activeStep based on clicked circle
    updateProgress();
  });
});
// use local storage when user refresh
document.addEventListener("DOMContentLoaded", () => {
  const storedActiveStep = localStorage.getItem("activeStep");
  if (storedActiveStep) {
    activeStep = parseInt(storedActiveStep);
  }
  updateProgress();
});
// dark or light theme design
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  circles.forEach((circle) => {
    circle.classList.toggle("dark-mode");
  });
});
