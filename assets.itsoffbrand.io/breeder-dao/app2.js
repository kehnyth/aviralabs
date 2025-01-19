window.SmoothScroll.stop();

// ----- section pinning -----
// ----- section pinning -----
function updatePositions() {
    if (window.innerWidth >= 992) {
        const targets = document.querySelectorAll('[data-pin^="target"]');
        const pins = document.querySelectorAll('[data-pin^="pin"]');

        targets.forEach((target, i) => {
            const pin = pins[i];
            const targetRect = target.getBoundingClientRect();

            if (window.scrollY > targetRect.top) {
                pin.style.position = "fixed";
                pin.style.top = `${targetRect.top}px`;
            } else {
                pin.style.position = "absolute";
                pin.style.top = `${targetRect.top + window.scrollY}px`;
            }
        });
    }
}

window.addEventListener("load", () => {
    updatePositions();
    window.addEventListener("scroll", updatePositions);
    window.addEventListener("resize", updatePositions);
});

// resize force refresh
var windowWidth = window.innerWidth;
window.addEventListener("resize", function() {
    if (Math.abs(window.innerWidth - windowWidth) >= 50) {
        windowWidth = window.innerWidth;
        location.reload();
    }
});

// ----- hide cursor -----
// ----- hide cursor -----
// document.body.style.cursor =
//   'url("https://uploads-ssl.webflow.com/63d3d70c4c3fb50d61204286/63eb631e3a231714424aaa31_corsor-normal.svg"), default';

var defaultCursor =
    'url("https://uploads-ssl.webflow.com/63d3d70c4c3fb50d61204286/63eb693f6d17657a33b68fb6_br-cursor-normal-c.png") 16 16, default';
var hoverLinkCursor =
    'url("https://uploads-ssl.webflow.com/63d3d70c4c3fb50d61204286/63eb693fd9859c0403e97fa4_br-cursor-hover-c.png") 16 16, pointer';

document.body.style.cursor = defaultCursor;

var hoverLinks = document.querySelectorAll(
    "a, .nav-btn, [audio-btn], [audio-toggle], [audio-btn-sq], [scan-btn], .swiper-slide, .swiper-drag, .gp-trigger, .sh-trigger"
);

for (var i = 0; i < hoverLinks.length; i++) {
    hoverLinks[i].style.cursor = hoverLinkCursor;
}

// ----- toggles -----
// ----- toggles -----
var navBtn = document.querySelector(".menu-trigger");
var navLinksWrap = document.querySelector(".nav-links-wrap");
var frameBlur = document.querySelector(".frame-blur");
var frameBlurUi = document.querySelector(".frame-blur-ui");
var frameBlurBody = document.querySelector(".frame-blur-body");
var aboutToggle = document.querySelector(".info-svg-pos");
var aboutPanel = document.querySelector(".about-wrap");
var navClone = document.querySelector(".nav-clone");
var gameTrigger = document.querySelector(".game-trigger");
var instTrigger = document.querySelector(".inst-trigger");
var sliderGame = document.querySelector(".slider-game");
var sliderInst = document.querySelector(".slider-inst");
var overflowHiddenObject = document.querySelectorAll(".overflow-hidden-object");
var ctaSubTrigger = document.querySelector("#cta-sub-trigger");
var ctaSubTarget = document.querySelector("#cta-sub-target");
const shTrigger = document.querySelectorAll(".sh-trigger");
const shPanelWrap = document.querySelectorAll(".sh-panel-wrap");
const frameBlurSh = document.querySelector(".frame-blur-sh");

navBtn.addEventListener("click", function() {
    setTimeout(function() {
        navLinksWrap.classList.toggle("is-open");
    }, 5);
    if (navLinksWrap.classList.contains("is-open")) {
        setTimeout(function() {
            navLinksWrap.style.display = "none";
        }, 300);
    } else {
        navLinksWrap.style.display = "block";
        for (var i = 0; i < overflowHiddenObject.length; i++) {
            overflowHiddenObject[i].classList.remove("op-05");
        }
    }
    frameBlur.classList.toggle("is-open");
    aboutToggle.classList.remove("is-open");
    aboutPanel.classList.remove("is-open");
    frameBlurBody.classList.remove("is-open");
    navBtn.classList.toggle("is-open");
    navClone.classList.remove("is-open");
    if (navBtn.classList.contains("is-open")) {
        window.SmoothScroll.stop();
    } else {
        window.SmoothScroll.start();
    }
});

frameBlur.addEventListener("click", function() {
    navBtn.click();
    navClone.classList.remove("is-open");
    navBtn.classList.remove("is-open");
});

