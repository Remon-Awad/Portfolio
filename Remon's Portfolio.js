/* =========================================================
   REMON AWAD — PORTFOLIO JAVASCRIPT
   ========================================================= */


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.querySelector(".theme-icon");

const navItems = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");

const revealElements = document.querySelectorAll(
    ".section-heading, " +
    ".about-content, " +
    ".timeline-item, " +
    ".education-card, " +
    ".services-accordion, " +
    ".projects-bento, " +
    ".skills-intro, " +
    ".skill-group, " +
    ".contact-wrapper"
);


/* =========================================================
   PRELOADER
   ========================================================= */

const preloader = document.getElementById("preloader");
const preloaderProgress = document.getElementById("preloaderProgress");
const preloaderProgressDot = document.getElementById("preloaderProgressDot");
const preloaderPercentage = document.getElementById("preloaderPercentage");
const preloaderText = document.getElementById("preloaderText");

const preloaderDuration = 2000;


/* =========================================================
   PRELOADER — INITIAL STATE
   ========================================================= */

if (preloader) {

    document.body.classList.add("preloader-active");

    let startTime = null;


    /* ---------------------------------------------------------
       PRELOADER UPDATE
       --------------------------------------------------------- */

    function updatePreloader(timestamp) {

        if (!startTime) {
            startTime = timestamp;
        }

        const elapsed = timestamp - startTime;

        const progress = Math.min(
            elapsed / preloaderDuration,
            1
        );


        /* -----------------------------------------------------
           Easing
           ----------------------------------------------------- */

        const easedProgress =
            1 - Math.pow(1 - progress, 3);


        const percentage = Math.round(
            easedProgress * 100
        );


        /* -----------------------------------------------------
           Progress Bar
           ----------------------------------------------------- */

        if (preloaderProgress) {

            preloaderProgress.style.width =
                `${percentage}%`;

        }


        /* -----------------------------------------------------
           Progress Dot
           ----------------------------------------------------- */

        if (preloaderProgressDot) {

            preloaderProgressDot.style.left =
                `${percentage}%`;

        }


        /* -----------------------------------------------------
           Percentage
           ----------------------------------------------------- */

        if (preloaderPercentage) {

            preloaderPercentage.textContent =
                `${percentage}%`;

        }


        /* -----------------------------------------------------
           Loading Message
           ----------------------------------------------------- */

        if (preloaderText) {

            if (percentage >= 72) {

                preloaderText.textContent = "Ready!";

            } else {

                preloaderText.textContent = "Almost there";

            }

        }


        /* -----------------------------------------------------
           Finish
           ----------------------------------------------------- */

        if (progress < 1) {

            requestAnimationFrame(updatePreloader);

        } else {

            if (preloaderProgress) {

                preloaderProgress.style.width = "100%";

            }

            if (preloaderProgressDot) {

                preloaderProgressDot.style.left = "100%";

            }

            if (preloaderPercentage) {

                preloaderPercentage.textContent = "100%";

            }

            if (preloaderText) {

                preloaderText.textContent = "Ready!";

            }


            /*
             * Small delay before fade-out.
             * Keeps the "Ready!" state visible briefly.
             */

            setTimeout(() => {

                preloader.classList.add("hide");

                document.body.classList.remove(
                    "preloader-active"
                );

            }, 180);

        }

    }


    requestAnimationFrame(updatePreloader);
}


/* =========================================================
   THEME SYSTEM
   ========================================================= */

function applyTheme(theme) {

    const isDark = theme === "dark";


    /* ---------------------------------------------------------
       Apply Theme
       --------------------------------------------------------- */

    document.body.classList.toggle(
        "dark-mode",
        isDark
    );


    /* ---------------------------------------------------------
       Theme Icon
       --------------------------------------------------------- */

    if (themeIcon) {

        themeIcon.textContent =
            isDark ? "☀️" : "🌙";

    }


    /* ---------------------------------------------------------
       Accessibility
       --------------------------------------------------------- */

    if (themeToggle) {

        themeToggle.setAttribute(
            "aria-label",
            isDark
                ? "Switch to light mode"
                : "Switch to dark mode"
        );

        themeToggle.setAttribute(
            "title",
            isDark
                ? "Switch to light mode"
                : "Switch to dark mode"
        );

    }

}


