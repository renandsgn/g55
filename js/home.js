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

document.addEventListener('DOMContentLoaded', () => {
    initFixedSectionBackground();
});
