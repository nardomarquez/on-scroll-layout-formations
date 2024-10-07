import "./style.css";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { imageLoaded } from "./lib/utils";

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

const backgroundImageReel = () => {
  const images = [
    "reels/1.jpg",
    "reels/2.jpg",
    "reels/3.jpg",
    "reels/4.jpg",
    "reels/5.jpg",
    "reels/6.jpg",
    "reels/7.jpg",
    "reels/8.jpg",
  ];

  let currentIndex = 0;
  const section = document.getElementById("hero")!;

  // Function to switch to the next background image
  function showNextBackground() {
    section.style.backgroundImage = `url(${images[currentIndex]})`;
    currentIndex = (currentIndex + 1) % images.length;
  }

  // Initial background set
  showNextBackground();

  // Set the interval for 0.25 seconds (250 milliseconds)
  setInterval(showNextBackground, 150);
};

const animateHero = () => {
  gsap.to("#hero", {
    ease: "none",
    scrollTrigger: {
      trigger: "#about",
      start: "top bottom",
      end: "top top",
      scrub: true,
    },
    yPercent: 100,
  });
};

const animateGalleryGrid = () => {
  const section = document.querySelector(".gallery")!;
  const gridColumnsOdd = document.querySelectorAll(
    ".gallery__grid__column:nth-child(odd)"
  );
  const gridColumnsEven = document.querySelectorAll(
    ".gallery__grid__column:nth-child(even)"
  );

  gsap
    .timeline({
      defaults: {
        ease: "sine",
      },
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        scrub: 0.5,
      },
    })
    .to(gridColumnsEven, {
      y: 10,
    })
    .to(
      gridColumnsOdd,
      {
        y: -10,
      },
      "<"
    );
};

const animateContactGallery = () => {
  const section = document.querySelector(".contact")!;
  const galleryImages = document.querySelectorAll(".contact__gallery__img");

  gsap
    .timeline({
      defaults: { ease: "power2.out" },
      scrollTrigger: {
        trigger: section,
        start: "top 25%",
        toggleActions: "play reverse play reverse",
      },
    })
    .from(galleryImages, {
      stagger: 0.1,
      y: 400,
      rotation: () => gsap.utils.random(-15, 15),
      opacity: 0,
      duration: 0.4,
    });
};

window.addEventListener("load", () => {
  const image = [
    // reels
    "reels/1.jpg",
    "reels/2.jpg",
    "reels/3.jpg",
    "reels/4.jpg",
    "reels/5.jpg",
    "reels/6.jpg",
    "reels/7.jpg",
    "reels/8.jpg",
    // images
    "images/1.jpg",
    "images/2.jpg",
    "images/3.jpg",
    "images/4.jpg",
    "images/5.jpg",
    "images/6.jpg",
    "images/7.jpg",
    "images/8.jpg",
    "images/9.jpg",
    "images/10.jpg",
    "images/11.jpg",
    "images/12.jpg",
    "images/13.jpg",
    "images/14.jpg",
    "images/15.jpg",
    "images/16.jpg",
    "images/17.jpg",
    "images/18.jpg",
    "images/19.jpg",
    "images/20.jpg",
    "images/21.jpg",
    "images/22.jpg",
    "images/23.jpg",
    "images/24.jpg",
    "images/25.jpg",
    "images/26.jpg",
    "images/27.jpg",
    "images/28.jpg",
    "images/29.jpg",
    "images/30.jpg",
    "images/31.jpg",
    "images/32.jpg",
    "images/33.jpg",
    "images/34.jpg",
    "images/35.jpg",
    "images/36.jpg",
    "images/37.jpg",
    "images/38.jpg",
    "images/39.jpg",
    "images/40.jpg",
  ];

  const promises = image.map((url) => imageLoaded(url));
  Promise.all(promises).then(() => {
    console.log("All images loaded");

    backgroundImageReel();
    animateHero();
    animateGalleryGrid();
    animateContactGallery();
  });
});