aboutToggle.addEventListener("click", function() {
    setTimeout(function() {
        aboutPanel.classList.toggle("is-open");
    }, 5);
    if (aboutPanel.classList.contains("is-open")) {
        setTimeout(function() {
            aboutPanel.style.display = "none";
        }, 300);
    } else {
        aboutPanel.style.display = "block";
    }
    aboutToggle.classList.toggle("is-open");
    frameBlurBody.classList.toggle("is-open");
    navLinksWrap.classList.remove("is-open");
    frameBlur.classList.remove("is-open");
    navClone.classList.remove("is-open");
    if (aboutPanel.classList.contains("is-open")) {
        window.SmoothScroll.start();
    } else {
        window.SmoothScroll.stop();
    }
});

aboutToggle.addEventListener("click", function() {
    for (var i = 0; i < overflowHiddenObject.length; i++) {
        overflowHiddenObject[i].classList.toggle("op-05");
    }
});

navClone.addEventListener("click", function() {
    navLinksWrap.style.display = "block";
    setTimeout(function() {
        navLinksWrap.classList.toggle("is-open");
    }, 5);
    frameBlur.classList.toggle("is-open");
    aboutPanel.classList.remove("is-open");
    aboutToggle.classList.remove("is-open");
    frameBlurBody.classList.remove("is-open");
    frameBlurSh.classList.remove("is-open");
    navClone.classList.remove("is-open");
    navBtn.classList.add("is-open");
});

frameBlurUi.addEventListener("click", function() {
    aboutToggle.click();
});

frameBlurBody.addEventListener("click", function() {
    aboutToggle.click();
    navClone.classList.remove("is-open");
});

frameBlurSh.addEventListener("click", function() {
    for (var i = 0; i < shTrigger.length; i++) {
        shTrigger[i].classList.remove("is-open");
        shPanelWrap[i].classList.remove("is-open");
    }
    navClone.classList.remove("is-open");
    frameBlurSh.classList.remove("is-open");
    window.SmoothScroll.start();
});

shTrigger.forEach((el, index) => {
    el.addEventListener("click", function() {
        if (this.classList.contains("is-open")) {
            this.classList.remove("is-open");
            frameBlurSh.classList.remove("is-open");
            navClone.classList.remove("is-open");
            shPanelWrap.forEach((wrap) => {
                wrap.classList.remove("is-open");
                wrap.style.display = "none";
            });
            window.SmoothScroll.start();
        } else {
            el.classList.add("is-open");
            shTrigger.forEach((item) => {
                if (item !== this) {
                    item.classList.remove("is-open");
                }
            });
            navClone.classList.add("is-open");
            frameBlurSh.classList.add("is-open");
            shPanelWrap.forEach((wrap) => {
                wrap.classList.remove("is-open");
            });
            shPanelWrap[index].style.display = "block";
            setTimeout(() => {
                shPanelWrap[index].classList.add("is-open");
            }, 5);
            window.SmoothScroll.stop();
        }
    });
});

$(document).ready(function() {
    $(navClone).click(function() {
        $(shTrigger).removeClass("is-open");
        $(shPanelWrap).removeClass("is-open");
    });
});

gameTrigger.addEventListener("click", function() {
    gameTrigger.classList.add("is-open");
    instTrigger.classList.remove("is-open");
    sliderGame.classList.add("is-open");
    sliderInst.classList.remove("is-open");
});

instTrigger.addEventListener("click", function() {
    gameTrigger.classList.remove("is-open");
    instTrigger.classList.add("is-open");
    sliderGame.classList.remove("is-open");
    sliderInst.classList.add("is-open");
});

// // form btn click
ctaSubTrigger.addEventListener("click", function() {
    ctaSubTarget.click();
});

// ------------ GSAP ----------
// ------------ GSAP ----------
// ------------ GSAP ----------
// ------------ GSAP ----------

