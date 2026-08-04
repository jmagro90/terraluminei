
const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 30);
});

menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");

document.querySelectorAll(".gallery-item").forEach(item => {
  item.addEventListener("click", () => {
    lightboxImage.src = item.dataset.image;
    lightboxImage.alt = item.dataset.alt;
    lightbox.showModal();
  });
});

document.querySelector("[data-close-lightbox]").addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", event => {
  if (event.target === lightbox) lightbox.close();
});

const pixModal = document.getElementById("pix-modal");
document.querySelectorAll("[data-open-pix]").forEach(button => {
  button.addEventListener("click", () => pixModal.showModal());
});
document.querySelector("[data-close-pix]").addEventListener("click", () => pixModal.close());
pixModal.addEventListener("click", event => {
  if (event.target === pixModal) pixModal.close();
});

const pixKey = "11959969677";
const toast = document.getElementById("toast");

async function copyPix() {
  try {
    await navigator.clipboard.writeText(pixKey);
  } catch {
    const input = document.createElement("input");
    input.value = pixKey;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    input.remove();
  }

  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
}

document.querySelectorAll("[data-copy-pix]").forEach(button => {
  button.addEventListener("click", copyPix);
});

document.getElementById("year").textContent = new Date().getFullYear();
