// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", open);
});
navLinks.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  })
);

// Navbar shadow on scroll
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 10);
});

// Scroll-reveal animations
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// Portfolio filter
const filters = document.querySelectorAll(".filter");
const galleryItems = document.querySelectorAll(".gallery-item");
filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    filters.forEach((f) => f.classList.remove("active"));
    btn.classList.add("active");
    const cat = btn.dataset.filter;
    galleryItems.forEach((item) => {
      const show = cat === "all" || item.dataset.cat === cat;
      item.classList.toggle("hide", !show);
    });
  });
});

// Animated counters
const counters = document.querySelectorAll(".stat strong[data-count]");
const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.count;
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 60));
      const tick = () => {
        current += step;
        if (current >= target) {
          el.textContent = target.toLocaleString();
        } else {
          el.textContent = current.toLocaleString();
          requestAnimationFrame(tick);
        }
      };
      tick();
      countObserver.unobserve(el);
    });
  },
  { threshold: 0.5 }
);
counters.forEach((el) => countObserver.observe(el));

// Quote form submission (Formspree)
const quoteForm = document.getElementById("quoteForm");
const formNote = document.getElementById("formNote");
if (quoteForm) {
  const submitBtn = quoteForm.querySelector('button[type="submit"]');
  const showNote = (msg, isError) => {
    formNote.textContent = msg;
    formNote.classList.toggle("error", !!isError);
    formNote.hidden = false;
    setTimeout(() => (formNote.hidden = true), 6000);
  };

  quoteForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Fallback while Formspree is not yet configured
    if (quoteForm.action.includes("YOUR_FORMSPREE_ID")) {
      showNote("✅ Thanks! We'll get back to you within 24 hours.");
      quoteForm.reset();
      return;
    }

    const original = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    try {
      const res = await fetch(quoteForm.action, {
        method: "POST",
        body: new FormData(quoteForm),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        showNote("✅ Thanks! We'll get back to you within 24 hours.");
        quoteForm.reset();
      } else {
        throw new Error("Request failed");
      }
    } catch (err) {
      showNote(
        "⚠️ Sorry, something went wrong. Please try again or message us on Facebook.",
        true
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = original;
    }
  });
}

// ===== Service gallery modal =====
// Each service has 6 image slots. Put your photos in the images/ folder and
// edit the filenames/directories below. Empty or missing images automatically
// show an "Add Photo" placeholder, so you can fill them in anytime.
const serviceImages = {
  signage: [
    "images/Sinages/sinage1.jpg",
    "images/Sinages/sinage2.jpg",
    "images/Sinages/sinage3.jpg",
    "images/Sinages/sinage4.jpg",
    "images/Sinages/sinage5.jpg",
    "images/Sinages/sinage6.jpg",
    "images/Sinages/sinage7.jpg",
    "images/Sinages/sinage8.jpg",
    "images/Sinages/sinage10.jpg",
    "images/Sinages/sinage11.jpg",
    "images/Sinages/sinage12.jpg",
    "images/Sinages/sinage13.jpg",
    "images/Sinages/sinage14.jpg",
    "images/Sinages/sinage15.jpg",
    "images/Sinages/sinage16.jpg",
    "images/Sinages/sinage17.jpg",
    "images/Sinages/sinage18.jpg",
    "images/Sinages/sinage19.jpg",
    "images/Sinages/sinage20.jpg",
    "images/Sinages/sinage21.jpg",
    "images/Sinages/sinage22.jpg",
    "images/Sinages/sinage23.jpg",

  ],
  tarpaulin: [
    "images/Tarpaulin Printing/tarpaulin1.jpg",
    "images/Tarpaulin Printing/tarpaulin2.jpg",
    "images/Tarpaulin Printing/tarpaulin3.jpg",
  ],
  sticker: [
    "images/Sticker Printing/Sticker 1.jpg",
    "images/Sticker Printing/Sticker 2.jpg",
    "images/Sticker Printing/Sticker 3.jpg",
    "images/Sticker Printing/Sticker 4.jpg",
    "images/Sticker Printing/Sticker 5.jpg",
    "images/Sticker Printing/Sticker 6.jpg",
    "images/Sticker Printing/Sticker 7.jpg",
  ],
  sintra: [
    "images/Sintra%20Boards/sintraboard0.jpg",
    "images/Sintra%20Boards/sintraboard1.jpg",
    "images/Sintra%20Boards/sintraboard2.jpg",
    "images/Sintra%20Boards/sintraboard3.jpg",
    "images/Sintra%20Boards/sintraboard4.jpg",
    "images/Sintra%20Boards/sintraboard5.jpg",
  ],
  tshirt: [
    "images/T-Shirt Printing/T-shirt1.jpg",
    "images/T-Shirt Printing/T-shirt2.jpg",
    "images/T-Shirt Printing/T-shirt3.jpg",
    "images/T-Shirt Printing/T-shirt4.jpg",
  ],
  neon: [
    "images/Neon Lights Display/neon1.jpg",
    "images/Neon Lights Display/neon2.jpg",
    "images/Neon Lights Display/neon3.jpg",
    "images/Neon Lights Display/neon4.jpg",
    "images/Neon Lights Display/neon5.jpg",
    "images/Neon Lights Display/neon6.jpg",
  ],
  booth: [
    "images/Exhibit Booth/booth1.jpg",
    "images/Exhibit Booth/booth2.jpg",
    "images/Exhibit Booth/booth3.jpg",
    "images/Exhibit Booth/booth1.jpg",
    "images/Exhibit Booth/booth1.jpg",
  ],
  
  giveaways: [
    "images/Giveaways/giveaways1.jpg",
    "images/Giveaways/giveaways2.jpg",
    "images/Giveaways/giveaways3.jpg",
    "images/Giveaways/giveaways4.jpg",
    "images/Giveaways/giveaways5.jpg",
    "images/Giveaways/giveaways6.jpg",
    "images/Giveaways/giveaways7.jpg",
    "images/Giveaways/giveaways8.jpg",
    "images/Giveaways/giveaways9.jpg",
  ],
};
const PLACEHOLDER_IMG =
  "https://placehold.co/600x450/4B2A8F/FFC400?text=Add+Photo";

