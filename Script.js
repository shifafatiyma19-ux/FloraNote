/* =====================================================
   POPUP HELPER
===================================================== */
function showMessage(title, text){
  const popup = document.createElement("div");
  popup.className = "custom-popup";
  popup.innerHTML = `
    <div class="popup-box">
      <button class="popup-close" aria-label="Close">&times;</button>
      <div class="popup-icon">♡</div>
      <h3>${title}</h3>
      <p>${text}</p>
    </div>
  `;
  document.body.appendChild(popup);

  function closePopup(){
    popup.classList.add("closing");
    setTimeout(() => popup.remove(), 200);
  }

  popup.querySelector(".popup-close").addEventListener("click", closePopup);
  popup.addEventListener("click", (e) => {
    if (e.target === popup) closePopup();
  });
  document.addEventListener("keydown", function escHandler(e){
    if (e.key === "Escape"){ closePopup(); document.removeEventListener("keydown", escHandler); }
  });
}

/* =====================================================
   BOUQUET BUILDER
===================================================== */
let selectedFlowerEmoji = "🤍";
let selectedWrapColor = "#f2a0c0";
let selectedRibbonColor = "#e85d8a";

function updateBouquetPreview(){
  const art = document.querySelector(".bouquet-art");
  const title = document.querySelector(".bouquet-title");
  if (!art) return;

  art.textContent = "💐" + selectedFlowerEmoji;
  art.style.filter = `drop-shadow(0 6px 10px ${selectedRibbonColor}55)`;

  const preview = document.querySelector(".bouquet-preview");
  if (preview) preview.style.background = `${selectedWrapColor}22`;

  if (title){
    const flowerName = document.querySelector(".options-grid .item.active span");
    title.textContent = flowerName ? `Your ${flowerName.textContent} bouquet` : "Your little bouquet";
  }
}

document.querySelectorAll(".options-grid .item").forEach((item) => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".options-grid .item").forEach(i => i.classList.remove("active"));
    item.classList.add("active");
    selectedFlowerEmoji = item.dataset.emoji || "🌷";
    updateBouquetPreview();
  });
});

document.querySelectorAll(".color-button").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".color-button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedWrapColor = btn.dataset.color || "#f2a0c0";
    updateBouquetPreview();
  });
});

document.querySelectorAll(".ribbon-button").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".ribbon-button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedRibbonColor = btn.dataset.color || "#e85d8a";
    updateBouquetPreview();
  });
});

const createBouquetBtn = document.getElementById("createBouquetBtn");
if (createBouquetBtn){
  createBouquetBtn.addEventListener("click", () => {
    const note = document.querySelector(".bouquet-note");
    const noteText = note && note.value.trim() ? note.value.trim() : "No note added — just the flowers speaking for themselves.";
    showMessage("🌸 Your Bouquet Is Ready", noteText);
  });
}

/* =====================================================
   CHARACTER COUNTERS
===================================================== */
document.querySelectorAll("textarea[maxlength]").forEach((area) => {
  const counter = area.parentElement.querySelector(".counter");
  if (!counter) return;
  const max = area.getAttribute("maxlength");
  area.addEventListener("input", () => {
    counter.textContent = `${area.value.length} / ${max}`;
  });
});

/* =====================================================
   LETTER / ENVELOPE
===================================================== */
const mainEnvelope = document.getElementById("mainEnvelope");
const openLetterBtn = document.getElementById("openLetterBtn");

function toggleEnvelope(){
  if (!mainEnvelope) return;
  mainEnvelope.classList.toggle("opened");
}
if (mainEnvelope) mainEnvelope.addEventListener("click", toggleEnvelope);
if (openLetterBtn) openLetterBtn.addEventListener("click", toggleEnvelope);

let selectedStampEmoji = "♡";

function updateEnvelopeStamp(){
  const stampSpan = document.querySelector(".stamp span");
  const wax = document.querySelector(".wax-seal");
  if (stampSpan) stampSpan.textContent = selectedStampEmoji;
  if (wax) wax.textContent = selectedStampEmoji;
}

document.querySelectorAll(".stamp-option").forEach((opt) => {
  opt.addEventListener("click", () => {
    document.querySelectorAll(".stamp-option").forEach(o => o.classList.remove("active"));
    opt.classList.add("active");
    selectedStampEmoji = opt.dataset.emoji || "♡";
    updateEnvelopeStamp();
  });
});

const sealLetterBtn = document.getElementById("sealLetterBtn");
if (sealLetterBtn){
  sealLetterBtn.addEventListener("click", () => {
    const to = document.getElementById("letterTo").value.trim() || "someone special";
    const from = document.getElementById("letterFrom").value.trim() || "a secret admirer";
    const message = document.querySelector(".letter-message").value.trim();
    const preview = document.querySelector(".letter-preview-text");

    if (preview){
      preview.textContent = message ? message.slice(0, 60) + (message.length > 60 ? "…" : "") : "A little something...";
    }
    if (mainEnvelope) mainEnvelope.classList.remove("opened");

    showMessage("💌 Letter Sealed", `Your letter to ${to} from ${from} is tucked safely inside the envelope.`);
  });
}

/* =====================================================
   GIFT CARD NAVIGATION
===================================================== */
document.querySelectorAll(".secondary-button[data-target]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = document.querySelector(btn.dataset.target);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

/* =====================================================
   PHOTOS (SCRAPBOOK)
===================================================== */
const photos = document.querySelectorAll(".photo");
photos.forEach((photo, index) => {
  photo.addEventListener("click", () => {
    showMessage(`📸 Memory ${index + 1}`, "This is where your special memory photo will appear. ♡");
  });
});

/* =====================================================
   LOVE NOTES
===================================================== */
const loveNotes = document.querySelectorAll(".love-notes button");
const discovered = document.querySelector(".discovered");
let discoveredCount = 0;

const messages = [
  "Your kindness makes ordinary moments special. ♡",
  "You have a way of making people smile. ✦",
  "You make little moments memorable. 🌸",
  "There is something wonderfully unique about you. ♡",
  "You bring your own kind of sparkle. ✧",
  "You deserve beautiful moments and happy memories. 🌷",
  "You are appreciated more than you know. ♡"
];

loveNotes.forEach((note, index) => {
  note.addEventListener("click", () => {
    if (note.dataset.opened === "true") return;
    note.dataset.opened = "true";
    discoveredCount++;
    note.style.background = "var(--pink-soft)";

    if (discovered){
      discovered.textContent = `♡ ${discoveredCount} / 7 little secrets discovered`;
    }
    showMessage(`♡ Little Note ${index + 1}`, messages[index]);
  });
});

/* =====================================================
   FINAL SURPRISE → LETTER
===================================================== */
const finalLetterButton = document.querySelector(".final-surprise .main-button");
if (finalLetterButton){
  finalLetterButton.addEventListener("click", (event) => {
    const letterSection = document.querySelector("#letter");
    if (!letterSection) return;
    event.preventDefault();
    letterSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

/* =====================================================
   NAV ACTIVE LINK ON SCROLL
===================================================== */
const navLinks = document.querySelectorAll(".nav-links a");
const navSections = ["bouquet", "letter", "birthday"].map(id => document.getElementById(id)).filter(Boolean);

function updateActiveNav(){
  let current = "";
  navSections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}
window.addEventListener("scroll", updateActiveNav);

/* =====================================================
   CANDLE FLAME
===================================================== */
const flame = document.querySelector(".flame");
if (flame) flame.classList.remove("off");

/* =====================================================
   INIT
===================================================== */
updateBouquetPreview();
updateEnvelopeStamp();

console.log("♡ For Someone Special website loaded successfully.");