window.addEventListener("DOMContentLoaded", (event) => {
    // Split text into spans
    let typeSplit = new SplitType("[text-split]", {
        types: "lines, words, chars",
        tagName: "span"
    });
    let scrambleSplit = new SplitType(".amp-txt, .btn-txt", {
        //.gp-trigger .d-h
        types: "lines, words, chars",
        tagName: "span",
        lineClass: "sc-lines",
        wordClass: "sc-words",
        charClass: "sc-chars"
    });

    var instTrigger = document.querySelector(".inst-trigger");
    var gameTrigger = document.querySelector(".game-trigger");
    var sliderInst = document.querySelector(".slider-inst");
    var sliderGame = document.querySelector(".slider-game");
    var slidesInst = sliderInst.querySelectorAll(".swiper-slide");
    var slidesGame = sliderGame.querySelectorAll(".swiper-slide");

    // Link timelines to scroll position
    function createScrollTrigger(triggerElement, timeline) {
        // Reset tl when scroll out of view past bottom of screen
        ScrollTrigger.create({
            trigger: triggerElement,
            start: "top bottom",
            onLeaveBack: () => {
                timeline.progress(0);
                timeline.pause();
            }
        });
        // Play tl when scrolled into view (60% from top of screen)
        ScrollTrigger.create({
            trigger: triggerElement,
            start: "top 60%",
            onEnter: () => timeline.play()
        });
    }

    $("[words-slide-up]").each(function(index) {
        let tl = gsap.timeline({
            paused: true
        });
        tl.from($(this).find(".word"), {
            opacity: 0,
            yPercent: 100,
            duration: 0.5,
            ease: "back.out(2)",
            stagger: {
                amount: 0.5
            }
        });
        createScrollTrigger($(this), tl);
    });

    // ----- hero scrubbing -----
    // ----- hero scrubbing -----
    $("[scrub-hero-word]").each(function(index) {
        let startHeroPercentage = "70%";
        let endHeroPercentage = "30%";
        if ($(window).width() <= 768) {
            startHeroPercentage = "50%";
            endHeroPercentage = "10%";
        }
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: $(this),
                start: "top " + startHeroPercentage,
                end: "top " + endHeroPercentage,
                scrub: true
            }
        });
        tl.to($(this).find(".word"), {
            opacity: 0,
            yPercent: "-100",
            duration: 0.3,
            ease: "power2.out",
            stagger: {
                amount: 0.1
            }
        });
    });
    $("[scrub-hero-object]").each(function(index) {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: $(this),
                start: "top 70%",
                end: "top 30%",
                scrub: true
            }
        });
        tl.to($(this), {
            opacity: 0,
            yPercent: "-100",
            duration: 0.3,
            ease: "power2.out",
            stagger: {
                amount: 0.1
            }
        });
    });

    $("[scrub-scroll-object]").each(function(index) {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: $(this),
                start: "top 90%",
                end: "top 50%",
                scrub: true
                // pin: true,
                // pinSpacing: false
            }
        });
        tl.to($(this), {
            opacity: 0,
            yPercent: "-50",
            duration: 0.3,
            ease: "power2.out",
            stagger: {
                amount: 0.1
            }
        });
    });

    // ----- general scrubbing -----
    // ----- general scrubbing -----
    $("[scrub-each-word]").each(function(index) {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: $(this),
                start: "100% 100%",
                end: "top 0%",
                scrub: true
            }
        });
        tl.from($(this).find(".word"), {
            opacity: 0,
            yPercent: 100,
            duration: 0.3,
            ease: "power2.out",
            stagger: {
                amount: 0.2
            }
        });
        tl.to($(this).find(".word"), {
            opacity: 0,
            yPercent: "-100",
            duration: 0.3,
            ease: "power2.out",
            stagger: {
                amount: 0.2
            }
        });
    });

    $("[scrub-word-tight]").each(function(index) {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: $(this),
                start: "100% 100%",
                end: "top 0%",
                scrub: true
            }
        });
        tl.from($(this).find(".word"), {
            opacity: 0,
            yPercent: 100,
            duration: 0.3,
            ease: "power2.out",
            stagger: {
                amount: 0.05
            }
        });
        tl.to($(this).find(".word"), {
            opacity: 0,
            yPercent: "-100",
            duration: 0.3,
            ease: "power2.out",
            stagger: {
                amount: 0.05
            }
        });
    });

    $("[scrub-object]").each(function(index) {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: $(this),
                start: "100% 100%",
                end: "top 0%",
                scrub: true
            }
        });
        tl.from($(this), {
            opacity: 0,
            yPercent: 120,
            duration: 0.3,
            ease: "power2.out",
            stagger: {
                amount: 0.2
            }
        });
        tl.to($(this), {
            opacity: 0,
            yPercent: "-120",
            duration: 0.3,
            ease: "power2.out",
            stagger: {
                amount: 0.2
            }
        });
    });

    $("[scrub-object-sh]").each(function(index) {
        let tl1 = gsap.timeline({
            scrollTrigger: {
                trigger: ".sh-content-wrap",
                start: "top top",
                end: "bottom 0%",
                scrub: true
            }
        });
        tl1.from($(this), {
            opacity: 0,
            yPercent: 120,
            duration: 0.3,
            ease: "power2.out",
            stagger: {
                amount: 0.2
            }
        });
        let tl2 = gsap.timeline({
            scrollTrigger: {
                trigger: ".sh-btm-target",
                start: "top 50%",
                end: "bottom 50%",
                scrub: true
            }
        });
        tl2.to($(this), {
            opacity: 0,
            yPercent: "-120",
            duration: 0.3,
            ease: "power2.out",
            stagger: {
                amount: 0.2
            }
        });
    });

    $("[scrub-object-gp]").each(function(index) {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: "[data-pin='pin5']",
                start: "top 10%",
                end: "bottom 80%",
                scrub: false,
                onEnter: function() {
                    tl.play();
                },
                onLeave: function() {
                    tl.reverse();
                },
                onEnterBack: function() {
                    tl.play();
                },
                onLeaveBack: function() {
                    tl.reverse();
                }
            }
        });
        tl.from($(this), {
            opacity: 0,
            yPercent: 120,
            duration: 1,
            ease: "power2.out",
            stagger: {
                amount: 0.2
            }
        });
    });

    $("[scrub-gp-slide]").each(function(index) {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: "[data-pin='pin5']",
                start: "top center",
                scrub: false,
                onEnter: function() {
                    tl.play();
                },
                onLeave: function() {
                    tl.reverse();
                },
                onEnterBack: function() {
                    tl.play();
                },
                onLeaveBack: function() {
                    tl.reverse();
                }
            }
        });
        tl.from($(this), {
            opacity: 0,
            xPercent: 100,
            duration: 1,
            ease: "Power1.easeInOut",
            stagger: {
                amount: 0.2
            }
        });
    });

    // ----- about scrubbing -----
    // ----- about scrubbing -----

    $("[scrub-abt-word]").each(function(index) {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".about-hl-wrap",
                start: "110% 110%",
                end: "top -50%",
                scrub: true
            }
        });
        tl.from($(this).find(".word"), {
            opacity: 0,
            yPercent: 100,
            duration: 0.3,
            ease: "power2.out",
            stagger: {
                amount: 0.2
            }
        });
        tl.to($(this).find(".word"), {
            opacity: 0,
            yPercent: "-100",
            duration: 0.3,
            ease: "power2.out",
            stagger: {
                amount: 0.2
            }
        });
    });

    $("[scrub-abt-object]").each(function(index) {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".about-hl-wrap",
                start: "110% 110%",
                end: "top -50%",
                scrub: true
            }
        });
        tl.from($(this), {
            delay: 0.3,
            opacity: 0,
            yPercent: 100,
            duration: 0.3,
            ease: "power2.out",
            stagger: {
                amount: 0.2
            }
        });
        tl.to($(this), {
            delay: 0.3,
            opacity: 0,
            yPercent: "-100",
            duration: 0.3,
            ease: "power2.out",
            stagger: {
                amount: 0.2
            }
        });
    });

    // ----- stakeholders scrubbing -----
    // ----- stakeholders scrubbing -----
    $("[scrub-sh-word]").each(function(index) {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: $(this),
                start: "100% 100%",
                end: "top 0%",
                scrub: true
            }
        });
        tl.from($(this).find(".word"), {
            opacity: 0,
            yPercent: 100,
            duration: 0.3,
            ease: "power2.out",
            stagger: {
                amount: 0.2
            }
        });
        tl.to($(this).find(".word"), {
            opacity: 0,
            yPercent: "-100",
            duration: 0.3,
            ease: "power2.out",
            stagger: {
                amount: 0.2
            }
        });
    });

    // ----- roadmap scrubbing -----
    // ----- roadmap scrubbing -----
    $("[scrub-rm-slide]").each(function(index) {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".folder-section.is-1",
                start: "top 60%",
                end: "top 30%",
                scrub: false,
                onEnter: function() {
                    tl.play();
                },
                onLeaveBack: function() {
                    tl.reverse();
                }
            }
        });
        tl.from($(this), {
            opacity: 0,
            xPercent: 100,
            duration: 2,
            ease: "power2.out",
            stagger: {
                amount: 0.2
            }
        });
    });

    $("[scrub-object-rm]").each(function(index) {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".folder-section.is-1",
                start: "top 30%",
                end: "top 20%",
                scrub: true
            }
        });
        tl.from($(this), {
            opacity: 0,
            yPercent: 120,
            duration: 0.3,
            ease: "power2.out",
            stagger: {
                amount: 0.2
            }
        });
    });

    // ----- team scrubbing -----
    // ----- team scrubbing -----
    $("[scrub-ta-slide]").each(function(index) {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".folder-section.is-2",
                start: "top 60%",
                end: "top 30%",
                scrub: false,
                onEnter: function() {
                    tl.play();
                },
                onLeaveBack: function() {
                    tl.reverse();
                }
            }
        });
        tl.from($(this), {
            opacity: 0,
            xPercent: 100,
            duration: 2,
            ease: "power2.out",
            stagger: {
                amount: 0.2
            }
        });
    });

    $("[scrub-object-ta]").each(function(index) {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".folder-section.is-2",
                start: "top 30%",
                end: "top 20%",
                scrub: true
            }
        });
        tl.from($(this), {
            opacity: 0,
            yPercent: 120,
            duration: 0.3,
            ease: "power2.out",
            stagger: {
                amount: 0.2
            }
        });
    });

    // ----- advisors scrubbing -----
    // ----- advisors scrubbing -----
    $("[scrub-adv-slide]").each(function(index) {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".folder-section.is-3",
                start: "top 60%",
                end: "top 30%",
                scrub: false,
                onEnter: function() {
                    tl.play();
                },

                onLeaveBack: function() {
                    tl.reverse();
                }
            }
        });
        tl.from($(this), {
            opacity: 0,
            xPercent: 100,
            duration: 2,
            ease: "power2.out",
            stagger: {
                amount: 0.2
            }
        });
    });

    $("[scrub-object-adv]").each(function(index) {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".folder-section.is-3",
                start: "top 30%",
                end: "top 20%",
                scrub: true
            }
        });
        tl.from($(this), {
            opacity: 0,
            yPercent: 120,
            duration: 0.3,
            ease: "power2.out",
            stagger: {
                amount: 0.2
            }
        });
    });

    // ----- link scrambler -----
    // ----- link scrambler -----
    function getRandomLetter(length) {
        var result = "";
        var characters = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    $(".sc-chars").each(function(index) {
        let text = $(this).text();
        $(this).attr("letter", text);
    });

    $(".nav-link, .sh-trigger, .btn-svg-wrap, .gp-trigger").each(function(
        index
    ) {
        function resetText() {
            if (myInterval !== undefined) {
                clearInterval(myInterval);
            }
            chars.each(function(index) {
                let letter = $(this).attr("letter");
                $(this).text(letter);
            });
        }

        let myInterval;
        let chars = $(this).find(".sc-chars");
        $(this).on("mouseenter", function() {
            let length = chars.length;
            myInterval = setInterval(function() {
                chars.each(function(index) {
                    if (index < length) {
                        let letter = getRandomLetter(1);
                        $(this).text(letter);
                    } else {
                        let letter = $(this).attr("letter");
                        $(this).text(letter);
                    }
                });
                length = length - 1;
            }, 100);
            setTimeout(() => {
                resetText();
            }, 600);
        });
        $(this).on("mouseleave", function() {
            resetText();
        });
    });

    gsap.set(slidesInst, {
        opacity: 0,
        yPercent: -100
    });

    gameTrigger.addEventListener("click", function() {
        gsap.to(slidesInst, {
            opacity: 0,
            yPercent: -100,
            duration: 0.5,
            ease: "power2.out",
            stagger: {
                amount: 0.2
            }
        });

        gsap.to(slidesGame, {
            delay: 0.3,
            opacity: 1,
            yPercent: 0,
            duration: 1,
            ease: "power2.out",
            stagger: {
                amount: 0.2
            }
        });
    });

    instTrigger.addEventListener("click", function() {
        gsap.to(slidesGame, {
            opacity: 0,
            yPercent: 100,
            duration: 0.5,
            ease: "power2.out",
            stagger: {
                amount: 0.2
            }
        });

        gsap.to(slidesInst, {
            delay: 0.3,
            opacity: 1,
            yPercent: 0,
            duration: 1,
            ease: "power2.out",
            stagger: {
                amount: 0.2
            }
        });
    });

    // ----- CTA -----
    // ----- CTA -----

    $("[scrub-cta-object]").each(function(index) {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".c.home-seccta",
                start: "top 10%",
                end: "bottom 80%",
                scrub: false,
                onEnter: function() {
                    tl.play();
                },
                onLeaveBack: function() {
                    tl.reverse();
                }
            }
        });
        tl.from($(this), {
            opacity: 0,
            translateX: "110%",
            rotateX: 60,
            rotateY: -90,
            rotateZ: 0,
            duration: 1,
            ease: "power2.out",
            stagger: {
                amount: 0.2
            }
        });
    });

    // ----- PRELOADER -----
    // ----- PRELOADER -----

    CustomEase.create(
        "introEase",
        "M0,0,C0,0,0.13,0.34,0.238,0.442,0.305,0.506,0.322,0.514,0.396,0.54,0.478,0.568,0.468,0.56,0.522,0.584,0.572,0.606,0.61,0.719,0.714,0.826,0.798,0.912,1,1,1,1"
    );
    CustomEase.create(
        "obEase",
        "M0,0 C0,0 0.026,0 0.052,0 0.254,0 0.282,0.142 0.386,0.538 0.478,0.889 0.619,0.998 0.94,0.998 0.976,0.998 1,0.998 1,0.998 "
    );

    let counter = {
        value: 0
    };
    let loaderDuration = 8;

    // If not a first time visit in this tab
    if (sessionStorage.getItem("visited") !== null) {
        loaderDuration = 2;
        counter = {
            value: 75
        };
    }
    sessionStorage.setItem("visited", "true");

    function updateLoaderText() {
        let progress = Math.round(counter.value);
        $(".pre-txt.counter").text(progress);
    }

    function endLoaderAnimation() {
        let tl = gsap.timeline({
            onComplete: switchEntry
        });
        tl.to(".pre-txt", {
            yPercent: "100",
            duration: 0.3
        });
        tl.to(".loader-progress", {
            xPercent: "100",
            duration: 0.3
        });

        function switchEntry() {
            setTimeout(function() {
                $(".pre-sound-layer").hide();
                $(".pre-enter-wrap").removeClass("disabled");
                $(".pre-prog-wrap").addClass("disabled");
            }, 100);
        }
    }

    let tl = gsap.timeline({
        onComplete: endLoaderAnimation
    });
    tl.to(counter, {
        value: 100,
        onUpdate: updateLoaderText,
        duration: loaderDuration,
        ease: "introEase"
    });
    tl.to(
        ".loader-progress", {
            scaleX: 1,
            duration: loaderDuration,
            ease: "introEase"
        },
        0
    );

    // enter site click
    $("[pre-load-object]").click(function() {
        $(".pre-cont-inner").addClass("disabled");

        gsap.to(".pre-bg-sec.is-top", {
            yPercent: -105,
            duration: 2,
            ease: "obEase"
        });

        gsap.to(".pre-bg-sec.is-btm", {
            yPercent: 105,
            duration: 2,
            ease: "obEase",
            onComplete: function() {
                gsap.set(".preloader", {
                    display: "none"
                });
                window.SmoothScroll.start();
            }
        });

        gsap.to(".pre-bg", {
            opacity: 0,
            duration: 4,
            ease: "obEase"
        });

        gsap.to("[pre-load-object]", {
            yPercent: 105,
            duration: 0.6,
            ease: "inOut"
        });
    });

    // Avoid flash of unstyled content
    gsap.set("[text-split], .amp-txt, .btn-txt, .pre-txt", {
        opacity: 1
    });
});

