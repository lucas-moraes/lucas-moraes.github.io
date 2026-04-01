const STAR_COUNT = 100;

function createStar() {
  const star = document.createElement("div");
  const size = Math.random() * 3 + 1;
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  star.style.background = "#fff";
  star.style.borderRadius = "50%";
  star.style.position = "absolute";
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.opacity = Math.random() * 0.8 + 0.2;
  star.style.boxShadow = `0 0 ${size * 2}px #fff`;
  star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite ease-in-out`;
  star.style.animationDelay = `${Math.random() * 2}s`;
  return star;
}

function createShootingStar() {
  const star = document.createElement("div");
  const length = Math.random() * 100 + 50;
  star.style.position = "absolute";
  star.style.width = `${length}px`;
  star.style.height = "2px";
  star.style.background = "linear-gradient(to right, transparent, #fff, transparent)";
  star.style.top = `${Math.random() * 50}%`;
  star.style.left = "-100px";
  star.style.animation = `shoot ${Math.random() * 5 + 3}s infinite ease-in-out`;
  star.style.animationDelay = `${Math.random() * 5}s`;
  return star;
}

function createCloud() {
  const cloud = document.createElement("div");
  const width = Math.random() * 150 + 80;
  const top = Math.random() * 40 + 5;
  const duration = Math.random() * 30 + 20;
  
  cloud.style.cssText = `
    position: absolute;
    top: ${top}%;
    left: -200px;
    width: ${width}px;
    height: ${width * 0.4}px;
    background: linear-gradient(to bottom, #fff 0%, #e8e8e8 100%);
    border-radius: ${width * 0.2}px;
    opacity: 0.7;
    filter: blur(8px);
    animation: floatCloud ${duration}s linear infinite;
    animation-delay: ${Math.random() * 20}s;
  `;
  
  const cloudInner = document.createElement("div");
  cloudInner.style.cssText = `
    position: absolute;
    top: -${width * 0.15}px;
    left: ${width * 0.2}px;
    width: ${width * 0.5}px;
    height: ${width * 0.35}px;
    background: #fff;
    border-radius: 50%;
  `;
  
  const cloudInner2 = document.createElement("div");
  cloudInner2.style.cssText = `
    position: absolute;
    top: -${width * 0.2}px;
    left: ${width * 0.4}px;
    width: ${width * 0.4}px;
    height: ${width * 0.3}px;
    background: #fff;
    border-radius: 50%;
  `;
  
  cloud.appendChild(cloudInner);
  cloud.appendChild(cloudInner2);
  
  return cloud;
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.createElement("div");
  container.id = "stars-container";
  document.body.appendChild(container);

  for (let i = 0; i < STAR_COUNT; i++) {
    container.appendChild(createStar());
  }

  for (let i = 0; i < 3; i++) {
    container.appendChild(createShootingStar());
  }

  const skyContainer = document.createElement("div");
  skyContainer.id = "sky-container";
  document.body.appendChild(skyContainer);

  for (let i = 0; i < 5; i++) {
    skyContainer.appendChild(createCloud());
  }
});