const serviceModal = document.getElementById("serviceModal");
if (serviceModal) {
  const modalGallery = document.getElementById("modalGallery");
  const modalTitle = document.getElementById("modalTitle");
  const openServiceModal = (key, title) => {
    const imgs = serviceImages[key] || [];
    modalGallery.innerHTML = imgs
      .map((src) => {
        const url = src && src.trim() ? src : PLACEHOLDER_IMG;
        return `<img src="${url}" alt="${title} sample" loading="lazy" onerror="this.onerror=null;this.src='${PLACEHOLDER_IMG}';">`;
      })
      .join("");
    modalTitle.textContent = title;
    serviceModal.classList.add("open");
    serviceModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };
  const closeServiceModal = () => {
    serviceModal.classList.remove("open");
    serviceModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };
  document.querySelectorAll(".card[data-service]").forEach((card) => {
    const trigger = () =>
      openServiceModal(card.dataset.service, card.querySelector("h3").textContent);
    card.addEventListener("click", trigger);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        trigger();
      }
    });
  });
  serviceModal.querySelectorAll("[data-close]").forEach((el) =>
    el.addEventListener("click", closeServiceModal)
  );

  // Lightbox: click a thumbnail to view it at full size + next/prev
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxPrev = document.querySelector(".lightbox-prev");
  const lightboxNext = document.querySelector(".lightbox-next");

  const getModalImages = () => Array.from(modalGallery.querySelectorAll("img"));
  const getImgSrc = (img) => img.currentSrc || img.src;

  let lightboxIndex = -1;
  const openLightboxByIndex = (idx) => {
    const imgs = getModalImages();
    if (!imgs.length) return;
    const safeIdx = (idx + imgs.length) % imgs.length;
    lightboxIndex = safeIdx;
    const img = imgs[safeIdx];
    lightboxImg.src = getImgSrc(img);
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  };

  const closeLightbox = () => {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
    lightboxIndex = -1;
  };

  modalGallery.addEventListener("click", (e) => {
    const img = e.target.closest("img");
    if (!img) return;
    const imgs = getModalImages();
    const idx = imgs.indexOf(img);
    if (idx === -1) return;
    openLightboxByIndex(idx);
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target !== lightboxImg) closeLightbox();
  });

  if (lightboxPrev) {
    lightboxPrev.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!lightbox.classList.contains("open")) return;
      openLightboxByIndex(lightboxIndex - 1);
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!lightbox.classList.contains("open")) return;
      openLightboxByIndex(lightboxIndex + 1);
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (lightbox.classList.contains("open")) closeLightbox();
      else closeServiceModal();
      return;
    }

    if (!lightbox.classList.contains("open")) return;
    if (e.key === "ArrowLeft") openLightboxByIndex(lightboxIndex - 1);
    if (e.key === "ArrowRight") openLightboxByIndex(lightboxIndex + 1);
  });

}
