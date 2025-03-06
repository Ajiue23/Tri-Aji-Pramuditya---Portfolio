// Burger menu toggle functionality
const burgerIcon = document.getElementById("burger-icon");
const navbarMenu = document.querySelector(".navbar-menu");
const navbarMenuDropdown = document.querySelector(".navbar-menu-dropdown");
const navbar = document.getElementById("navbar");
const burgerSvg = document.getElementById("burger-svg");
const closeMenuButton = document.getElementById("close-menu"); // Close button for mobile menu
const mobileMenuLinks = navbarMenuDropdown.querySelectorAll("a"); // Links in the mobile menu

// Burger icon click event to toggle mobile menu
burgerIcon.addEventListener("click", () => {
  // Toggle the visibility of the dropdown menu
  navbarMenuDropdown.classList.toggle("hidden");

  // Toggle the 'active' class on the menu
  navbarMenu.classList.toggle("active");

  // Toggle between burger icon and 'X' icon
  if (navbarMenuDropdown.classList.contains("hidden")) {
    // Change to burger icon
    burgerSvg.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>`;
  } else {
    // Change to 'X' icon
    burgerSvg.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>`;
  }
});

// Close mobile menu on clicking close button
if (closeMenuButton) {
  closeMenuButton.addEventListener("click", () => {
    navbarMenuDropdown.classList.add("hidden");
    document.body.style.overflow = ""; // Re-enable scrolling
  });
}

// Close mobile menu when clicking on a link
mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navbarMenuDropdown.classList.add("hidden");
    document.body.style.overflow = ""; // Re-enable scrolling
  });
});

// Change navbar color when it becomes sticky
window.addEventListener("scroll", () => {
  // Sticky background color effect
  if (window.scrollY > 0) {
    navbar.classList.add("navbar-sticky");
  } else {
    navbar.classList.remove("navbar-sticky");
  }

  // Add animation classes on scroll
  animateOnScroll();
});

// Add animation classes on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll(".animate-on-scroll");
  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;

    if (elementPosition < screenPosition) {
      element.classList.add("animate-fade-in");
    }
  });
};

// Initial check for animations
animateOnScroll();

// Project Carousel
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("carousel-track");
  const items = document.querySelectorAll(".carousel-item");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const indicators = document.querySelectorAll(".indicator");

  let currentIndex = 0;
  let itemWidth = items[0].clientWidth;
  let visibleItems = Math.floor(track.clientWidth / itemWidth);
  let maxIndex = items.length - visibleItems;
  let autoScrollInterval;
  let isAutoScrolling = true;

  // Initialize carousel
  function initCarousel() {
    // Calculate visible items based on screen width
    itemWidth = items[0].clientWidth;
    visibleItems = Math.max(1, Math.floor(track.clientWidth / itemWidth));
    maxIndex = Math.max(0, items.length - visibleItems);

    // Set initial position
    goToSlide(currentIndex);
    updateIndicators();

    // Start auto-scrolling
    startAutoScroll();
  }

  // Go to specific slide
  function goToSlide(index) {
    currentIndex = Math.min(Math.max(index, 0), maxIndex);
    const offset = -currentIndex * itemWidth;
    track.style.transform = `translateX(${offset}px)`;
    updateIndicators();
  }

  // Update indicator states
  function updateIndicators() {
    indicators.forEach((indicator, index) => {
      if (index === Math.min(Math.floor(currentIndex / 2), indicators.length - 1)) {
        indicator.classList.add("bg-accent");
        indicator.classList.remove("bg-dark-300");
      } else {
        indicator.classList.remove("bg-accent");
        indicator.classList.add("bg-dark-300");
      }
    });
  }

  // Start auto-scrolling
  function startAutoScroll() {
    if (autoScrollInterval) clearInterval(autoScrollInterval);

    autoScrollInterval = setInterval(() => {
      if (isAutoScrolling) {
        if (currentIndex >= maxIndex) {
          // Smoothly loop back to the beginning
          goToSlide(0);
        } else {
          goToSlide(currentIndex + 1);
        }
      }
    }, 4000); // Change slide every 4 seconds
  }

  // Previous button click handler
  prevBtn.addEventListener("click", () => {
    isAutoScrolling = false; // Temporarily stop auto-scrolling when manually navigating
    goToSlide(currentIndex - 1);

    // Resume auto-scrolling after a delay
    setTimeout(() => {
      isAutoScrolling = true;
    }, 8000);
  });

  // Next button click handler
  nextBtn.addEventListener("click", () => {
    isAutoScrolling = false; // Temporarily stop auto-scrolling when manually navigating
    goToSlide(currentIndex + 1);

    // Resume auto-scrolling after a delay
    setTimeout(() => {
      isAutoScrolling = true;
    }, 8000);
  });

  // Indicator click handlers
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      isAutoScrolling = false; // Temporarily stop auto-scrolling when manually navigating
      goToSlide(index * 2); // Each indicator represents 2 slides

      // Resume auto-scrolling after a delay
      setTimeout(() => {
        isAutoScrolling = true;
      }, 8000);
    });
  });

  // Pause auto-scroll when hovering over carousel
  track.addEventListener("mouseenter", () => {
    isAutoScrolling = false;
  });

  // Resume auto-scroll when mouse leaves carousel
  track.addEventListener("mouseleave", () => {
    isAutoScrolling = true;
  });

  // Handle window resize
  window.addEventListener("resize", () => {
    initCarousel();
  });

  // Initialize the carousel
  initCarousel();
});