// refresh on resize
window.addEventListener("resize", function() {
    ScrollTrigger.refresh();
});

// ---------- SWIPER ----------
// ---------- SWIPER ----------
// ---------- SWIPER ----------
// ---------- SWIPER ----------

var ssFirst = document.querySelectorAll(
    ".swiper-wrapper.is-slider-main .ss-first"
);
var ssSecond = document.querySelectorAll(
    ".swiper-wrapper.is-slider-main .ss-second"
);
var ssFirstTotal = ssFirst.length;
var ssSecondTotal = ssSecond.length;

for (var i = 0; i < ssFirstTotal; i++) {
    if (i < ssFirstTotal / 2) {
        ssFirst[i].style.transform = "translate(50%, 0px)";
    }
}
for (var i = 0; i < ssSecondTotal; i++) {
    if (i < ssSecondTotal / 2) {
        ssSecond[i].style.transform = "translate(50%, 0px)";
    }
}

$(".slider-main_component").each(function(index) {
    let spvMobile = "5";
    if ($(window).width() <= 768) {
        spvMobile = "2";
    }
    const swiper = new Swiper($(this).find(".swiper")[0], {
        speed: 700,
        slidesPerView: spvMobile,
        loop: false,
        spaceBetween: 20,
        autoHeight: false,
        passiveListeners: true,
        grid: {
            rows: 2,
            fill: "row"
        },
        threshold: 5,
        pagination: {
            el: $(this).find(".swiper-bullet-wrapper")[0],
            bulletActiveClass: "is-active",
            bulletClass: "swiper-bullet",
            bulletElement: "button",
            clickable: true
        },
        navigation: {
            nextEl: $(this).find(".swiper-next")[0],
            prevEl: $(this).find(".swiper-prev")[0],
            disabledClass: "is-disabled"
        },
        scrollbar: {
            el: $(this).find(".swiper-drag-wrapper")[0],
            draggable: true,
            dragClass: "swiper-drag",
            snapOnRelease: true
        },
        slideActiveClass: "is-active",
        slideDuplicateActiveClass: "is-active"
    });
});

