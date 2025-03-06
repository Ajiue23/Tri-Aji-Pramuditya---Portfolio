// Auto-scrolling carousel functionality
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

  // Stop auto-scrolling
  function stopAutoScroll() {
    clearInterval(autoScrollInterval);
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
