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
   LANGUAGE SYSTEM — English <-> Egyptian Arabic (RTL)

   The #langToggle button (next to the theme toggle) swaps the
   page between English and Egyptian Arabic. Technical terms
   (React, API, Landing Page, ...) deliberately stay in English.

   - The choice is saved in localStorage ("lang"); index.html
     also applies it before the first paint (no flash).
   - To change an Arabic text, edit it in LANG_CONTENT below.
     Each entry is [CSS selector, Arabic text]. If the selector
     matches several elements, give an array (one per element,
     null = leave that one as it is).
   - The original English text is kept in data-en on each
     element, so switching back restores it exactly.
   - The WhatsApp / email buttons are rebuilt on every switch,
     so their ready-written messages follow the language too.
   - All RTL + Arabic typography rules are in section 26 of
     style.css.
   ========================================================= */

let currentLang = "en";

try {
    currentLang =
        localStorage.getItem("lang") === "ar" ? "ar" : "en";
} catch (e) {}

const langToggle = document.getElementById("langToggle");

const UI_LABELS = {

    en: {
        themeLight: "Switch to light mode",
        themeDark: "Switch to dark mode",
        menuOpen: "Open navigation menu",
        menuClose: "Close navigation menu",
        langBtn: "Switch to Arabic",
        ready: "Ready!",
        almost: "Almost there"
    },

    ar: {
        themeLight: "التحويل للوضع الفاتح",
        themeDark: "التحويل للوضع الداكن",
        menuOpen: "فتح قائمة التنقل",
        menuClose: "إغلاق قائمة التنقل",
        langBtn: "التحويل للإنجليزية",
        ready: "جاهز!",
        almost: "قربنا نخلص"
    }

};

function uiLabel(key) {
    return UI_LABELS[currentLang][key];
}