$(".slider-roadmap_component").each(function(index) {
    const swiper = new Swiper($(this).find(".swiper")[0], {
        speed: 700,
        slidesPerView: "auto",
        loop: false,
        spaceBetween: 20,
        autoHeight: false,
        passiveListeners: true,
        freeMode: {
            enabled: true,
            sticky: true
        },
        // mousewheel: {
        //   forceToAxis: true
        // },
        threshold: 5,
        pagination: {
            el: $(this).find(".swiper-bullet-wrapper")[0],
            bulletActiveClass: "is-active",
            bulletClass: "swiper-bullet",
            bulletElement: "button",
            clickable: true
        },
        navigation: {
            nextEl: $(this).find(".swiper-next")[0],
            prevEl: $(this).find(".swiper-prev")[0],
            disabledClass: "is-disabled"
        },
        scrollbar: {
            el: $(this).find(".swiper-drag-wrapper")[0],
            draggable: true,
            dragClass: "swiper-drag",
            snapOnRelease: true
        },
        slideActiveClass: "is-active",
        slideDuplicateActiveClass: "is-active"
    });
});

$(".ss-first").click(function() {
    let ssIndex = $(this).index();
    $(".gp-pop-list").addClass("is-open");
    setTimeout(function() {
        $(".gp-pop-item").eq(ssIndex).addClass("is-open");
    }, 10);
    window.SmoothScroll.stop();
});

