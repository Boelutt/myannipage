// Animate the container sliding in
gsap.from(".container", {
  y: -100,
  opacity: 0,
  duration: 1.5,
  ease: "power2.out"
});

// Pulse the heart text forever
gsap.to(".heart-text", {
  scale: 1.2,
  repeat: -1,
  yoyo: true,
  duration: 0.8,
  ease: "power1.inOut"
});

// Bounce photos on load
gsap.from(".photo", {
  scale: 0,
  duration: 1.5,
  ease: "bounce.out",
  stagger: 0.3
});
