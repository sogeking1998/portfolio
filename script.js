$(document).ready(function () {
  $(window).scroll(function () {
    // sticky navbar on scroll script
    if (this.scrollY > 20) {
      $(".navbar").addClass("sticky");
    } else {
      $(".navbar").removeClass("sticky");
    }

    // scroll-up button show/hide script
    if (this.scrollY > 500) {
      $(".scroll-up-btn").addClass("show");
    } else {
      $(".scroll-up-btn").removeClass("show");
    }
  });

  // slide-up script
  $(".scroll-up-btn").click(function () {
    $("html").animate({ scrollTop: 0 });
    // removing smooth scroll on slide-up button click
    $("html").css("scrollBehavior", "auto");
  });

  $(".navbar .menu li a").click(function () {
    // applying again smooth scroll on menu items click
    $("html").css("scrollBehavior", "smooth");
  });

  // toggle menu/navbar script
$(".menu-btn").click(function () {
    // Only toggle if it's the menu button, not other menu-btn elements
    if ($(this).hasClass('navbar-toggle')) {
        $(".navbar .menu").toggleClass("active");
        $(".menu-btn i").toggleClass("active");
    }
});

  // typing text animation script
  var typed = new Typed(".typing", {
    strings: [
      "Freelancer",
      "Web Developer",
      "GIS Specialist",
      "Graphic Artist",
    ],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true,
  });

  var typed = new Typed(".typing-2", {
    strings: [
      "Freelancer",
      "Web Developer",
      "GIS Specialist",
      "Graphic Artist",
    ],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true,
  });

  // owl carousel script
  $(".carousel").owlCarousel({
    margin: 20,
    loop: true,
    autoplay: true,
    autoplayTimeOut: 2000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
        nav: false,
      },
      600: {
        items: 2,
        nav: false,
      },
      1000: {
        items: 3,
        nav: false,
      },
    },
  });
});

// ---- My Work: category filters + per-project gallery ----
document.addEventListener("DOMContentLoaded", () => {
  const cards = Array.from(document.querySelectorAll(".project-card"));

  // Gallery modal
  const modal = document.getElementById("galleryModal");
  if (!modal) return;

  const mainImg = document.getElementById("galleryMainImage");
  const titleEl = document.getElementById("galleryTitle");
  const captionEl = document.getElementById("galleryCaption");
  const counterEl = document.getElementById("galleryCounter");
  const thumbsEl = document.getElementById("galleryThumbs");
  const closeBtn = modal.querySelector(".gallery-close");
  const prevBtn = modal.querySelector(".gallery-prev");
  const nextBtn = modal.querySelector(".gallery-next");

  let images = [];
  let index = 0;

  function render() {
    const item = images[index];
    if (!item) return;
    mainImg.src = item.src;
    mainImg.alt = item.caption || "";
    captionEl.textContent = item.caption || "";
    counterEl.textContent = `${index + 1} / ${images.length}`;
    thumbsEl.querySelectorAll("img").forEach((t, i) => {
      t.classList.toggle("active", i === index);
    });
  }

  function openGallery(card) {
    try {
      images = JSON.parse(card.dataset.images || "[]");
    } catch (e) {
      images = [];
    }
    if (!images.length) return;

    index = 0;
    titleEl.textContent = card.dataset.title || "";

    // Build thumbnails
    thumbsEl.innerHTML = "";
    images.forEach((item, i) => {
      const thumb = document.createElement("img");
      thumb.src = item.src;
      thumb.alt = item.caption || "";
      thumb.loading = "lazy";
      thumb.addEventListener("click", () => {
        index = i;
        render();
      });
      thumbsEl.appendChild(thumb);
    });

    render();
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeGallery() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function step(dir) {
    index = (index + dir + images.length) % images.length;
    render();
  }

  cards.forEach((card) => {
    card.addEventListener("click", () => openGallery(card));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openGallery(card);
      }
    });
  });

  closeBtn.addEventListener("click", closeGallery);
  prevBtn.addEventListener("click", () => step(-1));
  nextBtn.addEventListener("click", () => step(1));

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeGallery();
  });

  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("open")) return;
    if (e.key === "Escape") closeGallery();
    else if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "ArrowRight") step(1);
  });
});