$(".is-slider-team").click(function() {
    let ssIndex = $(this).index();
    $(".ta-pop-list").addClass("is-open");
    setTimeout(function() {
        $(".ta-pop-item").eq(ssIndex).addClass("is-open");
    }, 10);
    window.SmoothScroll.stop();
});

$(".is-slider-adv").click(function() {
    let ssIndex = $(this).index();
    $(".adv-pop-list").addClass("is-open");
    setTimeout(function() {
        $(".adv-pop-item").eq(ssIndex).addClass("is-open");
    }, 10);
    window.SmoothScroll.stop();
});

$(".slide-close").click(function() {
    setTimeout(function() {
        $(".gp-pop-list, .ta-pop-list, .adv-pop-list").removeClass("is-open");
    }, 300);
    $(".gp-pop-item, .ta-pop-item, .adv-pop-item").removeClass("is-open");
    window.SmoothScroll.start();
});

$(".slider-team_component").each(function(index) {
    const swiper = new Swiper($(this).find(".swiper")[0], {
        speed: 700,
        slidesPerView: "auto",
        loop: false,
        spaceBetween: 20,
        autoHeight: false,
        passiveListeners: true,
        freeMode: {
            enabled: true,
            sticky: true
        },
        threshold: 5,
        pagination: {
            el: $(this).find(".swiper-bullet-wrapper")[0],
            bulletActiveClass: "is-active",
            bulletClass: "swiper-bullet",
            bulletElement: "button",
            clickable: true
        },
        navigation: {
            nextEl: $(this).find(".swiper-next")[0],
            prevEl: $(this).find(".swiper-prev")[0],
            disabledClass: "is-disabled"
        },
        scrollbar: {
            el: $(".rm-tab-block.is-ta").find(".swiper-drag-wrapper")[0],
            draggable: true,
            dragClass: "swiper-drag",
            snapOnRelease: true
        },
        slideActiveClass: "is-active",
        slideDuplicateActiveClass: "is-active"
    });
});

