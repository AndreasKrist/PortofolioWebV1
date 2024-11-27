function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Function to reveal each word in sequence and then reset
function revealText() {
  const words = document.querySelectorAll('.reveal');
  let delay = 500; // Initial delay of 500ms

  // Reveal words with delay
  words.forEach((word, index) => {
      setTimeout(() => {
          word.style.opacity = 1; // Make the word visible
      }, delay);
      delay += 700; // Increase delay for each word
  });

  // Reset the opacity of the words after the animation completes
  setTimeout(() => {
      words.forEach(word => {
          word.style.opacity = 0; // Hide all words again
      });
  }, delay + 1000); // Reset after all words have been shown
}

// Make the animation repeat every 5 seconds (or adjust timing as needed)
setInterval(revealText, 5000);

// Start the animation when the page loads
window.onload = revealText;

let currentSlideIndexMap = {}; // Track current slide for each modal

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = 'flex';
  currentSlideIndexMap[modalId] = 0; // Initialize the slide index for this modal
  showSlide(0, modalId); // Display the first slide
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = 'none';
}

function changeSlide(n, modalId) {
  currentSlideIndexMap[modalId] += n; // Update the slide index
  showSlide(currentSlideIndexMap[modalId], modalId); // Show the slide
}

function showSlide(index, modalId) {
  const modal = document.getElementById(modalId);
  const slides = modal.getElementsByClassName('slide');
  let currentSlideIndex = currentSlideIndexMap[modalId];

  // Wrap around if index goes out of bounds
  if (index >= slides.length) {
    currentSlideIndexMap[modalId] = 0;
  } else if (index < 0) {
    currentSlideIndexMap[modalId] = slides.length - 1;
  }

  // Hide all slides
  for (let slide of slides) {
    slide.style.display = 'none';
  }

  // Show the current slide
  slides[currentSlideIndexMap[modalId]].style.display = 'block';
}

// Close modal if clicking outside of it
window.onclick = function (event) {
  const modals = document.getElementsByClassName('modal');
  for (let modal of modals) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  }
};

//------------------------------------------------------------
//Butterfly
let angle = 0; // Initialize an angle for circular movement

function moveButterfly(butterfly) {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Get the butterfly's dimensions
    const butterflyWidth = butterfly.offsetWidth;
    const butterflyHeight = butterfly.offsetHeight;

    // Define radius for circular movement
    const radius = Math.min(screenWidth, screenHeight) / 2; // Dynamic radius based on screen size

    // Calculate new position using trigonometric functions
    const centerX = screenWidth / 2; // Center of the screen in X
    const centerY = screenHeight / 2; // Center of the screen in Y

    // Calculate new position based on angle
    const newX = centerX + radius * Math.cos(angle) - (butterflyWidth / 2);
    const newY = centerY + radius * Math.sin(angle) - (butterflyHeight / 2);

    // Update butterfly position and rotation
    butterfly.style.transform = `translate(${newX}px, ${newY}px) rotate(${angle}rad)`; // Add rotation

    // Update the angle for the next frame
    angle += 0.01; // Adjust this value to change the speed of the circular motion

    // Move the butterfly again after a fixed interval (16 ms for smooth animation)
    setTimeout(() => moveButterfly(butterfly), 32);
}

window.onload = function() {
    const butterfly = document.getElementById('butterfly');
    moveButterfly(butterfly);
};



