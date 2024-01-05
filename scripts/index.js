gsap.registerPlugin(ScrollTrigger);

const IO = (item, options) => {
    return new Promise((resolve, reject) => {
        const observer = new window.IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const elem = item.querySelectorAll(".char");
                    gsap.to(elem, {
                        opacity: 1,
                        yPercent: 0,
                        stagger: elem.length > 100 ? 0.01 : 0.02,
                        duration: elem.length > 100 ? 0.5 : 0.6,
                        ease: "easeOut",
                        delay: .7,
                    });
                } else {
                    gsap.to(entry.target.querySelectorAll(".char"), {
                        opacity: 0,
                        yPercent: 200,
                        transformStyle: "preserve-3d",
                    });
                }
            });
        }, options);
        observer.observe(item);
    });
};

const section1 = document.querySelector(".section1");
const section2 = document.querySelector(".section2");

const split = () => {
    const H = document.querySelectorAll("[data-animation='header']");

    H.forEach((item) => {
        let section = item.parentElement.dataset.section
        Splitting({
            target: item,
            by: "chars",
        });
        gsap.set(item.querySelectorAll(".char"), {
            opacity: 0,
            yPercent: 200,
            transformStyle: "preserve-3d",
        });
        IO(section === "1" ? section1 : section2 , {
            threshold: 0.7,
        })
    });
};

split();