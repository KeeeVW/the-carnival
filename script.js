(function () {
  "use strict";
  const config = window.EVENT_CONFIG || {};
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const toast = $(".toast");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const safeUrl = (value) => {
    try { const url = new URL(value); return ["http:", "https:"].includes(url.protocol) ? url.href : ""; }
    catch (_) { return ""; }
  };
  const text = (selector, value) => { const node = $(selector); if (node && value) node.textContent = value; };
  text(".js-tagline", config.tagline);
  const formatDate = (value) => {
    if (!value) return "Date to be announced";
    const date = new Date(`${value}T12:00:00`);
    return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }).format(date);
  };
  const formatTime = (value) => {
    if (!value) return "Time to be announced";
    const [hours, minutes] = value.split(":").map(Number);
    const date = new Date(2000, 0, 1, hours, minutes);
    return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" }).format(date);
  };
  text(".js-date", formatDate(config.eventDate));
  text(".js-time", config.eventStartTime ? `${formatTime(config.eventStartTime)}${config.eventEndTime ? ` — ${formatTime(config.eventEndTime)}` : ""}` : "Time to be announced");
  text(".js-venue", config.venueName || "Venue to be announced");
  text(".js-address", config.venueAddress || "The Carnival grounds");
  text(".js-price", config.ticketPrice || "Details to be announced");
  text(".js-contact", config.contactEmail || "Contact to be announced");
  $("#year").textContent = new Date().getFullYear();

  const bookingUrl = safeUrl(config.ticketFormUrl);
  $$(".js-booking").forEach((button) => {
    if (bookingUrl) {
      button.href = bookingUrl;
      button.addEventListener("click", () => button.blur());
    } else {
      button.removeAttribute("target");
      button.addEventListener("click", (event) => {
        event.preventDefault();
        toast.textContent = "Ticket booking will be available soon. Add the form URL in config.js.";
        toast.classList.add("is-visible");
        window.setTimeout(() => toast.classList.remove("is-visible"), 4200);
      });
    }
  });
  if (bookingUrl) text(".js-booking-note", "You’ll continue to the secure ticket form in a new tab.");

  const mascot = $(".js-mascot");
  const assetExists = (path, callback) => {
    if (!path) return;
    const image = new Image();
    image.onload = () => callback(true);
    image.onerror = () => callback(false);
    image.src = path;
  };
  assetExists(config.mascotImagePath, (exists) => {
    if (exists) $$(".js-mascot").forEach((img) => { img.src = config.mascotImagePath; });
    else $$(".js-mascot").forEach((img) => img.remove());
  });
  assetExists(config.trailerVideoPath, (exists) => {
    const frame = $(".video-frame"); const video = $(".js-trailer");
    if (exists && frame && video) { video.src = config.trailerVideoPath; frame.classList.add("has-video"); }
  });

  const countdown = $(".countdown");
  if (config.enableCountdown && config.eventDate && countdown) {
    const target = new Date(`${config.eventDate}T${config.eventStartTime || "00:00"}:00`);
    const tick = () => {
      const remaining = Math.max(0, target.getTime() - Date.now());
      const values = [Math.floor(remaining / 86400000), Math.floor(remaining / 3600000) % 24, Math.floor(remaining / 60000) % 60, Math.floor(remaining / 1000) % 60];
      ["days", "hours", "minutes", "seconds"].forEach((name, i) => { const node = $(`[data-count="${name}"]`); if (node) node.textContent = String(values[i]).padStart(2, "0"); });
      if (remaining > 0) window.setTimeout(tick, 1000);
    };
    if (!Number.isNaN(target.getTime())) tick();
  } else if (countdown) countdown.closest(".countdown-wrap").style.display = "none";

  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }), { threshold: .12 });
  $$(".reveal").forEach((element) => reducedMotion ? element.classList.add("is-visible") : observer.observe(element));

  if (!reducedMotion && config.enableCustomCursor && window.matchMedia("(pointer:fine)").matches) {
    const cursor = $(".cursor-glow");
    window.addEventListener("pointermove", (event) => { cursor.style.left = `${event.clientX}px`; cursor.style.top = `${event.clientY}px`; }, { passive: true });
  }
  if (config.enableParticles && !reducedMotion) {
    const canvas = $("#particle-canvas"); const ctx = canvas.getContext("2d"); const particles = [];
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize, { passive: true });
    const count = window.innerWidth < 700 ? 35 : 75;
    for (let i = 0; i < count; i++) particles.push({ x: Math.random(), y: Math.random(), r: Math.random() * 1.8 + .3, v: Math.random() * .00035 + .00008, a: Math.random() * .7 + .1 });
    const draw = () => { ctx.clearRect(0, 0, canvas.width, canvas.height); particles.forEach((p) => { p.y -= p.v; if (p.y < 0) p.y = 1; ctx.fillStyle = `rgba(216,163,76,${p.a})`; ctx.beginPath(); ctx.arc(p.x * canvas.width, p.y * canvas.height, p.r, 0, Math.PI * 2); ctx.fill(); }); requestAnimationFrame(draw); };
    draw();
  }
  $(".back-top").addEventListener("click", () => window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" }));
})();
