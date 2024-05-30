document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const boxes = document.querySelectorAll(".box");
  
    
    // Show Body Scrollbar after confirming user has javascript enabled and can view site content
    // And then animate boxes
    window.addEventListener('load', function () {
      document.body.style.overflowY = 'auto';
      setTimeout(animateBoxes, 150);
    });
  
    
    function animateBoxes() {
      // Add a delay for each box
      boxes.forEach((box, index) => {
        box.style.animation = `fadeSlideDown 0.6s ease-out forwards ${index * 0.40}s`;
      });
    }
  });


// Function to update the text content based on screen width
function updateHeadingText() {
  let wordChange = document.getElementById('wordChange');

  if (window.innerWidth >= 900) {
      wordChange.textContent = 'Developer.';
  }
  else {
      wordChange.textContent = 'Dev.';
  }
}

// Call the function on page load and whenever the window is resized
window.addEventListener('load', updateHeadingText);
window.addEventListener('resize', updateHeadingText);