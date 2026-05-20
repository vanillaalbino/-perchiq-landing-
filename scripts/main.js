const isMobile = window.matchMedia("(max-width: 768px)").matches;

/* ── HEADER ── */

let lastScrollY = window.scrollY;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY < lastScrollY || currentScrollY < 100) {
    header.classList.remove("header--hidden");
  } else {
    header.classList.add("header--hidden");
  }

  lastScrollY = currentScrollY;
});

const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");

burger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// закрывать при клике на ссылку
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

// ── HERO ──

const glove = document.querySelector(".hero__glove");

let factor = isMobile ? 0.1 : 0.3;

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  glove.style.transform = `translateY(${scrollY * factor}px)`;
});

/* ── ABOUT ── */ const swiper = new Swiper(".about__swiper", {
  slidesPerView: "auto",
  spaceBetween: 16,

  slidesOffsetBefore: 32,
  slidesOffsetAfter: 32,

  navigation: {
    nextEl: ".about__btn--next",
    prevEl: ".about__btn--prev",
  },

  pagination: {
    el: ".about__pagination",
    clickable: true,
  },

  breakpoints: {
    0: {
      slidesPerView: 1.2,
      slidesOffsetBefore: 16,
      slidesOffsetAfter: 16,
      navigation: false,
    },
    769: {
      slidesPerView: "auto",
      slidesOffsetBefore: 32,
      slidesOffsetAfter: 32,
    },
  },
});

/* ── CERTIFICATES ── */

function openModal(item) {
  const src = item.querySelector("img").src;
  document.getElementById("modalImg").src = src;
  document.getElementById("certModal").classList.add("active");
}

function closeModal() {
  document.getElementById("certModal").classList.remove("active");
}

/* ── CONTACT ── */

const pepper = document.querySelector(".contact__image");
const contactSection = document.querySelector(".contact");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const sectionTop = contactSection.offsetTop;
  const relative = scrollY - sectionTop;

  glove.style.transform = `translateY(${scrollY * 0.15}px)`;
  pepper.style.transform = `translateY(${relative * 0.3}px)`;
});

/* Form */

const form = document.querySelector(".contact__form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const response = await fetch("send.php", {
    method: "POST",
    body: formData,
  });

  const result = await response.text();

  if (result === "ok") {
    form.innerHTML = `
      <div class="form-success">
        <h3>Заявка отправлена</h3>
        <p>Мы свяжемся с вами в ближайшее время</p>
      </div>
    `;
  } else {
    alert("Ошибка отправки");
  }
});