const LANG_CONTENT = [

    /* Preloader */
    [".preloader-welcome-small", "أهلاً بيك في"],
    [".preloader-welcome-main", "البورتفوليو <span class='preloader-welcome-accent'>بتاعي</span>"],

    /* Navbar */
    [".nav-link", ["الرئيسية", "عني", "التعليم", "الخبرة", "المهارات", "الخدمات", "المشاريع", "تواصل"]],
    [".nav-cta", "يلا نتكلم"],

    /* Hero */
    [".hero-greeting", "أهلاً، أنا"],
    [".hero-description", "بساعد الشركات الصغيرة والـ startups يحوّلوا أفكارهم لمواقع احترافية بتصميم مدروس، مع شهر دعم بعد التسليم."],
    [".hero-buttons .btn > span:first-child", ["شوف شغلي", "حمّل الـ CV"]],

    /* About */
    ["#about .section-title", "نبذة <span>عني</span>"],
    [".about-text", "نظرة سريعة على إزاي الفضول للتكنولوجيا اتحوّل لتركيز على بناء تجارب ويب نضيفة واحترافية."],
    [".about-tags span", ["حلّال مشاكل", "بتعلّم باستمرار", "مركّز على العميل"]],
    ["#about .timeline-tag", ["الأساس", "الاكتشاف", "النمو", "النهاردة"]],
    ["#about .timeline-body h3", [null, null, null, "بعمل تجارب حقيقية"]],
    ["#about .timeline-body p", [
        "بدأت في أكاديمية الشروق، ودراسة الـ Computer Science فجّرت جوايا شغف التعلّم وحل المشاكل.",
        "لقيت المزيج المثالي بين الكود والإبداع، وقررت إن ده المسار اللي هركّز عليه.",
        "انضميت لمسار الـ React Front-End Development في DEPI، وبحوّل اللي بتعلّمه لمشاريع عملية وتجارب ويب حقيقية.",
        "مركّز على إني أعمل مواقع احترافية وسهلة الاستخدام بتحوّل الأفكار لحقيقة."
    ]],

    /* Education */
    ["#education .section-label", "الخلفية الأكاديمية"],
    ["#education .section-title", "الأساس <span>اللي ورا الكود.</span>"],
    [".education-institution", "أكاديمية الشروق"],
    [".education-department", "قسم Computer Science"],
    [".education-status > span:last-child", "بدرس حالياً"],
    [".education-info h3", "بكالوريوس Computer Science"],
    [".education-meta span:first-child", "أكاديمية الشروق"],
    [".education-meta span:last-child", "2021 — الآن"],
    [".education-info > p", "بدرس أساسيات علوم الحاسب، من الـ Data Structures والـ Algorithms لحد الـ Software Engineering وتصميم الـ Databases، وبكوّن الأساس التحليلي ورا كل حاجة بعملها في الـ front-end."],

    /* Experience */
    ["#experience .section-label", "رحلتي"],
    ["#experience .section-title", "التدريب <span>والخبرة.</span>"],
    ["#experience .timeline-tag", ["تدريب NTI", null]],
    ["#experience .timeline-list li", [
        "اتعلمت أساسيات لغة Python ومفاهيم البرمجة.",
        "عملت تطبيقات console عملية.",
        "طبّقت منطق البرمجة وأساليب حل المشاكل.",
        "تدريب مكثّف على React Front-End Development.",
        "بعمل واجهات responsive وسهلة الاستخدام.",
        "بشتغل بـ HTML وCSS وJavaScript وReact وBootstrap.",
        "بتمرّن على الـ API Integration والـ front-end الحديث.",
        "بعمل مشاريع عملية طول فترة التدريب."
    ]],

    /* Skills */
    ["#skills .section-label", "الأدوات بتاعتي"],
    ["#skills .section-title", "التقنيات اللي <span>بشتغل بيها.</span>"],
    ["#skills .section-intro", "تركيزي الأساسي على الـ Front-End Development، وخلفيتي في البرمجة بتخليني أتعامل مع المشاكل بتفكير منطقي قوي."],
    [".skill-card h3", [null, null, null, "الأدوات", "المهارات الشخصية"]],
    [".skill-card-wide .skill-tags span", ["التواصل", "العمل الجماعي", "حل المشاكل", "المرونة", "الاهتمام بالتفاصيل"]],

    /* Services */
    ["#services .section-label", "أقدر أعملك إيه"],
    ["#services .section-title", "أقدر أساعدك <span>إزاي؟</span>"],
    [".service-tab-title", ["منيو ديجيتال تفاعلي", "دعوات مناسبات تفاعلية", "Landing Pages", "كروت شخصية ديجيتال"]],
    [".service-tab-desc", [
        "منيوهات حديثة مصممة للمطاعم والكافيهات.",
        "دعوات ديجيتال جذابة للمناسبات الخاصة.",
        "صفحات مركّزة مبنية عشان تعرض منتجك أو خدمتك.",
        "بروفايلات ديجيتال حديثة لمشاركة بيانات التواصل بتاعتك."
    ]],
    [".service-panel-tag", ["خدمة 01", "خدمة 02", "خدمة 03", "خدمة 04"]],
    [".service-panel-body h3", ["منيو ديجيتال تفاعلي", "دعوات مناسبات تفاعلية", "Landing Pages", "كروت شخصية ديجيتال"]],
    [".service-panel-body > p", [
        "منيوهات ديجيتال تفاعلية بتسهّل على العملاء يستكشفوا الأطباق، ويكتشفوا العروض، ويلاقوا اللي عايزينه بسرعة.",
        "اعمل دعوات ديجيتال مش هتتنسي بتصميم تفاعلي وتفاصيل المناسبة وسهولة في المشاركة.",
        "Landing pages مركّزة بتعرض منتجك أو خدمتك أو حملتك بوضوح وتوجّه الزائر ناحية الإجراء المطلوب.",
        "كروت ديجيتال احترافية بتجمع بيانات التواصل واللينكات الاجتماعية والمعلومات الشخصية في صفحة واحدة سهلة المشاركة."
    ]],
    [".service-panel-cta > span:first-child", [
        "يلا نعمل منيو زي ده",
        "يلا نعمل دعوة زي دي",
        "يلا نعمل landing page زي دي",
        "يلا نعمل كارت زي ده"
    ]],

    /* Projects */
    ["#projects .section-label", "شغل مختار"],
    ["#projects .section-title", "مشاريع عملية <span>اتعلمت منها.</span>"],
    ["#projects .section-intro", "مجموعة مشاريع طبّقت فيها مهاراتي التقنية عشان أعمل تجارب عملية وسهلة الاستخدام."],
    [".project-badge", ["تجريبي", "لايف"]],
    [".project-type", ["دعوة تفاعلية", "Landing Page · مكتبة"]],
    [".project-body h3", ["دعوة فرح تفاعلية", null]],
    [".project-body > p", [
        "دعوة فرح بتبدأ بظرف مقفول مربوط بشريط ساتان. الضيوف بيفكّوا الشريط بإيديهم عشان يفتحوها ويكتشفوا الميعاد والجدول ومعرض الصور.",
        "Landing page عربية (RTL) لمكتبة أونلاين. الزائر بيتصفح الكتالوج، ويختار كتب فردية أو سلاسل أو عروض باقات، ويبعت طلبه للمحل على WhatsApp مباشرةً."
    ]],
    [".project-features li", [
        "شريط بيتحرك بـ physics وبيتفك بالسحب أو بالضغطة",
        "Scratch-off للتاريخ، وcountdown، وألعاب نارية",
        "معرض صور وفورم RSVP وموسيقى متولّدة بالكود",
        "كتالوج بحث وفلاتر تصنيفات وعروض باقات",
        "سلة مشتريات بتبني طلب جاهز يتبعت على WhatsApp",
        "لينكات مشاركة مباشرة لكل كتاب، مع light و dark themes"
    ]],
    [".project-links .btn > span:first-child", ["شوف الـ Demo", null, "شوف الـ Demo", null]],
    [".project-cta-title", "مشاريع تانية على GitHub"],
    [".project-cta-desc", "تصفّح باقي الـ repositories والتجارب بتاعتي."],

    /* Contact */
    ["#contact .section-label", "عندك مشروع في دماغك؟"],
    [".contact-title", "يلا نبني حاجة <span>عظيمة سوا.</span>"],
    [".contact-description", "سواء محتاج موقع لشركتك، أو landing page، أو واجهة React حديثة، يسعدني أسمع فكرتك."],
    [".contact-availability > span:last-child", "متاح حالياً لشغل الـ freelance"],
    [".contact-link-value", [null, "اتواصل معايا بشكل احترافي", "ابعتلي مباشرة", "تصفّح الكود والـ repos"]],

    /* Footer */
    [".footer-copyright", "© 2026 Remon Awad. جميع الحقوق محفوظة."]
];

