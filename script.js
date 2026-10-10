// script.js
// Fake data for your orders
const data = {
  classic: [
    {
      name: "Long hair",
      description: "Soft, healthy, long hair that grows fast.",
      contents: "Super long hair! , easy styling, any desired length.",
      price: "Price: free",
      affirmations: [
        "My hair grows quickly and beautifully.",
        "I love how my hair looks.",
      ],
    },
    {
      name: "Pretty bareface",
      description: "Who said makeup baddies can't go bareface too! Order this for a beautiful bareface that would make anyone go \"oh wow!\".",
      contents: "Clear skin, even tone, natural glow, pink lips.",
      price: "Price: free",
      affirmations: [
        "My skin is clear and radiant.",
        "I feel confident barefaced.",
      ],
    },
  ],

  complex: [
    {
      name: "Height change",
      description: "Shift to your desired height.",
      contents: "Aligned self-image, confidence in your body.",
      price: "Price: free",
      affirmations: [
        "I feel perfectly aligned in my body.",
        "My height matches my ideal self.",
      ],
    },
  ],

  custom: [
    {
      name: "Custom manifestation",
      description: "Write your own order in detail.",
      contents: "Photos, notes, specific desires, all in one place.",
      price: "Price: free",
      affirmations: [
        "I am the creator of my reality.",
        "Everything I desire is already mine.",
      ],
    },
  ],
};

// Affirmations text for TTS
const affirmationsText = `
I am aligned with everything I desire.
My manifestations flow to me easily.
I am magnetic. I am powerful. I am chosen.
`;

// TTS loop
function playAffirmationsTTS(times = 10) {
  let count = 0;

  function speakNext() {
    if (count < times) {
      const utterance = new SpeechSynthesisUtterance(affirmationsText);

      // Whispery female vibe
      utterance.pitch = 1.4;
      utterance.rate = 0.85;
      utterance.volume = 0.6;

      utterance.onend = () => {
        count++;
        speakNext();
      };

      speechSynthesis.speak(utterance);
    }
  }

  speakNext();
}

// ENTER BUTTON — show main site
document.getElementById("enterBtn").addEventListener("click", () => {
  document.getElementById("welcome-screen").classList.add("hidden");
  document.getElementById("main-site").classList.remove("hidden");
});

// Sparkles
function createFloatingSparkle() {
  const sparkle = document.createElement("img");
  sparkle.src = "images/sparkles/tumblr_3f04a478cf7d4a1bf94deb490eb97d70_d045f57f_400.webp";
  sparkle.classList.add("sparkle");

  sparkle.style.left = Math.random() * window.innerWidth + "px";
  sparkle.style.top = Math.random() * window.innerHeight + "px";

  document.body.appendChild(sparkle);

  setTimeout(() => sparkle.remove(), 6000);
}

setInterval(createFloatingSparkle, 800);

document.addEventListener("mousemove", (e) => {
  const sparkle = document.createElement("img");
  sparkle.src = "images/sparkles/tumblr_3f04a478cf7d4a1bf94deb490eb97d70_d045f57f_400.webp";
  sparkle.classList.add("trail-sparkle");

  sparkle.style.left = e.pageX + "px";
  sparkle.style.top = e.pageY + "px";

  document.body.appendChild(sparkle);

  setTimeout(() => sparkle.remove(), 800);
});

document.addEventListener("click", (e) => {
  const sparkle = document.createElement("img");
  sparkle.src = "images/sparkles/tumblr_3f04a478cf7d4a1bf94deb490eb97d70_d045f57f_400.webp";
  sparkle.classList.add("trail-sparkle");

  sparkle.style.left = e.pageX + "px";
  sparkle.style.top = e.pageY + "px";

  document.body.appendChild(sparkle);

  setTimeout(() => sparkle.remove(), 800);
});

// DOM elements
const welcomeScreen = document.getElementById("welcome-screen");
const mainSite = document.getElementById("main-site");
const enterBtn = document.getElementById("enterBtn");

const bgMusic = document.getElementById("bg-music");
const clickSound = document.getElementById("click-sound");

const itemsList = document.getElementById("items-list");
const detailBox = document.getElementById("detail-box");
const detailTitle = document.getElementById("detail-title");
const detailContents = document.getElementById("detail-contents");
const detailPrice = document.getElementById("detail-price");
const detailAffirmations = document.getElementById("detail-affirmations");
const orderBtn = document.getElementById("order-btn");

// Enter website
enterBtn.addEventListener("click", () => {
  welcomeScreen.classList.add("hidden");
  mainSite.classList.remove("hidden");

  bgMusic.volume = 1.0;
  bgMusic.play();

  playClickSound();
});

// Click sound
function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.play();
}

// Order type buttons
document.querySelectorAll(".order-type-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const type = btn.dataset.type;
    playClickSound();
    renderItems(type);
    detailBox.classList.add("hidden");
  });
});

// Render items
function renderItems(type) {
  itemsList.innerHTML = "";
  const items = data[type];

  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "item-card";

    const title = document.createElement("h4");
    title.textContent = item.name;

    const hoverText = document.createElement("p");
    hoverText.textContent = item.description;
    hoverText.style.opacity = "0.7";

    card.appendChild(title);
    card.appendChild(hoverText);

    card.addEventListener("click", () => {
      playClickSound();
      showDetail(item);
    });

    itemsList.appendChild(card);
  });
}

// Show detail box
function showDetail(item) {
  detailTitle.textContent = item.name;
  detailContents.textContent = item.contents;
  detailPrice.textContent = item.price;

  detailAffirmations.innerHTML = "";
  item.affirmations.forEach((aff) => {
    const li = document.createElement("li");
    li.textContent = aff;
    detailAffirmations.appendChild(li);
  });

  // If custom order, show custom fields
  if (item.name === "Custom manifestation") {
    document.getElementById("custom-fields").classList.remove("hidden");
  } else {
    document.getElementById("custom-fields").classList.add("hidden");
  }

  detailBox.classList.remove("hidden");
}

const customImageInput = document.getElementById("custom-image");
const customPreview = document.getElementById("custom-preview");

customImageInput.addEventListener("change", () => {
  const file = customImageInput.files[0];
  if (file) {
    customPreview.src = URL.createObjectURL(file);
    customPreview.classList.remove("hidden");
  }
});

// Order button
orderBtn.addEventListener("click", () => {
  playClickSound();

  if (detailTitle.textContent === "Custom manifestation") {
    const text = document.getElementById("custom-text").value;
    const img = customImageInput.files[0];

    if (!text && !img) {
      alert("Please write your desire or upload an image ✨");
      return;
    }

    alert("Your custom manifestation has been placed ✨");
    playAffirmationsTTS(10);
    return;
  }

  alert("Order placed in the manifestation universe ✨");
  playAffirmationsTTS(10);
});
