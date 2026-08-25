document.addEventListener('DOMContentLoaded', () => {

    // 1. Enable animation mode once JS is ready
    document.documentElement.classList.add('js-enabled');

    // 2. Intersection Observer for Smooth Reveal
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.05,
            rootMargin: '0px 0px -20px 0px'
        };

        const scrollObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(el => scrollObserver.observe(el));
    } else {
        animatedElements.forEach(el => el.classList.add('visible'));
    }

    // 3. Slider Carousel Controls
    const sliderTrack = document.getElementById('sliderTrack');
    const prevBtn = document.getElementById('slideLeft');
    const nextBtn = document.getElementById('slideRight');

    if (sliderTrack && prevBtn && nextBtn) {
        const step = 295;
        nextBtn.addEventListener('click', () => sliderTrack.scrollBy({ left: step, behavior: 'smooth' }));
        prevBtn.addEventListener('click', () => sliderTrack.scrollBy({ left: -step, behavior: 'smooth' }));
    }

    // 4. Menu Filtering
    const filterTabs = document.querySelectorAll('.filter-tabs .tab-btn');
    const menuCards = document.querySelectorAll('.menu-card');

    if (filterTabs.length > 0 && menuCards.length > 0) {
        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                filterTabs.forEach(btn => btn.classList.remove('active'));
                tab.classList.add('active');

                const targetCategory = tab.getAttribute('data-category');

                menuCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (targetCategory === 'all' || cardCategory === targetCategory) {
                        card.classList.remove('is-hidden');
                    } else {
                        card.classList.add('is-hidden');
                    }
                });
            });
        });
    }
});