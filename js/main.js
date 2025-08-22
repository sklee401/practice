const words = [
  "CO",
  "CREATING",
  "INTENTIONALLY",
  "FOR",
  "LONG TERM",
  "CHANGE.",
];
const container = document.getElementById("paraContainer");

const TYPE_SPEED = 25; // fast typing speed

async function typeParagraph() {
  for (let word of words) {
    const wordEl = document.createElement("span");
    wordEl.className = "word";
    container.appendChild(wordEl);

    // Type letters
    for (let i = 0; i < word.length; i++) {
      const span = document.createElement("span");
      span.className = "char";
      span.textContent = word[i];
      wordEl.appendChild(span);

      await wait(TYPE_SPEED);
    }

    // Trigger bounce, but don't wait — so next word starts immediately
    wordEl.classList.add("bounce");
    setTimeout(() => wordEl.classList.remove("bounce"), 500);

    if (word == "INTENTIONALLY") {
      wordEl.classList.add("blue");
    }
    if (word == "LONG TERM") {
      wordEl.classList.add("red");
    }
  }
}

function wait(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

typeParagraph();

const deck = document.getElementById("cardDeck");

function arrangeCards() {
  const cards = deck.querySelectorAll(".cardd");
  const total = cards.length;
  const spread = 30; // spread angle

  cards.forEach((card, i) => {
    const mid = Math.floor(total / 2);
    const offset = i - mid;
    card.style.zIndex = i;
    card.style.transform = `rotate(${offset * 7}deg) translateX(${
      offset * 25
    }px)`;
  });
}

// Initial arrangement
arrangeCards();

// On click → move first card to end, then rearrange
deck.addEventListener("click", () => {
  const first = deck.querySelector(".cardd");
  deck.appendChild(first);

  // delay for smoother transition
  setTimeout(arrangeCards, 50);
});

// Skills

document.addEventListener("DOMContentLoaded", () => {
  const skills = document.querySelectorAll(".skill");

  const animateSkill = (skill) => {
    const circle = skill.querySelector(".circle");
    const text = skill.querySelector(".percentage");
    const target = parseInt(text.textContent.replace("%", ""), 10);

    let progress = 0;
    let count = 0;

    const interval = setInterval(() => {
      if (progress >= target) {
        clearInterval(interval);
      } else {
        progress++;
        count++;
        circle.setAttribute("stroke-dasharray", `${progress}, 100`);
        text.textContent = `${count}%`;
      }
    }, 20); // speed of animation
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSkill(entry.target);
          observer.unobserve(entry.target); // animate only once
        }
      });
    },
    { threshold: 0.5 }
  );

  skills.forEach((skill) => {
    observer.observe(skill);
  });
});

// Accordion toggle
document.querySelectorAll(".accordion-header").forEach((header) => {
  header.addEventListener("click", () => {
    const item = header.parentElement;
    item.classList.toggle("open");

    const span = header.querySelector("span");
    span.textContent = item.classList.contains("open") ? "−" : "+";
  });
});

// succes

const faders = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

faders.forEach((fade) => {
  observer.observe(fade);
});
