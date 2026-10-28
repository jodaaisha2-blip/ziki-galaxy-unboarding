document.addEventListener("DOMContentLoaded", () => {
  // Cursor-following galaxy sparkles
  let lastSparkleTime = 0;

  document.addEventListener("pointermove", (event) => {
    const now = Date.now();

    // Prevent too many sparkles from appearing at once
    if (now - lastSparkleTime < 45) return;
    lastSparkleTime = now;

    const sparkle = document.createElement("span");
    sparkle.className = "sparkle";

    sparkle.style.left = `${event.clientX}px`;
    sparkle.style.top = `${event.clientY}px`;

    document.body.appendChild(sparkle);

    // Remove each sparkle after its animation finishes
    sparkle.addEventListener("animationend", () => {
      sparkle.remove();
    }, { once: true });
  });

  // Demo feedback for the Google sign-in button
  const googleButton = document.querySelector(".google-button");
  const toast = document.querySelector(".toast");
  let toastTimeout;

  if (googleButton && toast) {
    googleButton.addEventListener("click", () => {
      toast.textContent =
        "Demo preview only — Google sign-in isn't connected yet.";

      toast.classList.add("show");

      clearTimeout(toastTimeout);

      toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
      }, 3000);
    });
  }

  // Gentle star twinkle effect
  const stars = document.querySelector(".stars");

  if (stars) {
    stars.animate(
      [
        { opacity: 0.35 },
        { opacity: 0.65 },
        { opacity: 0.35 }
      ],
      {
        duration: 5000,
        iterations: Infinity,
        easing: "ease-in-out"
      }
    );
  }
});
