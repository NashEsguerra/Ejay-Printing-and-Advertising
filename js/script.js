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
    "images/Sinages/Lightbox.jpg",
    "images/Sinages/sinage24.jpg",
    "images/Sinages/Lightbox1.jpg",
    "images/Sinages/Lightbox2.jpg",
    "images/Sinages/sinage25.jpg",
    

  ],
  tarpaulin: [
    "images/Tarpaulin Printing/tarpaulin1.jpg",
    "images/Tarpaulin Printing/tarpaulin2.jpg",
    "images/Tarpaulin Printing/tarpaulin3.jpg",
    "images/Tarpaulin Printing/tarpaulin4.jpg",
    "images/Tarpaulin Printing/tarpaulin5.jpg",
    "images/Tarpaulin Printing/tarpaulin6.jpg",
  ],
  sticker: [
    "images/Sticker Printing/Sticker 1.jpg",
    "images/Sticker Printing/Sticker 2.jpg",
    "images/Sticker Printing/Sticker 3.jpg",
    "images/Sticker Printing/Sticker 4.jpg",
    "images/Sticker Printing/Sticker 5.jpg",
    "images/Sticker Printing/Sticker 6.jpg",
    "images/Sticker Printing/Sticker 7.jpg",
    "images/Sticker Printing/Sticker 8.jpg",
    "images/Sticker Printing/Sticker 9.jpg",
    "images/Sticker Printing/Sticker 10.jpg",
    "images/Sticker Printing/Sticker 11.jpg",
    

  ],
  sintra: [
    "images/Sintra%20Boards/sintraboard0.jpg",
    "images/Sintra%20Boards/sintraboard1.jpg",
    "images/Sintra%20Boards/sintraboard2.jpg",
    "images/Sintra%20Boards/sintraboard3.jpg",
    "images/Sintra%20Boards/sintraboard4.jpg",
    "images/Sintra%20Boards/sintraboard5.jpg",
    "images/Sintra%20Boards/sintraboard6.jpg",
    "images/Sintra%20Boards/sintraboard7.jpg",
    "images/Sintra%20Boards/sintraboard8.jpg",
    "images/Sintra%20Boards/sintraboard9.jpg",
    "images/Sintra%20Boards/sintraboard10.jpg",
    "images/Sintra%20Boards/sintraboard11.jpg",
    "images/Sintra%20Boards/sintraboard12.jpg",
  ],
  tshirt: [
    "images/T-Shirt Printing/T-shirt1.jpg",
    "images/T-Shirt Printing/T-shirt2.jpg",
    "images/T-Shirt Printing/T-shirt3.jpg",
    "images/T-Shirt Printing/T-shirt4.jpg",
    "images/T-Shirt Printing/T-shirt5.jpg",
    "images/T-Shirt Printing/T-shirt6.jpg",
    "images/T-Shirt Printing/T-shirt7.jpg",
    "images/T-Shirt Printing/T-shirt8.jpg",
    "images/T-Shirt Printing/T-shirt9.jpg",
    "images/T-Shirt Printing/T-shirt10.jpg",
    "images/T-Shirt Printing/T-shirt11.jpg",
    "images/T-Shirt Printing/T-shirt12.jpg",
    "images/T-Shirt Printing/T-shirt13.jpg",
    "images/T-Shirt Printing/T-shirt14.jpg",
    "images/T-Shirt Printing/T-shirt15.jpg",
    "images/T-Shirt Printing/T-shirt16.jpg",
    
  ],
  neon: [
    "images/Neon Lights Display/neon1.jpg",
    "images/Neon Lights Display/neon2.jpg",
    "images/Neon Lights Display/neon3.jpg",
    "images/Neon Lights Display/neon4.jpg",
    "images/Neon Lights Display/neon5.jpg",
    "images/Neon Lights Display/neon6.jpg",
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
    "images/Giveaways/giveaways10.jpg",
    "images/Giveaways/giveaways11.jpg",
    "images/Giveaways/giveaways12.jpg",
    "images/Giveaways/giveaways13.jpg",
    "images/Giveaways/giveaways14.jpg",
    "images/Giveaways/giveaways15.jpg",
    "images/Giveaways/giveaways16.jpg",
  ],
};
// Exhibit Booth Fabrication gets its own data shape: each finished project
// is shown as a PAIR of photos — the digital design mockup, then the actual
// built/fabricated booth. Add a project by adding one object below and
// dropping the two matching files into images/Exhibit Booth/.
const boothProjects = [
   {
    title: "SMX MOA Booth",
    mockup: "images/Exhibit Booth/Mock up HFC.jpg",
    final: "images/Exhibit Booth/HFC.jpg",
  },
   {
    title: "SM Aura Premier Booth",
    mockup: "images/Exhibit Booth/Quantas Mock up.jpg",
    final: "images/Exhibit Booth/quantas.jpg",
  },
   {
    title: "World Trade Center Booth",
    mockup: "images/Exhibit Booth/Jetstar mock up.jpg",
    final: "images/Exhibit Booth/booth1.jpg",
  },
  {
    title: "SMX MOA Booth",
    mockup: "images/Exhibit Booth/popok Mock up.jpg",
    final: "images/Exhibit Booth/booth3.jpg",
  },
  {
    title: "SMX MOA Booth",
    mockup: "images/Exhibit Booth/Text mock up.jpg",
    final: "images/Exhibit Booth/booth4.jpg",
  },
  {
    title: "World Trade Center Booth",
    mockup: "images/Exhibit Booth/Natrue Mock up.jpg",
    final: "images/Exhibit Booth/Natrue.jpg",
  },
  {
    title: "SMX MOA Booth",
    mockup: "images/Exhibit Booth/Amadeus Mock up.jpg",
    final: "images/Exhibit Booth/Amadeus.jpg",
  },
];

