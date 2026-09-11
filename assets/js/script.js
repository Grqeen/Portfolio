'use strict';

/**
 * Dylan AIT-ELDJOUDI - Portfolio Script
 */

// Helper to add event listeners
const addEventOnElements = function (elements, eventType, callback) {
  if (!elements) return;
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

/**
 * PRELOADER
 */
const preloader = document.querySelector("[data-preloader]");

window.addEventListener("DOMContentLoaded", function () {
  if (preloader) {
    preloader.classList.add("loaded");
  }
  document.body.classList.add("loaded");
});

/**
 * NAVBAR TOGGLE (MOBILE)
 */
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");
const navLinks = document.querySelectorAll(".navbar-link");

const toggleNavbar = function () {
  if (navbar) navbar.classList.toggle("active");
  if (navToggleBtn) navToggleBtn.classList.toggle("active");
  if (overlay) overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
};

const closeNavbar = function () {
  if (navbar) navbar.classList.remove("active");
  if (navToggleBtn) navToggleBtn.classList.remove("active");
  if (overlay) overlay.classList.remove("active");
  document.body.classList.remove("nav-active");
};

addEventOnElements(navTogglers, "click", toggleNavbar);
addEventOnElements(navLinks, "click", closeNavbar);

/**
 * HEADER ACTIVE ON SCROLL & SCROLLSPY
 */
const header = document.querySelector("[data-header]");
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", function () {
  // Sticky header background
  if (header) {
    if (window.scrollY >= 60) {
      header.classList.add("active");
    } else {
      header.classList.remove("active");
    }
  }

  // Active navigation link based on scroll position
  const scrollY = window.pageYOffset;
  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 150;
    const sectionId = current.getAttribute("id");
    const targetNavLink = document.querySelector(`.navbar-link[href*="${sectionId}"]`);

    if (targetNavLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        targetNavLink.classList.add("active");
      } else {
        targetNavLink.classList.remove("active");
      }
    }
  });
});

/**
 * PROJECT FILTERING
 */
const filterButtons = document.querySelectorAll("[data-filter-btn]");
const projectCards = document.querySelectorAll("[data-project-card]");

if (filterButtons.length > 0 && projectCards.length > 0) {
  filterButtons.forEach(btn => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach(b => b.classList.remove("active"));
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter-btn");

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute("data-category") || "";
        const categories = cardCategory.toLowerCase().split(" ");

        if (filterValue === "all" || categories.includes(filterValue.toLowerCase())) {
          card.style.display = "flex";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(20px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 250);
        }
      });
    });
  });
}