/* =========================================================
   LOAD SAVED THEME
   ========================================================= */

const savedTheme =
    localStorage.getItem("theme");


if (
    savedTheme === "light" ||
    savedTheme === "dark"
) {

    /*
     * Use the user's previously selected theme.
     */

    applyTheme(savedTheme);

} else {

    /*
     * Dark is the default theme.
     *
     * The portfolio is designed as a dark-first
     * experience, while Light Mode uses the softer
     * off-white palette defined in CSS.
     */

    applyTheme("dark");

}


/* =========================================================
   THEME TOGGLE
   ========================================================= */

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            const isDark =
                document.body.classList.contains(
                    "dark-mode"
                );


            const newTheme =
                isDark ? "light" : "dark";


            applyTheme(newTheme);


            localStorage.setItem(
                "theme",
                newTheme
            );

        }
    );

}


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

if (menuToggle && navLinks) {

    menuToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                navLinks.classList.toggle("active");


            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

        }
    );

}


/* =========================================================
   CLOSE MOBILE NAV
   ========================================================= */

function closeMobileMenu() {

    if (!menuToggle || !navLinks) {
        return;
    }


    navLinks.classList.remove("active");


    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

}


/* =========================================================
   CLOSE MENU AFTER NAVIGATION
   ========================================================= */

navItems.forEach((item) => {

    item.addEventListener(
        "click",
        () => {

            closeMobileMenu();

        }
    );

});


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

function updateActiveNav() {

    if (
        !sections.length ||
        !navItems.length
    ) {
        return;
    }


    const scrollPosition =
        window.scrollY + 180;


    let currentSection =
        sections[0]?.id || "";


    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop;


        const sectionHeight =
            section.offsetHeight;


        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            currentSection =
                section.id;

        }

    });


    navItems.forEach((item) => {

        const href =
            item.getAttribute("href");


        item.classList.toggle(
            "active",
            href === `#${currentSection}`
        );

    });

}


/* =========================================================
   ACTIVE NAV — SCROLL
   ========================================================= */

window.addEventListener(
    "scroll",
    updateActiveNav,
    { passive: true }
);


/* =========================================================
   SCROLL REVEAL STYLES
   ========================================================= */

const revealStyle =
    document.createElement("style");


revealStyle.id =
    "portfolio-reveal-styles";


revealStyle.textContent = `

    .reveal {
        opacity: 0;
        transform: translateY(35px);

        transition:
            opacity 0.7s ease,
            transform 0.7s ease;

        transition-delay:
            var(--reveal-delay, 0s);
    }

    .reveal.show {
        opacity: 1;
        transform: translateY(0);
    }

    @media (prefers-reduced-motion: reduce) {

        .reveal {
            opacity: 1;
            transform: none;
            transition: none;
        }

    }

`;


document.head.appendChild(
    revealStyle
);


/* =========================================================
   APPLY REVEAL CLASS
   ========================================================= */

revealElements.forEach((element) => {

    element.classList.add("reveal");

});


/* =========================================================
   STAGGER ANIMATION
   ========================================================= */

const staggerGroups = [
    ".timeline-item",
    ".skill-group"
];


staggerGroups.forEach((selector) => {

    const elements =
        document.querySelectorAll(selector);


    elements.forEach((element, index) => {

        element.style.setProperty(
            "--reveal-delay",
            `${index * 0.08}s`
        );

    });

});


/* =========================================================
   INTERSECTION OBSERVER
   ========================================================= */

if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "show"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });

} else {

    /*
     * Fallback for browsers without
     * IntersectionObserver support.
     */

    revealElements.forEach((element) => {

        element.classList.add("show");

    });

}


/* =========================================================
   SERVICES ACCORDION

   Single-open vertical accordion. Only one `.service-row`
   panel is expanded at a time — opening a row collapses
   whatever else was open. Height is animated by setting an
   explicit `max-height` (from the panel's own scrollHeight)
   rather than a fixed value, since each row's content differs.
   ========================================================= */

