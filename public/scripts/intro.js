document.addEventListener("DOMContentLoaded", (event) => {
  // Smooth scroll setup (Lenis)
  const lenis = new Lenis();
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Register GSAP plugins
  gsap.registerPlugin(ScrambleTextPlugin, ScrollTrigger, SplitText, TextPlugin, ScrollToPlugin);

  // ── Intro animation ──
  let introTl = gsap.timeline();
  let introSplit = new SplitText(".intro h1", { type: "lines, words, chars" });

  introTl.from(introSplit.words, {
    duration: 1,
    y: 100,
    autoAlpha: 0,
    stagger: 0.05,
  });
  introTl.from(".intro p", { duration: 1, y: 50, autoAlpha: 0 }, ">");

  // ── Description section ──
  let descTl = gsap.timeline({
    scrollTrigger: { trigger: ".desc", start: "top top", end: "bottom middle" }
  });
  descTl.from(".desc-content", { duration: 1, opacity: 0, x: 50 });
  descTl.from("video", { duration: 1, opacity: 0, x: -50 }, "<");

  // ── Showcase scroll animation (cards) ──
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".showcase",
      pin: true,
      pinSpacing: true,
      start: "10% 10%",
      end: "+=2000",
      scrub: 1,
    }
  });

  // Card 1
  tl.addLabel("card1");
  tl.to(".card1", { yPercent: 0, opacity: 1 });

  // Card 2
  tl.from(".card2", { yPercent: 75, opacity: 0 });
  tl.addLabel("card2");
  tl.add(() => setActiveNav(tl.scrollTrigger.direction > 0 ? 1 : 0), "-=0.15");
  tl.to(".card1", { scale: 0.925, yPercent: -0.75, opacity: 1 }, "-=0.3");
  tl.to(".card2", { yPercent: 0, opacity: 1 });

  // Card 3
  tl.from(".card3", { yPercent: 75, opacity: 0 });
  tl.addLabel("card3");
  tl.add(() => setActiveNav(tl.scrollTrigger.direction > 0 ? 2 : 1), "-=0.15");
  tl.to(".card2", { scale: 0.95, yPercent: -0.5, opacity: 1 }, "-=0.3");
  tl.to(".card3", { yPercent: 0, opacity: 1 });

  // Card 4
  tl.from(".card4", { yPercent: 75, opacity: 0 });
  tl.addLabel("card4");
  tl.add(() => setActiveNav(tl.scrollTrigger.direction > 0 ? 3 : 2), "-=0.15");
  tl.to(".card3", { scale: 0.98, yPercent: -0.4, opacity: 1 }, "-=0.3");
  tl.to(".card4", { yPercent: 0, opacity: 1 });

  // Card 5
  tl.from(".card5", { yPercent: 75, opacity: 0 });
  tl.addLabel("card5");
  tl.add(() => setActiveNav(tl.scrollTrigger.direction > 0 ? 3 : 2), "-=0.15");
  tl.to(".card4", { scale: 0.98, yPercent: -0.4, opacity: 1 }, "-=0.3");
  tl.to(".card5", { yPercent: 0, opacity: 1 });

  // Slight scale-down for previous cards
  tl.to(".card1", { scale: 0.925, yPercent: -1.5, opacity: 0.9 }, "-=0.3");
  tl.to(".card2", { scale: 0.95, yPercent: -1.125, opacity: 0.9 }, "-=0.3");
  tl.to(".card3", { scale: 0.98, yPercent: -0.85, opacity: 0.9 }, "-=0.3");
  tl.to(".card4", { scale: 0.98, yPercent: -0.85, opacity: 0.9 }, "-=0.3");

  // ── Promo section text animation ──
  let promoSplit = new SplitText(".promo h1", { type: "words" });
  let promoTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".promo",
      start: "top 60%",
      end: "bottom top",
      toggleActions: "play none none reverse",
    }
  });

  promoTl.from(promoSplit.words, {
    duration: 1,
    y: 100,
    opacity: 0,
    stagger: 0.03,
    ease: "power3.out",
    onComplete: () => startFloat(promoSplit.words)
  });

  // Floating word animation
  function startFloat(words) {
    gsap.to(words, { y: "+=10", repeat: -1, yoyo: true, ease: "sine.inOut", duration: 2 });
  }

  // ── Footer fade-in on scroll ──
  gsap.registerPlugin(ScrollTrigger);
  gsap.set("footer", { yPercent: 50, opacity: 0 });
  gsap.to("footer", {
    yPercent: 0,
    opacity: 1,
    ease: "power2.out",
    scrollTrigger: { trigger: ".promo", start: "bottom 90%", end: "bottom 40%", scrub: true }
  });
});