const LANG_DESCRIPTION = {
    en: "Remon Awad - React Front-End Developer building modern, responsive, and user-focused digital experiences.",
    ar: "ريمون عوض - React Front-End Developer بعمل تجارب ديجيتال حديثة وresponsive ومركّزة على المستخدم."
};


function applyLangContent(lang) {

    LANG_CONTENT.forEach((entry) => {

        document.querySelectorAll(entry[0]).forEach((node, i) => {

            const ar = Array.isArray(entry[1]) ? entry[1][i] : entry[1];

            if (ar === null || ar === undefined) {
                return;
            }

            if (node.dataset.en === undefined) {
                node.dataset.en = node.innerHTML;
            }

            node.innerHTML = lang === "ar" ? ar : node.dataset.en;

        });

    });

}

function applyLanguage(lang) {

    currentLang = lang;

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    applyLangContent(lang);


    /* ---------- Meta description ---------- */

    const meta = document.querySelector('meta[name="description"]');

    if (meta) {
        meta.setAttribute("content", LANG_DESCRIPTION[lang]);
    }


    /* ---------- Language button: always offers the OTHER language ---------- */

    if (langToggle) {

        langToggle.dataset.target = lang === "ar" ? "en" : "ar";

        langToggle.textContent = lang === "ar" ? "EN" : "ع";

        langToggle.setAttribute("aria-label", uiLabel("langBtn"));

        langToggle.setAttribute("title", uiLabel("langBtn"));

    }


    /* ---------- Theme + menu labels follow the language ---------- */

    applyTheme(
        document.body.classList.contains("dark-mode") ? "dark" : "light"
    );

    if (menuToggle && navLinks) {

        const label = uiLabel(
            navLinks.classList.contains("active") ? "menuClose" : "menuOpen"
        );

        menuToggle.setAttribute("aria-label", label);

        menuToggle.setAttribute("title", label);

    }


    /* ---------- WhatsApp + email links (message language) ---------- */

    initServiceWhatsAppLinks();

    initEmailComposeLinks();


    /* ---------- Layout changed: refresh scroll-dependent UI ---------- */

    updateActiveNav();

    updateScrollProgress();

}

/* ---------------------------------------------------------
   SMOOTH LANGUAGE SWITCH

   Instead of the page "jumping" into the other language:
   1. the content fades out (opacity + a light blur),
   2. while it is invisible, the language / direction change,
   3. the scroll position is restored to the same spot inside
      the same section (Arabic and English have different
      heights),
   4. the content fades back in with a small upward glide.

   Uses the Web Animations API, so it does not touch the CSS
   transitions of any element. Skipped for visitors who prefer
   reduced motion.
   --------------------------------------------------------- */

let langSwitching = false;

function langFadeTargets() {

    return Array.from(
        document.querySelectorAll(
            "main, .footer, .header .logo, .header .nav-link, .header .nav-cta"
        )
    );

}