$(".slider-adv_component").each(function(index) {
    const swiper = new Swiper($(this).find(".swiper")[0], {
        speed: 700,
        slidesPerView: "auto",
        loop: false,
        spaceBetween: 20,
        autoHeight: false,
        passiveListeners: true,
        freeMode: {
            enabled: true,
            sticky: true
        },
        threshold: 5,
        pagination: {
            el: $(this).find(".swiper-bullet-wrapper")[0],
            bulletActiveClass: "is-active",
            bulletClass: "swiper-bullet",
            bulletElement: "button",
            clickable: true
        },
        navigation: {
            nextEl: $(this).find(".swiper-next")[0],
            prevEl: $(this).find(".swiper-prev")[0],
            disabledClass: "is-disabled"
        },
        scrollbar: {
            el: $(".rm-tab-block.is-adv").find(".swiper-drag-wrapper")[0],
            draggable: true,
            dragClass: "swiper-drag",
            snapOnRelease: true
        },
        slideActiveClass: "is-active",
        slideDuplicateActiveClass: "is-active"
    });
});

// ------------ HOWLER ----------
// ------------ HOWLER ----------
// ------------ HOWLER ----------
// ------------ HOWLER ----------

let mainBtnSound = new Howl({
    src: [
        "https://assets.itsoffbrand.io/breeder-dao/audio/breederdao-ob-click-2.mp3"
    ],
    volume: 0.5
});

let largeBtnSound = new Howl({
    src: [
        "https://assets.itsoffbrand.io/breeder-dao/audio/breederdao-ob-click-3-edit.mp3"
    ],
    volume: 0
});

let largeBtnShuffle = new Howl({
    src: [
        "https://assets.itsoffbrand.io/breeder-dao/audio/breederdao-shuffle_1.mp3"
    ],
    volume: 0
});

let scanBtn = new Howl({
    src: [
        "https://assets.itsoffbrand.io/breeder-dao/audio/breederdao-scan_1-64.mp3"
    ],
    volume: 0.4
});

let subBtnSound = new Howl({
    src: [
        "https://assets.itsoffbrand.io/breeder-dao/audio/breederdao-ob-click-3.mp3"
    ],
    volume: 0.4
});

let ambience = new Howl({
    src: [
        "https://assets.itsoffbrand.io/breeder-dao/audio/breederdao-r-amb-all-low-128.mp3"
    ],
    loop: true,
    volume: 0.2
});

