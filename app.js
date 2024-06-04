document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const menuIcon = document.getElementById("hamburguerButton");
  const overlay = document.getElementById("overlay");
  const content = document.getElementById("content");

  let isOpen = false; // Initialize isOpen variable

  // Show All Scrollbar after confirming user has javascript enabled and can view site content
  window.addEventListener("load", function () {
    document.body.style.overflowY = "auto";
    setTimeout(animateBoxes, 150);
  });

  // Animate Boxes
  function animateBoxes() {
    const boxes = document.querySelector("#content").children;
    if (!boxes.length) return;

    // Split the children into two groups: the first two elements and the rest
    const [firstTwo, rest] = [Array.from(boxes).slice(0, 2), Array.from(boxes).slice(2)];
    animateTogether(firstTwo, 0);
    setTimeout(() => animateTogether(rest, 0), 300);
    rest[rest.length - 1].addEventListener("animationend", sparkleAppear);
  }

  function animateTogether(elements, delay) {
    elements.forEach((el) => (el.style.animation = `fadeSlideDown 0.4s ease-out forwards ${delay}s`));
  }

  // Sparkle Appear
  function sparkleAppear() {
    document.getElementById("hello").style.backgroundSize = "20%";
  }

  // Add click event listener to menuIcon
  menuIcon.addEventListener("click", function () {
    isOpen = !isOpen; // Toggle isOpen state
    updateOverlayState();
  });

  // Listen for escape key press to close the overlay
  document.addEventListener("keydown", function (event) {
    if (event.code === "Escape" && isOpen) {
      isOpen = false;
      updateOverlayState();
    }
  });

  // Add click event listener to overlay
  overlay.addEventListener("click", function (event) {
    // Check if the clicked element is outside the navigation list
    if (!event.target.closest("#navigationList")) {
      isOpen = false; // Set isOpen to false
      updateOverlayState();
    }
  });

  // Function to update overlay state based on isOpen value
  function updateOverlayState() {
    overlay.setAttribute("aria-hidden", !isOpen); // Update aria-hidden attribute
    menuIcon.setAttribute("aria-expanded", isOpen); // Update aria-expanded attribute

    if (isOpen) {
      overlay.style.display = "flex";
      overlay.querySelector("a").focus(); // Set initial focus to the first link
      document.body.style.overflow = "hidden";
      content.style.pointerEvents = "none";
      content.style.userSelect = "none";
      setTimeout(() => {
        overlay.style.opacity = "1";
        trapFocus(overlay);
      }, 25);
    } else {
      overlay.style.opacity = "0";
      setTimeout(() => {
        overlay.style.display = "none";
        document.body.style.overflow = "auto";
        content.style.pointerEvents = "auto";
        content.style.userSelect = "auto";
        releaseFocus();
      }, 400); // Adjust timing to match transition duration in CSS
    }
  }

  // Focus trap function
  function trapFocus(element) {
    const focusableElements = element.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    function handleTab(event) {
      if (event.key !== "Tab") return;

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }

    element.addEventListener("keydown", handleTab);
    element._removeFocusTrap = () => element.removeEventListener("keydown", handleTab);
  }

  // Release focus trap function
  function releaseFocus() {
    if (overlay._removeFocusTrap) {
      overlay._removeFocusTrap();
      delete overlay._removeFocusTrap;
    }
  }
});
