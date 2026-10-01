const $ = (s, p=document) => p.querySelector(s);
const $$ = (s, p=document) => [...p.querySelectorAll(s)];

$$("[data-scroll]").forEach(btn => btn.addEventListener("click", async () => {
  $(btn.dataset.scroll)?.scrollIntoView({behavior:"smooth"});
  try {
    await song.play();
    playing = true;
    musicBtn.querySelector("span").textContent = "Pause song";
  } catch {}
}));

const song = $("#song");
const musicBtn = $("#musicBtn");
let playing = false;

musicBtn.addEventListener("click", async () => {
  try {
    if (!song.src) return;
    if (playing) { song.pause(); playing = false; }
    else { await song.play(); playing = true; }
    musicBtn.querySelector("span").textContent = playing ? "Pause song" : "Our song";
  } catch {
    alert('Music could not start. Please check that song.mp3 is in the same folder as index.html.');
  }
});

const modal = $("#modal");
const modalTitle = $("#modalTitle");
const modalText = $("#modalText");

$$(".gift").forEach(g => g.addEventListener("click", () => {
  modalTitle.textContent = g.dataset.title;
  modalText.textContent = g.dataset.text;
  modal.classList.remove("hidden");
  burstHearts(12);
}));
$("#closeModal").onclick = () => modal.classList.add("hidden");
$("#modalDone").onclick = () => modal.classList.add("hidden");
modal.addEventListener("click", e => { if (e.target === modal) modal.classList.add("hidden"); });

$("#finalGift").addEventListener("click", () => {
  $("#finalGift").classList.add("hidden");
  $("#finalReveal").classList.remove("hidden");
  burstHearts(35);
  window.scrollTo({top: document.querySelector(".final").offsetTop, behavior:"smooth"});
});

function burstHearts(n=10) {
  for (let i=0;i<n;i++) {
    const h=document.createElement("div");
    h.className="heart";
    h.textContent=["♥","♡","❤","✦"][Math.floor(Math.random()*4)];
    h.style.left=(10+Math.random()*80)+"vw";
    h.style.setProperty("--drift",(Math.random()*160-80)+"px");
    h.style.animationDuration=(3+Math.random()*3)+"s";
    document.body.appendChild(h);
    setTimeout(()=>h.remove(),6500);
  }
}
setInterval(()=>burstHearts(1), 4200);