// Initialize AOS (Animate on Scroll)
AOS.init();

// Refresh AOS animations when scrolling
window.addEventListener("scroll", () => {
  AOS.refresh();
});

// // Enhanced Infinite Carousel
// document.addEventListener("DOMContentLoaded", function () {
//   const carousel = document.getElementById("infinite-carousel");
//   const pauseBtn = document.getElementById("pause-btn");
//   const pauseText = document.getElementById("pause-text");
//   const speedBtns = document.querySelectorAll(".speed-btn");

//   let isPaused = false;

//   // Function to handle pause/play
//   function togglePause() {
//     if (isPaused) {
//       // Resume animation
//       carousel.style.animationPlayState = "running";
//       pauseText.textContent = "Pause";
//       isPaused = false;
//     } else {
//       // Pause animation
//       carousel.style.animationPlayState = "paused";
//       pauseText.textContent = "Play";
//       isPaused = true;
//     }
//   }

//   // Pause button click handler
//   pauseBtn.addEventListener("click", togglePause);

//   // Speed control buttons
//   speedBtns.forEach((btn) => {
//     btn.addEventListener("click", () => {
//       // Remove active class from all buttons
//       speedBtns.forEach((b) => b.classList.remove("active", "bg-accent", "text-dark-100"));

//       // Add active class to clicked button
//       btn.classList.add("active", "bg-accent", "text-dark-100");

//       // Remove all speed classes
//       carousel.classList.remove("speed-1", "speed-2", "speed-3");

//       // Add the selected speed class
//       const speedClass = btn.id;
//       carousel.classList.add(speedClass);
//     });
//   });

//   // Pause on hover
//   carousel.addEventListener("mouseenter", () => {
//     if (!isPaused) {
//       carousel.style.animationPlayState = "paused";
//     }
//   });

//   // Resume on mouse leave
//   carousel.addEventListener("mouseleave", () => {
//     if (!isPaused) {
//       carousel.style.animationPlayState = "running";
//     }
//   });

//   // Reset animation when it completes to create seamless loop
//   carousel.addEventListener("animationiteration", () => {
//     // This event fires each time the animation completes a cycle
//     console.log("Animation cycle completed");
//   });

//   // Handle window resize
//   window.addEventListener("resize", () => {
//     // Restart animation to adjust for new screen size
//     carousel.style.animation = "none";
//     carousel.offsetHeight; // Trigger reflow
//     carousel.style.animation = null;
//   });
// });