function captureScrollAnchor() {

    if (window.scrollY < 24) {
        return null;
    }

    const header = document.querySelector(".header");

    const y = (header ? header.offsetHeight : 0) + 40;

    const list = document.querySelectorAll("main section");

    for (const section of list) {

        const rect = section.getBoundingClientRect();

        if (rect.top <= y && rect.bottom > y) {

            return {
                section,
                y,
                ratio: (y - rect.top) / rect.height
            };

        }

    }

    return null;

}

function restoreScrollAnchor(anchor) {

    if (!anchor) {
        return;
    }

    const rect = anchor.section.getBoundingClientRect();

    const delta = rect.top + anchor.ratio * rect.height - anchor.y;

    window.scrollTo({
        top: window.scrollY + delta,
        behavior: "instant"
    });

}

function switchLanguage(next) {

    if (langSwitching) {
        return;
    }

    const save = () => {

        try {
            localStorage.setItem("lang", next);
        } catch (e) {}

    };

    const reduceMotion =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !document.body.animate) {

        applyLanguage(next);

        save();

        return;

    }

    langSwitching = true;

    const targets = langFadeTargets();

    const isBlock = (el) => el.matches("main, .footer");

    const hidden = {
        opacity: 0,
        filter: "blur(5px)"
    };

    const shown = {
        opacity: 1,
        filter: "blur(0px)"
    };


    /* ---------- 1. Fade out ---------- */

    const fadeOut = targets.map((el) =>
        el.animate(
            [shown, hidden],
            {
                duration: 220,
                easing: "cubic-bezier(0.4, 0, 1, 1)",
                fill: "forwards"
            }
        )
    );

    Promise.all(fadeOut.map((a) => a.finished))
        .then(() => {

            /* ---------- 2 + 3. Swap language, keep the scroll spot ---------- */

            const anchor = captureScrollAnchor();

            applyLanguage(next);

            save();

            restoreScrollAnchor(anchor);


            /* ---------- 4. Fade in ---------- */

            const fadeIn = targets.map((el) =>
                el.animate(
                    [
                        isBlock(el)
                            ? { ...hidden, transform: "translateY(14px)" }
                            : hidden,
                        isBlock(el)
                            ? { ...shown, transform: "translateY(0)" }
                            : shown
                    ],
                    {
                        duration: 460,
                        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                        fill: "forwards"
                    }
                )
            );

            fadeOut.forEach((a) => a.cancel());

            return Promise.all(fadeIn.map((a) => a.finished))
                .then(() => {
                    fadeIn.forEach((a) => a.cancel());
                });

        })
        .catch(() => {

            targets.forEach((el) =>
                el.getAnimations().forEach((a) => a.cancel())
            );

        })
        .finally(() => {

            langSwitching = false;

        });

}

if (langToggle) {

    langToggle.addEventListener("click", () => {

        switchLanguage(currentLang === "ar" ? "en" : "ar");

    });

}


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

                preloaderText.textContent = uiLabel("ready");

            } else {

                preloaderText.textContent = uiLabel("almost");

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

                preloaderText.textContent = uiLabel("ready");

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
                ? uiLabel("themeLight")
                : uiLabel("themeDark")
        );

        themeToggle.setAttribute(
            "title",
            isDark
                ? uiLabel("themeLight")
                : uiLabel("themeDark")
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
                    ? uiLabel("menuClose")
                    : uiLabel("menuOpen")
            );


            menuToggle.setAttribute(
                "title",
                isOpen
                    ? uiLabel("menuClose")
                    : uiLabel("menuOpen")
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
        uiLabel("menuOpen")
    );


    menuToggle.setAttribute(
        "title",
        uiLabel("menuOpen")
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

    const lang = WHATSAPP_FORCE_LANG || currentLang;


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
        'a[href^="mailto:"], a[data-email-address]'
    );

    if (!emailLinks.length) {
        return;
    }


    const browserLang =
        (navigator.language || "en").toLowerCase();

    const lang = EMAIL_FORCE_LANG || currentLang;

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
            link.dataset.emailAddress ||
            link.getAttribute("href")
                .replace(/^mailto:/i, "")
                .split("?")[0]
                .trim();

        link.dataset.emailAddress = address;

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

        if (!link.dataset.baseLabel) {
            link.dataset.baseLabel =
                link.getAttribute("aria-label") ||
                `Email ${address}`;
        }

        const baseLabel = link.dataset.baseLabel;

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
   INITIAL LANGUAGE
   ========================================================= */

applyLanguage(currentLang);


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