const PLACEHOLDER_IMG =
  "https://placehold.co/600x450/4B2A8F/FFC400?text=Add+Photo";
const PLACEHOLDER_MOCKUP =
  "https://placehold.co/600x450/EDE7F9/4B2A8F?text=Add+Mockup";
const PLACEHOLDER_FINAL =
  "https://placehold.co/600x450/4B2A8F/FFC400?text=Add+Final+Photo";

const serviceModal = document.getElementById("serviceModal");
if (serviceModal) {
  const modalGallery = document.getElementById("modalGallery");
  const modalTitle = document.getElementById("modalTitle");
  const modalSub = document.getElementById("modalSub");

  const renderBoothGallery = () => {
    modalGallery.innerHTML = boothProjects
      .map((project) => {
        const mockupUrl = project.mockup && project.mockup.trim() ? project.mockup : PLACEHOLDER_MOCKUP;
        const finalUrl = project.final && project.final.trim() ? project.final : PLACEHOLDER_FINAL;
        return `
          <div class="booth-project">
            <p class="booth-project-title">${project.title}</p>
            <div class="booth-pair">
              <figure class="booth-figure">
                <img src="${mockupUrl}" alt="${project.title} — design mockup" loading="lazy" onerror="this.onerror=null;this.src='${PLACEHOLDER_MOCKUP}';">
                <figcaption><i class="bi bi-pencil-square"></i> Design Mockup</figcaption>
              </figure>
              <div class="booth-arrow" aria-hidden="true"><i class="bi bi-arrow-right"></i></div>
              <figure class="booth-figure">
                <img src="${finalUrl}" alt="${project.title} — final fabricated booth" loading="lazy" onerror="this.onerror=null;this.src='${PLACEHOLDER_FINAL}';">
                <figcaption><i class="bi bi-check-circle-fill"></i> Final Output</figcaption>
              </figure>
            </div>
          </div>`;
      })
      .join("");
  };

  const renderGridGallery = (key, title) => {
    const imgs = serviceImages[key] || [];
    modalGallery.innerHTML = imgs
      .map((src) => {
        const url = src && src.trim() ? src : PLACEHOLDER_IMG;
        return `<img src="${url}" alt="${title} sample" loading="lazy" onerror="this.onerror=null;this.src='${PLACEHOLDER_IMG}';">`;
      })
      .join("");
  };

  const openServiceModal = (key, title) => {
    const isBooth = key === "booth";
    modalGallery.classList.toggle("booth-mode", isBooth);

    if (isBooth) {
      renderBoothGallery();
      modalSub.textContent = "Every project shown as a pair — the digital design mockup, then the finished, fabricated booth.";
    } else {
      renderGridGallery(key, title);
      modalSub.textContent = "Sample works";
    }

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
