
document.addEventListener("DOMContentLoaded", () => {
  // Cursor-following galaxy sparkles
  let lastSparkleTime = 0;

  document.addEventListener("pointermove", (event) => {
    const now = Date.now();
    if (now - lastSparkleTime < 45) return;

    lastSparkleTime = now;

    const sparkle = document.createElement("span");
    sparkle.className = "sparkle";
    sparkle.style.left = `${event.clientX}px`;
    sparkle.style.top = `${event.clientY}px`;

    document.body.appendChild(sparkle);

    sparkle.addEventListener(
      "animationend",
      () => sparkle.remove(),
      { once: true }
    );
  });

  // Google sign-in demo message
  const googleButton = document.querySelector(".google-button");
  const toast = document.querySelector(".toast");
  let toastTimeout;

  if (googleButton && toast) {
    googleButton.addEventListener("click", () => {
      toast.textContent =
        "Demo only — Google sign-in is not connected.";
      toast.classList.add("show");

      clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
      }, 3000);
    });
  }

  // Star twinkle effect
  document.querySelectorAll(".stars").forEach((star) => {
    star.animate(
      [{ opacity: 0.3 }, { opacity: 0.7 }, { opacity: 0.3 }],
      {
        duration: 5000,
        iterations: Infinity,
        easing: "ease-in-out"
      }
    );
  });

  // Human-agent interaction prototype
  const taskSelect = document.getElementById("agent-task");
  const proposeButton = document.getElementById("propose-plan");
  const agentMessage = document.getElementById("agent-message");
  const agentActions = document.getElementById("agent-actions");
  const approveButton = document.getElementById("approve-plan");
  const rejectButton = document.getElementById("reject-plan");

  if (
    taskSelect &&
    proposeButton &&
    agentMessage &&
    agentActions &&
    approveButton &&
    rejectButton
  ) {
    const proposals = {
      issue: {
        title: "Find an issue to work on",
        explanation:
          "I suggest reviewing open issues, checking their descriptions, and identifying one that needs attention. This can help you choose a useful task.",
        action:
          "Plan approved. In this demo, the next step would be to review available issues."
      },
      research: {
        title: "Research a topic",
        explanation:
          "I suggest defining your research question, gathering relevant sources, and summarizing the key findings for your review.",
        action:
          "Plan approved. In this demo, the next step would be to gather and review sources."
      },
      plan: {
        title: "Break a task into steps",
        explanation:
          "I suggest splitting your task into smaller steps, identifying what is needed, and arranging the steps in a practical order.",
        action:
          "Plan approved. In this demo, the next step would be to display the task checklist."
      }
    };

    let currentProposal = null;

    proposeButton.addEventListener("click", () => {
      currentProposal = proposals[taskSelect.value];

      if (!currentProposal) return;

      agentMessage.textContent =
        `I propose: ${currentProposal.title}. ${currentProposal.explanation} Would you like to approve or reject this plan?`;

      agentActions.hidden = false;
      approveButton.disabled = false;
      rejectButton.disabled = false;
    });

    approveButton.addEventListener("click", () => {
      if (!currentProposal) return;

      agentMessage.textContent = currentProposal.action;
      agentActions.hidden = true;
      currentProposal = null;
    });

    rejectButton.addEventListener("click", () => {
      if (!currentProposal) return;

      agentMessage.textContent =
        "Plan rejected. No action was taken. You can choose another task and ask for a different proposal.";

      agentActions.hidden = true;
      currentProposal = null;
    });
  }
});