let menuOpenSound = new Howl({
    src: [
        "https://assets.itsoffbrand.io/breeder-dao/audio/breederdao-menu-open.mp3"
    ],
    volume: 0.4
});

let menuCloseSound = new Howl({
    src: [
        "https://assets.itsoffbrand.io/breeder-dao/audio/breederdao-menu-close.mp3"
    ],
    volume: 0.5
});

let obBtn = new Howl({
    src: [
        "https://assets.itsoffbrand.io/breeder-dao/audio/breederdao-site-tag-6.mp3"
    ],
    volume: 0.4
});

let ambVolume = ambience.volume();
var audioToggle = document.querySelector("[audio-toggle]");

$(
    ".nav-btn, .nav-link, .sh-trigger, .sh-trigger-item, .gp-trigger, .form-input, [audio-btn-slide], [audio-btn-sq]"
).on("mouseenter", function() {
    mainBtnSound.play();
});

$("[audio-btn], [scan-btn], [enter-btn]").on("mouseenter", function() {
    largeBtnShuffle.play();
});

$("[enter-btn]").on("click", function() {
    menuCloseSound.play();
});

$(
    ".nav-btn, .nav-link, .sh-trigger, .sh-trigger-item, .gp-trigger, .form-input, [audio-btn-slide], [audio-btn-sq], [audio-btn]"
).on("click", function() {
    largeBtnSound.play();
});

$("[ob-btn]").on("mouseenter", function() {
    obBtn.play();
});

$("[scan-btn]").on("click", function() {
    scanBtn.play();
    ambience.fade(ambience.volume(), 0.1, 500);
    setTimeout(function() {
        if (!document.hidden) {
            ambience.fade(ambience.volume(), 0.2, 1000);
        }
    }, 5000);
});

$(".nav-social-link, .swiper-drag").on("mouseenter", function() {
    subBtnSound.play();
});

$(audioToggle).on("click", function() {
    $(this).toggleClass("muted");
    if ($(this).hasClass("muted")) {
        Howler.mute(true);
    } else {
        Howler.mute(false);
    }
});

$(".no-sound").on("click", function() {
    setTimeout(function() {
        Howler.mute(true);
        audioToggle.classList.add("muted");
    }, 500);
});

mainBtnSound.on("unlock", function() {
    audioToggle.classList.remove("muted");
    largeBtnSound.fade(0, 0.4, 1000);
    largeBtnShuffle.fade(0, 0.16, 1000);
    ambience.play();
});

var ambDulls = document.querySelectorAll("[data-amb-dull]");
var isMuted = false;
var lastClicked = null;

for (var i = 0; i < ambDulls.length; i++) {
    ambDulls[i].addEventListener("click", function() {
        // If this is the first time a [data-amb-dull] element is clicked.
        if (!lastClicked) {
            ambience.fade(ambVolume, 0.1, 600);
            ambVolume = 0.1;
            isMuted = true;
            lastClicked = this;
        }
        // If the same [data-amb-dull] element is clicked twice.
        else if (lastClicked === this) {
            // If the ambience is muted, fade it in to 0.2 over 600 milliseconds.
            ambience.fade(ambVolume, 0.2, 600);
            ambVolume = 0.2;
            isMuted = false;
            lastClicked = null;
        }
        // If a different [data-amb-dull] element is clicked.
        else {
            ambience.fade(ambVolume, 0.1, 600);
            ambVolume = 0.1;
            isMuted = true;
            lastClicked = this;
        }
    });
}

$("[data-slide-dull]").click(function() {
    if (ambVolume > 0.05) {
        ambience.fade(ambVolume, 0.1, 600);
        ambVolume = 0.1;
    } else {
        ambience.fade(ambVolume, 0.2, 600);
        ambVolume = 0.2;
    }
});

$("[data-slide-uplift]").click(function() {
    if (ambVolume < 0.02) {
        ambience.fade(ambVolume, 0.1, 600);
        ambVolume = 0.1;
    } else {
        ambience.fade(ambVolume, 0.2, 600);
        ambVolume = 0.2;
    }
});

$("[sound-menu-toggle]").on("click", function() {
    if (navLinksWrap.classList.contains("is-open")) {
        menuCloseSound.play();
    } else {
        menuOpenSound.play();
    }
});

// Function to handle visibility changes
function handleVisibilityChange() {
    if (document.hidden) {
        ambience.fade(ambience.volume(), 0, 500);
        scanBtn.fade(scanBtn.volume(), 0, 500);
    } else {
        ambience.fade(ambience.volume(), 0.2, 1000);
        scanBtn.fade(scanBtn.volume(), 0.4, 1000);
    }
}

document.addEventListener("visibilitychange", handleVisibilityChange, false);