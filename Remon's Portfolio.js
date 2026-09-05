/* =========================================================
PORTFOLIO JAVASCRIPT
Remon Awad — React Front-End Developer
========================================================= */

/* =========================================================
1. SELECT ELEMENTS
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.querySelector(".theme-icon");

const navItems = document.querySelectorAll(".nav-link");

const sections = document.querySelectorAll("section");

const revealElements = document.querySelectorAll(
    ".section-heading, .about-content, .highlight-card, .service-card, .project-card, .skills-intro, .skill-group, .process-step, .contact-wrapper"
);


/* =========================================================
2. PRELOADER
========================================================= */

const preloader =
    document.getElementById("preloader");

const preloaderProgress =
    document.getElementById("preloaderProgress");

const preloaderProgressDot =
    document.getElementById("preloaderProgressDot");

const preloaderPercentage =
    document.getElementById("preloaderPercentage");

const preloaderText =
    document.getElementById("preloaderText");


/* ---------- Lock Page While Loading ---------- */

if (preloader) {

    document.body.classList.add(
        "preloader-active"
    );

}


/* ---------- Preloader Settings ---------- */

/*
   The preloader always runs for 2 seconds
   on every visit.
*/

const preloaderDuration = 2000;


/* ---------- Update Preloader UI ---------- */

const updatePreloader = (progress) => {

    const roundedProgress =
        Math.round(progress);


    /* ---------- Progress Bar ---------- */

    if (preloaderProgress) {

        preloaderProgress.style.width =
            `${roundedProgress}%`;

    }


    /* ---------- Progress Dot ---------- */

    if (preloaderProgressDot) {

        preloaderProgressDot.style.left =
            `${roundedProgress}%`;

    }


    /* ---------- Percentage ---------- */

    if (preloaderPercentage) {

        preloaderPercentage.textContent =
            `${roundedProgress}%`;

    }

};


/* ---------- Update Main Message ---------- */

const updatePreloaderMessage = (progress) => {

    if (!preloaderText) {

        return;

    }


    /*
       Almost there:
       0% → 71%

       Ready!:
       72% → 100%
    */

    const newMessage =
        progress >= 72
            ? "Ready!"
            : "Almost there";


    /*
       Don't restart the animation
       if the message hasn't changed.
    */

    if (
        preloaderText.textContent ===
        newMessage
    ) {

        return;

    }


    /* ---------- Start Text Transition ---------- */

    preloaderText.classList.add(
        "is-changing"
    );


    setTimeout(
        () => {

            preloaderText.textContent =
                newMessage;


            preloaderText.classList.remove(
                "is-changing"
            );


            preloaderText.classList.add(
                "is-visible"
            );

        },
        180
    );

};


/* ---------- Run Preloader ---------- */

const runPreloader = () => {

    if (!preloader) {

        return;

    }


    const startTime =
        performance.now();


    const animate = (currentTime) => {


        const elapsed =
            currentTime - startTime;


        /*
           Raw progress represents the actual
           percentage of the 2-second duration.
        */

        const rawProgress =
            Math.min(
                elapsed / preloaderDuration,
                1
            );


        /*
           Ease-out animation.

           This makes the progress movement
           feel smoother and more premium.
        */

        const easedProgress =
            1 -
            Math.pow(
                1 - rawProgress,
                2.5
            );


        const progress =
            easedProgress * 100;


        /* ---------- Update UI ---------- */

        updatePreloader(
            progress
        );


        updatePreloaderMessage(
            progress
        );


        /* ---------- Continue Animation ---------- */

        if (rawProgress < 1) {

            requestAnimationFrame(
                animate
            );

            return;

        }


        /* ---------- Ensure Final State ---------- */

        updatePreloader(100);

        updatePreloaderMessage(100);


        /* ---------- Exit Preloader ---------- */

        setTimeout(
            () => {

                preloader.classList.add(
                    "hide"
                );


                document.body.classList.remove(
                    "preloader-active"
                );

            },
            180
        );

    };


    requestAnimationFrame(
        animate
    );

};


runPreloader();


/* =========================================================
3. DARK MODE
========================================================= */

/* ---------- Apply Theme ---------- */

const applyTheme = (theme) => {

    const isDark =
        theme === "dark";


    /* ---------- Apply Theme Class ---------- */

    document.body.classList.toggle(
        "dark-mode",
        isDark
    );


    /* ---------- Change Theme Icon ---------- */

    if (themeIcon) {

        themeIcon.textContent =
            isDark
                ? "☀️"
                : "🌙";

    }


    /* ---------- Update Accessibility ---------- */

    if (themeToggle) {

        const label =
            isDark
                ? "Switch to light mode"
                : "Switch to dark mode";


        themeToggle.setAttribute(
            "aria-label",
            label
        );


        themeToggle.setAttribute(
            "title",
            label
        );

    }

};


/* ---------- Load Saved Theme ---------- */

const savedTheme =
    localStorage.getItem("theme");


