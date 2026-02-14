const toggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

toggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

const themeToggle = document.getElementById("theme-toggle");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "🌙";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeToggle.textContent = "🌙";
    localStorage.setItem("theme", "dark");
  } else {
    themeToggle.textContent = "☀️";
    localStorage.setItem("theme", "light");
  }
});

document.querySelectorAll(".slider").forEach(slider => {

  const track = slider.querySelector(".slide-track");
  const direction = slider.dataset.direction === "right" ? 1 : -1;

  let position = 0;
  let speed = 0.5 * direction;
  let isDragging = false;
  let startX = 0;

  // Duplicate items for smooth infinite loop
  track.innerHTML += track.innerHTML;

  function animate() {
    if (!isDragging) {
      position += speed;
      track.style.transform = `translateX(${position}px)`;

      const trackWidth = track.scrollWidth / 2;

      if (direction === -1 && Math.abs(position) >= trackWidth) {
        position = 0;
      }

      if (direction === 1 && position >= 0) {
        position = -trackWidth;
      }
    }

    requestAnimationFrame(animate);
  }

  animate();

  // Drag Start
  slider.addEventListener("mousedown", (e) => {
    isDragging = true;
    slider.style.cursor = "grabbing";
    startX = e.pageX;
  });

  // Drag Move
  slider.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const move = e.pageX - startX;
    position += move;
    track.style.transform = `translateX(${position}px)`;
    startX = e.pageX;
  });

  // Drag End
  slider.addEventListener("mouseup", () => {
    isDragging = false;
    slider.style.cursor = "grab";
  });

  slider.addEventListener("mouseleave", () => {
    isDragging = false;
    slider.style.cursor = "grab";
  });

});