function initAccordion(container) {

    if (!container) {
        return null;
    }

    const rows = Array.from(
        container.querySelectorAll(".service-row")
    );

    if (!rows.length) {
        return null;
    }

    function openRow(row) {

        const header = row.querySelector(".service-row-header");
        const panel = row.querySelector(".service-row-panel");

        if (!panel) {
            return;
        }

        row.classList.add("is-open");

        if (header) {
            header.setAttribute("aria-expanded", "true");
        }

        panel.style.maxHeight = `${panel.scrollHeight}px`;

    }

    function closeRow(row) {

        const header = row.querySelector(".service-row-header");
        const panel = row.querySelector(".service-row-panel");

        if (!panel) {
            return;
        }

        row.classList.remove("is-open");

        if (header) {
            header.setAttribute("aria-expanded", "false");
        }

        /*
         * Set an explicit pixel height first (even if it's the
         * same as scrollHeight) so the browser has a starting
         * point to transition *from* — animating straight from
         * "auto"/unset to 0 would skip the transition entirely.
         */

        panel.style.maxHeight = `${panel.scrollHeight}px`;

        requestAnimationFrame(() => {
            panel.style.maxHeight = "0px";
        });

    }

    function setActive(targetRow) {

        rows.forEach((row) => {

            if (row === targetRow) {
                openRow(row);
            } else if (row.classList.contains("is-open")) {
                closeRow(row);
            }

        });

    }

    rows.forEach((row) => {

        const header = row.querySelector(".service-row-header");

        if (!header) {
            return;
        }

        header.addEventListener("click", () => {

            if (row.classList.contains("is-open")) {
                closeRow(row);
            } else {
                setActive(row);
            }

        });

    });


    /* ---------- Initial State ---------- */

    const initiallyOpen =
        rows.find((row) => row.classList.contains("is-open")) || rows[0];

    setActive(initiallyOpen);


    /* ---------- Resize ----------
       Re-measure the open panel's height on resize, since
       wrapped text or a resized thumbnail changes scrollHeight. */

    let resizeTimer = null;

    window.addEventListener("resize", () => {

        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(() => {

            const openRowEl = rows.find((row) =>
                row.classList.contains("is-open")
            );

            if (openRowEl) {

                const panel = openRowEl.querySelector(".service-row-panel");

                if (panel) {
                    panel.style.maxHeight = `${panel.scrollHeight}px`;
                }

            }

        }, 120);

    });

    return {
        refresh: () => {

            const openRowEl = rows.find((row) =>
                row.classList.contains("is-open")
            );

            if (openRowEl) {

                const panel = openRowEl.querySelector(".service-row-panel");

                if (panel) {
                    panel.style.maxHeight = `${panel.scrollHeight}px`;
                }

            }

        }
    };

}


const servicesAccordionApi = initAccordion(
    document.getElementById("servicesAccordion")
);


/* =========================================================
   PROJECTS — BENTO GRID TAP-TO-REVEAL

   The project overlay (title, description, tech, links) is
   shown on :hover in CSS, which does nothing useful on
   touch devices. On any device without real hover support,
   a tap toggles the same `.is-active` class the CSS already
   listens for — the first tap reveals the overlay so its
   links become reachable, a second tap (or a tap elsewhere)
   hides it again. Devices with real hover are left alone.
   ========================================================= */

function initProjectCards(cards) {

    if (!cards.length) {
        return;
    }

    const hasHover =
        window.matchMedia &&
        window.matchMedia("(hover: hover)").matches;

    if (hasHover) {
        return;
    }

    cards.forEach((card) => {

        card.addEventListener("click", (event) => {

            const isLink = event.target.closest("a");

            if (card.classList.contains("is-active")) {

                if (!isLink) {
                    event.preventDefault();
                }

                if (isLink) {
                    return;
                }

            } else {

                event.preventDefault();

                cards.forEach((other) => {
                    if (other !== card) {
                        other.classList.remove("is-active");
                    }
                });

                card.classList.add("is-active");

            }

        });

    });

    document.addEventListener("click", (event) => {

        if (!event.target.closest(".project-card")) {

            cards.forEach((card) => {
                card.classList.remove("is-active");
            });

        }

    });

}


