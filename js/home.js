const initFixedSectionBackground = () => {
    const root = document.documentElement;
    const scrollLimit = 216;
    let isFixed = null;
    let ticking = false;

    const updateBackgroundState = () => {
        const shouldBeFixed = window.scrollY >= scrollLimit;

        if (shouldBeFixed !== isFixed) {
            root.classList.toggle('is-fixed-section-bg', shouldBeFixed);
            isFixed = shouldBeFixed;
        }

        ticking = false;
    };

    const handleScroll = () => {
        if (ticking) {
            return;
        }

        ticking = true;
        window.requestAnimationFrame(updateBackgroundState);
    };

    updateBackgroundState();
    window.addEventListener('scroll', handleScroll, { passive: true });
};

const initPropositoNavMarquee = () => {
    const nav = document.querySelector('.proposito-g55__nav');

    if (!nav) {
        return;
    }

    const getVisibleCount = () => {
        if (window.matchMedia('(max-width: 1200px)').matches) {
            return 4;
        }

        if (window.matchMedia('(max-width: 1920px)').matches) {
            return 5;
        }

        return 8;
    };

    const getMinGap = () => {
        if (window.matchMedia('(max-width: 500px)').matches) {
            return 24;
        }

        return 8;
    };

    let resizeTimer = null;

    const updateSpacing = () => {
        const visibleCount = getVisibleCount();
        const firstGroup = nav.querySelector('.proposito-g55__nav-group');

        if (!firstGroup) {
            return;
        }

        const visibleWords = Array.from(firstGroup.querySelectorAll('span')).slice(0, visibleCount);
        const navWidth = nav.getBoundingClientRect().width;
        const wordsWidth = visibleWords.reduce((total, word) => total + word.getBoundingClientRect().width, 0);
        const minGap = getMinGap();
        const groupWidth = Math.max(navWidth, wordsWidth + (minGap * visibleCount));
        const gap = Math.max(minGap, (groupWidth - wordsWidth) / visibleCount);

        nav.style.setProperty('--proposito-nav-gap', `${gap.toFixed(2)}px`);
        nav.style.setProperty('--proposito-nav-edge', `${(gap / 2).toFixed(2)}px`);
        nav.style.setProperty('--proposito-nav-group-width', `${groupWidth.toFixed(2)}px`);
        nav.style.setProperty('--proposito-nav-shift', `-${groupWidth.toFixed(2)}px`);
    };

    const handleResize = () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(updateSpacing, 120);
    };

    updateSpacing();
    window.addEventListener('resize', handleResize, { passive: true });

    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(updateSpacing);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initFixedSectionBackground();
    initPropositoNavMarquee();
});
