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
    ".services-showcase, " +
    ".projects-bento, " +
   ".skill-card, " +
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

                document.body.classList.add(
                    "hero-ready"
                );

            }, 180);

        }

    }


    requestAnimationFrame(updatePreloader);
}

if (!preloader) {
    document.body.classList.add("hero-ready");
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

   Toggling `.active` on `#navLinks` drives the cinematic
   full-screen panel defined in CSS (glow + staggered links).
   The same toggle is mirrored on the button itself so its
   "</>" icon can cross-fade into an X-shaped close icon (see
   .menu-toggle.active in CSS), and onto <body> so the page
   can't scroll behind the open panel. The aria-label/title
   swap mirrors the same pattern already used for the theme
   toggle, so both icon buttons behave consistently.
   ========================================================= */

if (menuToggle && navLinks) {

    menuToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                navLinks.classList.toggle("active");


            menuToggle.classList.toggle(
                "active",
                isOpen
            );


            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );


            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );


            menuToggle.setAttribute(
                "title",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );


            document.body.classList.toggle(
                "nav-open",
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


    menuToggle.classList.remove("active");


    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );


    menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
    );


    menuToggle.setAttribute(
        "title",
        "Open navigation menu"
    );


    document.body.classList.remove(
        "nav-open"
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
   SCROLL PROGRESS BAR

   Drives the thin blue → purple bar pinned to the top of the
   viewport (drawn by `body::before` in the CSS). This only
   writes a single custom property, `--scroll-progress`, as a
   0 → 1 value on <html>; the CSS turns that into the bar's
   width, so no extra element is needed in the HTML.

   Updates are throttled with requestAnimationFrame so the
   scroll handler stays cheap, and the value is recalculated
   on resize and after load, since both change the page height.
   ========================================================= */

function updateScrollProgress() {

    const scrollableHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;


    const progress =
        scrollableHeight > 0
            ? Math.min(
                Math.max(window.scrollY / scrollableHeight, 0),
                1
            )
            : 0;


    document.documentElement.style.setProperty(
        "--scroll-progress",
        progress.toFixed(4)
    );

}


let scrollProgressTicking = false;


function requestScrollProgressUpdate() {

    if (scrollProgressTicking) {
        return;
    }


    scrollProgressTicking = true;


    requestAnimationFrame(() => {

        updateScrollProgress();

        scrollProgressTicking = false;

    });

}


window.addEventListener(
    "scroll",
    requestScrollProgressUpdate,
    { passive: true }
);

window.addEventListener(
    "resize",
    requestScrollProgressUpdate
);

window.addEventListener(
    "load",
    updateScrollProgress
);


updateScrollProgress();


/* =========================================================
   SIGNATURE NAME — LETTER SPLIT

   Prepares the hero name for the letter-by-letter animation
   defined in the CSS (section 22 of the stylesheet).

   Every letter of each `.title-word` is wrapped in
   <span class="char"> and gets an index `--i` that the CSS
   uses to stagger the rise-in and the gold light wave. The
   first letter of each word also gets `.char-cap`, the
   oversized "swash capital". Finally `.is-split` is added to
   the title so the CSS knows the split happened.

   - The full name is put on the <h1> as an aria-label, and
     the split letters are hidden from screen readers, so the
     name is still read as one normal word.
   - If this function doesn't run, the CSS falls back to the
     original word-by-word reveal, so nothing breaks.
   - It runs right away (before the preloader ends), so the
     letters are ready when the hero animation starts.
   ========================================================= */

function initSignatureName() {

    const title =
        document.querySelector(".hero-title");

    if (!title) {
        return;
    }


    /* Already split (e.g. function called twice) — do nothing. */

    if (title.classList.contains("is-split")) {
        return;
    }


    title.setAttribute(
        "aria-label",
        title.textContent.replace(/\s+/g, " ").trim()
    );


    let letterIndex = 0;


    title.querySelectorAll(".title-word").forEach((word) => {

        const text =
            word.textContent.trim();

        word.textContent = "";

        word.setAttribute("aria-hidden", "true");


        Array.from(text).forEach((letter, position) => {

            const span =
                document.createElement("span");

            span.className =
                "char" + (position === 0 ? " char-cap" : "");

            span.style.setProperty(
                "--i",
                letterIndex++
            );

            span.textContent = letter;

            word.appendChild(span);

        });

    });


    title.classList.add("is-split");

}


initSignatureName();


/* =========================================================
   SCROLL REVEAL

   The `.reveal` / `.reveal.show` rules (including the
   cinematic blur + scale entrance) live entirely in the CSS
   file now — this used to also inject a duplicate copy of
   those rules at runtime, which just risked the two drifting
   out of sync. All JS needs to do is apply the class and
   flip it to `.show` once each element is in view.
   ========================================================= */

revealElements.forEach((element) => {

    element.classList.add("reveal");

});


/* =========================================================
   STAGGER ANIMATION
   ========================================================= */

const staggerGroups = [
     ".timeline-item",
    ".skill-card"
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
   SERVICES SHOWCASE

   Tab + live-preview version of the Services section:
   clicking a `.service-tab` switches which `.service-panel`
   is shown (crossfade handled in CSS via `.is-active`), and
   re-colors `--services-accent` / `--services-accent-soft`
   on the `.services-showcase` wrapper so the active tab's
   border, the preview glow, the giant background numeral and
   the panel's CTA all pick up that service's accent together.
   The big outlined numeral behind the preview
   (`.services-preview-bgnum`) is updated to match the active
   tab's position (01, 02, 03...).

   KEYBOARD ACCESSIBILITY (WAI-ARIA Tabs pattern)

   - Roving tabindex: only the active tab is in the page's Tab
     order (tabindex="0"); the others are tabindex="-1" and are
     reached with the arrow keys. Tab moves focus past the
     whole list instead of stopping on all four tabs.
   - Arrow Up / Down (and Left / Right) move to the previous /
     next tab, wrapping around at the ends. Home / End jump to
     the first / last tab. Focus moves with the selection, so
     the preview panel updates as you arrow through.
   - Inactive panels are marked `inert`, so the hidden
     "Let's create ..." links inside them can't be reached by
     Tab or announced by screen readers while invisible.
   ========================================================= */

function initServicesShowcase(container) {

    if (!container) {
        return;
    }

    const tabs = Array.from(
        container.querySelectorAll(".service-tab")
    );

    const panels = Array.from(
        container.querySelectorAll(".service-panel")
    );

    const bgNum = document.getElementById(
        "servicesPreviewBgNum"
    );

    if (!tabs.length || !panels.length) {
        return;
    }

    const accentMap = {
        primary: {
            accent: "var(--color-primary-bright)",
            soft: "var(--color-primary-soft)"
        },
        purple: {
            accent: "var(--color-purple)",
            soft: "var(--color-purple-soft)"
        },
        accent: {
            accent: "var(--color-accent)",
            soft: "var(--color-accent-soft)"
        },
        success: {
            accent: "var(--color-success)",
            soft: "rgba(52, 211, 153, 0.12)"
        }
    };

    function activateTab(tab, options = {}) {

        const index = tab.dataset.index;

        const accentKey = tab.dataset.accent;

        const accent =
            accentMap[accentKey] || accentMap.primary;


        /* ---------- Tabs ---------- */

        tabs.forEach((t) => {

            const isActive = t === tab;

            t.classList.toggle("is-active", isActive);

            t.setAttribute(
                "aria-selected",
                isActive ? "true" : "false"
            );

            /* Roving tabindex — only the active tab is tabbable. */

            t.setAttribute(
                "tabindex",
                isActive ? "0" : "-1"
            );

        });


        /* ---------- Panels ---------- */

        panels.forEach((panel) => {

            const isActive = panel.dataset.index === index;

            panel.classList.toggle("is-active", isActive);

            /* Hide inactive panels from Tab order + screen readers. */

            panel.toggleAttribute("inert", !isActive);

        });


        /* ---------- Accent Colors ---------- */

        container.style.setProperty(
            "--services-accent",
            accent.accent
        );

        container.style.setProperty(
            "--services-accent-soft",
            accent.soft
        );


        /* ---------- Background Numeral ---------- */

        if (bgNum) {

            bgNum.textContent =
                String(Number(index) + 1).padStart(2, "0");

        }


        /* ---------- Keyboard Focus ---------- */

        if (options.focus) {

            tab.focus();

        }

    }


    tabs.forEach((tab, tabPosition) => {

        tab.addEventListener("click", () => {

            activateTab(tab);

        });


        tab.addEventListener("keydown", (event) => {

            /*
             * Leave browser / OS shortcuts alone
             * (e.g. Alt + Left = browser back).
             */

            if (
                event.altKey ||
                event.ctrlKey ||
                event.metaKey
            ) {
                return;
            }


            let nextPosition = null;

            switch (event.key) {

                case "ArrowDown":
                case "ArrowRight":

                    nextPosition =
                        (tabPosition + 1) % tabs.length;

                    break;

                case "ArrowUp":
                case "ArrowLeft":

                    nextPosition =
                        (tabPosition - 1 + tabs.length) % tabs.length;

                    break;

                case "Home":

                    nextPosition = 0;

                    break;

                case "End":

                    nextPosition = tabs.length - 1;

                    break;

                default:

                    return;

            }


            /* Stop the page from scrolling while navigating tabs. */

            event.preventDefault();

            activateTab(
                tabs[nextPosition],
                { focus: true }
            );

        });

    });


    /* ---------- Initial State ---------- */

    const initiallyActive =
        tabs.find((t) => t.classList.contains("is-active")) ||
        tabs[0];

    activateTab(initiallyActive);

}


initServicesShowcase(
    document.getElementById("servicesShowcase")
);


/* =========================================================
   SERVICES — WHATSAPP CTA

   Every "Let's create a ... like this" button inside a service
   panel used to just jump to #contact. Now each one opens
   WhatsApp on Remon's number with a ready-written message that
   already names the service the visitor was looking at, e.g.
   "... I'm interested in Interactive Digital Menus ...", so the
   visitor only has to press Send.

   - The service name is read from the panel's own <h3>, so
     adding or renaming a service in the HTML needs no JS change.
   - The message language follows the visitor's browser
     language: Arabic browsers get the Arabic message, every
     other browser gets the English one. To force a single
     language, set WHATSAPP_FORCE_LANG to "en" or "ar".
   - The original href="#contact" stays in the HTML as a
     fallback (it is only replaced once this code runs).

   NOTE: this block must stay ABOVE the SMOOTH SCROLL section.
   The smooth-scroll code attaches itself to every link whose
   href starts with "#"; by rewriting these hrefs first, the
   WhatsApp links are left out of it and open normally.
   ========================================================= */

const WHATSAPP_NUMBER = "201226750547";

const WHATSAPP_FORCE_LANG = null;

const WHATSAPP_MESSAGES = {

    en: (service) =>
        `Hi Remon, I saw your portfolio and I'm interested in ${service}. I'd like to discuss my project.`,

    ar: (service) =>
        `أهلاً ريمون، شفت البورتفوليو بتاعك وأنا مهتم بخدمة ${service}. ممكن نتكلم عن مشروعي؟`

};

const WHATSAPP_HINTS = {

    en: "opens WhatsApp in a new tab",

    ar: "يفتح واتساب في تبويب جديد"

};


function initServiceWhatsAppLinks() {

    const ctas = document.querySelectorAll(
        ".service-panel-cta"
    );

    if (!ctas.length) {
        return;
    }


    const browserLang =
        (navigator.language || "en").toLowerCase();

    const lang =
        WHATSAPP_FORCE_LANG ||
        (browserLang.startsWith("ar") ? "ar" : "en");


    ctas.forEach((cta) => {

        const panel =
            cta.closest(".service-panel");

        const titleEl =
            panel ? panel.querySelector("h3") : null;

        const serviceName =
            titleEl ? titleEl.textContent.trim() : "";


        /*
         * No service name found — leave the link alone
         * so it keeps working as the #contact fallback.
         */

        if (!serviceName) {
            return;
        }


        const message =
            WHATSAPP_MESSAGES[lang](serviceName);

        const visibleText =
            cta.textContent.replace(/\s+/g, " ").trim();


        cta.href =
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

        cta.target = "_blank";

        cta.rel = "noopener noreferrer";

        cta.setAttribute(
            "aria-label",
            `${visibleText} (${WHATSAPP_HINTS[lang]})`
        );

    });

}


initServiceWhatsAppLinks();


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
   CONTACT — EMAIL LINKS (GMAIL COMPOSE)

   Every email link on the page (the envelope icon in the hero
   and the Email row in the contact section) opens a message
   that is already written instead of a blank one — the same
   idea as the WhatsApp buttons in the Services section:

   - Desktop: a Gmail compose window opens in a new tab with the
     recipient, subject and message already filled in.
   - Touch devices (phones / tablets): Gmail's web compose page
     is unreliable there, so the link falls back to a normal
     `mailto:` carrying the same subject + message, which opens
     the visitor's own mail app (usually Gmail on Android).
   - The message language follows the browser language: Arabic
     browsers get Arabic, every other browser gets English. To
     force one language, set EMAIL_FORCE_LANG to "en" or "ar".

   The recipient is read from each link's own `mailto:` href, so
   changing the address in the HTML is enough — no JS change.
   The original `mailto:` href stays in the HTML as a fallback
   until this code runs. The small hint on the contact row
   ("Click to copy") is replaced to match the new behaviour.
   ========================================================= */

const EMAIL_FORCE_LANG = null;

const EMAIL_MESSAGES = {

    en: {

        subject: "Project inquiry from your portfolio",

        body:
            "Hi Remon,\n\n" +
            "I saw your portfolio and I'm interested in working with you. " +
            "I'd like to discuss my project.\n\n" +
            "Project type (website / landing page / digital menu / invitation / business card):\n\n" +
            "A few details:\n\n" +
            "Thanks!"

    },

    ar: {

        subject: "استفسار عن مشروع من البورتفوليو",

        body:
            "أهلاً ريمون،\n\n" +
            "شفت البورتفوليو بتاعك وأنا مهتم أشتغل معاك. " +
            "ممكن نتكلم عن مشروعي؟\n\n" +
            "نوع المشروع (موقع / لاندينج بيدج / منيو ديجيتال / دعوة / كارت شخصي):\n\n" +
            "تفاصيل سريعة:\n\n" +
            "شكراً!"

    }

};

const EMAIL_HINTS = {

    en: {
        gmail: "Opens Gmail",
        app: "Opens your mail app"
    },

    ar: {
        gmail: "يفتح Gmail",
        app: "يفتح تطبيق البريد"
    }

};


function initEmailComposeLinks() {

    const emailLinks = document.querySelectorAll(
        'a[href^="mailto:"]'
    );

    if (!emailLinks.length) {
        return;
    }


    const browserLang =
        (navigator.language || "en").toLowerCase();

    const lang =
        EMAIL_FORCE_LANG ||
        (browserLang.startsWith("ar") ? "ar" : "en");

    const message = EMAIL_MESSAGES[lang];

    const hints = EMAIL_HINTS[lang];

    const encodedSubject =
        encodeURIComponent(message.subject);

    const encodedBody =
        encodeURIComponent(message.body);

    const isTouchDevice =
        window.matchMedia &&
        window.matchMedia("(pointer: coarse)").matches;


    emailLinks.forEach((link) => {

        /*
         * Pull the address out of the existing mailto: href
         * (dropping any ?subject=... that might already be there).
         */

        const address =
            link.getAttribute("href")
                .replace(/^mailto:/i, "")
                .split("?")[0]
                .trim();

        if (!address) {
            return;
        }


        let hintText;

        if (isTouchDevice) {

            link.href =
                `mailto:${address}?subject=${encodedSubject}&body=${encodedBody}`;

            hintText = hints.app;

        } else {

            link.href =
                "https://mail.google.com/mail/?view=cm&fs=1" +
                `&to=${encodeURIComponent(address)}` +
                `&su=${encodedSubject}` +
                `&body=${encodedBody}`;

            link.target = "_blank";

            link.rel = "noopener noreferrer";

            hintText = hints.gmail;

        }


        /* ---------- Contact-row hint ("Click to copy") ---------- */

        const hintEl =
            link.querySelector(".contact-link-hint");

        if (hintEl) {

            hintEl.textContent = hintText;

        }


        /* ---------- Accessibility ---------- */

        const baseLabel =
            link.getAttribute("aria-label") ||
            `Email ${address}`;

        link.setAttribute(
            "aria-label",
            `${baseLabel} (${hintText})`
        );

    });

}


initEmailComposeLinks();


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

    }
);