/*
   Light Mode is the default theme.

   Dark Mode will only be applied when:

   1. The user previously selected Dark Mode.
*/

if (
    savedTheme === "dark" ||
    savedTheme === "light"
) {

    applyTheme(savedTheme);

} else {

    applyTheme("light");

}


/* ---------- Theme Toggle ---------- */

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {


            const newTheme =
                document.body.classList.contains(
                    "dark-mode"
                )
                    ? "light"
                    : "dark";


            applyTheme(newTheme);


            localStorage.setItem(
                "theme",
                newTheme
            );

        }
    );

}


/* =========================================================
4. MOBILE NAVIGATION
========================================================= */

if (menuToggle && navLinks) {

    menuToggle.addEventListener(
        "click",
        () => {


            const isOpen =
                navLinks.classList.toggle(
                    "active"
                );


            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );


        }
    );

}


/* =========================================================
5. CLOSE MOBILE MENU
WHEN CLICKING A NAVIGATION LINK
========================================================= */

navItems.forEach((link) => {

    link.addEventListener(
        "click",
        () => {


            if (navLinks) {

                navLinks.classList.remove(
                    "active"
                );

            }


            if (menuToggle) {

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }


        }
    );

});


/* =========================================================
6. ACTIVE NAVIGATION LINK
BASED ON CURRENT SECTION
========================================================= */

const updateActiveNav = () => {

    let currentSection = "";


    sections.forEach((section) => {


        const sectionTop =
            section.offsetTop - 150;


        const sectionHeight =
            section.offsetHeight;


        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
                sectionTop + sectionHeight
        ) {


            currentSection =
                section.getAttribute("id");


        }

    });


    navItems.forEach((link) => {


        link.classList.remove(
            "active"
        );


        const targetSection =
            link.getAttribute("href");


        if (
            targetSection ===
            `#${currentSection}`
        ) {


            link.classList.add(
                "active"
            );


        }

    });

};


window.addEventListener(
    "scroll",
    updateActiveNav
);


/* =========================================================
7. SCROLL REVEAL ANIMATION
========================================================= */

const revealObserver =
    new IntersectionObserver(
        (entries) => {


            entries.forEach((entry) => {


                if (
                    entry.isIntersecting
                ) {


                    entry.target.classList.add(
                        "show"
                    );


                    revealObserver.unobserve(
                        entry.target
                    );


                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach((element) => {

    element.classList.add(
        "reveal"
    );


    revealObserver.observe(
        element
    );

});


/* =========================================================
8. ADD REVEAL STYLES DYNAMICALLY
SO WE DON'T NEED EXTRA HTML CLASSES
========================================================= */

const revealStyle =
    document.createElement("style");

revealStyle.textContent = `

    .reveal {
        opacity: 0;
        transform: translateY(35px);

        transition:
            opacity 0.7s ease,
            transform 0.7s ease;
    }

    .reveal.show {
        opacity: 1;
        transform: translateY(0);
    }

`;

document.head.appendChild(
    revealStyle
);


/* =========================================================
9. STAGGER ANIMATION
FOR CARDS
========================================================= */

const cardGroups = [

    ".services-grid .service-card",

    ".projects-grid .project-card",

    ".process-grid .process-step",

    ".about-highlights .highlight-card"

];


cardGroups.forEach(
    (groupSelector) => {


        const cards =
            document.querySelectorAll(
                groupSelector
            );


        cards.forEach(
            (card, index) => {


                card.style.transitionDelay =
                    `${index * 0.08}s`;


            }
        );


    }
);


/* =========================================================
10. SMOOTH SCROLL
FOR INTERNAL LINKS
========================================================= */

const internalLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


internalLinks.forEach((link) => {

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


            const targetElement =
                document.querySelector(
                    targetId
                );


            if (!targetElement) {

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
                targetElement.offsetTop -
                headerHeight;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });


        }
    );

});


/* =========================================================
11. CLOSE MOBILE MENU
WHEN CLICKING OUTSIDE IT
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


        const clickedMenuButton =
            menuToggle.contains(
                event.target
            );


        if (
            !clickedInsideMenu &&
            !clickedMenuButton &&
            navLinks.classList.contains(
                "active"
            )
        ) {


            navLinks.classList.remove(
                "active"
            );


            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );


        }

    }
);


/* =========================================================
12. CLOSE MOBILE MENU
WHEN PRESSING ESC
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {


        if (
            event.key === "Escape"
        ) {


            if (navLinks) {

                navLinks.classList.remove(
                    "active"
                );

            }


            if (menuToggle) {

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }


        }

    }
);


/* =========================================================
13. UPDATE NAVIGATION ON PAGE LOAD
========================================================= */

updateActiveNav();


/* =========================================================
14. PREVENT ANIMATION FLASH
AFTER PAGE LOAD
========================================================= */

window.addEventListener(
    "load",
    () => {


        document.body.classList.add(
            "loaded"
        );


    }
);