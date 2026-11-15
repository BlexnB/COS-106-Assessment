// Mobile navigation toggle
const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".site-header nav");

menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});