initProjectCards(
    Array.from(document.querySelectorAll(".projects-bento .project-card"))
);


/* =========================================================
   CONTACT — CURSOR SPOTLIGHT

   A single, deliberate hover effect for the closing section:
   while the pointer is inside the card, --mx/--my track its
   position (as percentages) and a radial glow in CSS follows
   it. Skipped entirely on touch devices, since there's no
   hover to track, and it fades out on pointer leave instead
   of snapping away.
   ========================================================= */

function initContactSpotlight(card) {

    if (!card) {
        return;
    }

    const hasHover =
        window.matchMedia &&
        window.matchMedia("(hover: hover)").matches;

    if (!hasHover) {
        return;
    }

    card.addEventListener("pointermove", (event) => {

        const rect = card.getBoundingClientRect();

        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        card.style.setProperty("--mx", `${x}%`);
        card.style.setProperty("--my", `${y}%`);

    });

    card.addEventListener("pointerenter", () => {
        card.classList.add("is-active");
    });

    card.addEventListener("pointerleave", () => {
        card.classList.remove("is-active");
    });

}


initContactSpotlight(
    document.getElementById("contactWrapper")
);


/* =========================================================
   CONTACT — COPY EMAIL ON CLICK

   The Email row still works as a plain `mailto:` link, but a
   left-click also copies the address to the clipboard and
   swaps the row into a brief "Copied!" state (icon, label,
   and value colour all confirm it) instead of only relying
   on the mail app opening — useful for anyone who'd rather
   paste the address somewhere themselves. The state clears
   itself after a couple of seconds; it never loops on its own.
   ========================================================= */

function initEmailCopy(row) {

    if (!row || !navigator.clipboard) {
        return;
    }

    const email = row.dataset.copy;
    const valueEl = row.querySelector(".contact-link-value");
    const titleEl = row.querySelector(".contact-link-title");

    if (!email || !valueEl || !titleEl) {
        return;
    }

    const originalTitle = titleEl.textContent;
    const originalValue = valueEl.textContent;

    let resetTimer = null;

    row.addEventListener("click", (event) => {

        event.preventDefault();

        navigator.clipboard.writeText(email).then(() => {

            row.classList.add("is-copied");
            titleEl.textContent = "Copied!";
            valueEl.textContent = "Address is on your clipboard";

            clearTimeout(resetTimer);

            resetTimer = setTimeout(() => {

                row.classList.remove("is-copied");
                titleEl.textContent = originalTitle;
                valueEl.textContent = originalValue;

            }, 2200);

        }).catch(() => {

            /*
             * Clipboard write failed (permissions, insecure
             * context, etc.) — fall back to the mailto link
             * the browser would have followed anyway.
             */

            window.location.href = row.getAttribute("href");

        });

    });

}


initEmailCopy(
    document.querySelector('.contact-link-row[data-type="email"]')
);


/* =========================================================
   SMOOTH SCROLL
   ========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach((link) => {

    link.addEventListener(
        "click",
        (event) => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(
                    targetId
                );


            if (!target) {
                return;
            }


            event.preventDefault();


            const header =
                document.querySelector(
                    ".header"
                );


            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });


            closeMobileMenu();

        }
    );

});


/* =========================================================
   CLICK OUTSIDE MOBILE MENU
   ========================================================= */

document.addEventListener(
    "click",
    (event) => {

        if (
            !navLinks ||
            !menuToggle
        ) {
            return;
        }


        const clickedInsideMenu =
            navLinks.contains(
                event.target
            );


        const clickedToggle =
            menuToggle.contains(
                event.target
            );


        if (
            navLinks.classList.contains(
                "active"
            ) &&
            !clickedInsideMenu &&
            !clickedToggle
        ) {

            closeMobileMenu();

        }

    }
);


/* =========================================================
   ESCAPE KEY
   ========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {

            closeMobileMenu();

        }

    }
);


/* =========================================================
   INITIAL ACTIVE NAV
   ========================================================= */

updateActiveNav();


/* =========================================================
   PAGE LOADED
   ========================================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "loaded"
        );

        if (servicesAccordionApi) {
            servicesAccordionApi.refresh();
        }

    }
);