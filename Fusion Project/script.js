const cardContainer = document.querySelector('.card-container');
const dots = document.querySelectorAll('.dot');
const cards = document.querySelectorAll('.card');
let currentSlide = 0;
const totalSlides = 4;
let autoSlideInterval;
let flipInterval;

function goToSlide(index) {
    currentSlide = index;
    const offset = -100 * currentSlide;
    cardContainer.style.transform = `translateX(${offset}%)`;

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
    cards.forEach(card => card.classList.remove('flipped'));

    clearInterval(flipInterval);
    startFlipInterval();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
}

function startFlipInterval() {
    flipInterval = setInterval(() => {
        cards[currentSlide].classList.toggle('flipped');
    }, 8000);
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 20000);
}

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        const slideIndex = parseInt(dot.getAttribute('data-slide'));
        goToSlide(slideIndex);

        clearInterval(autoSlideInterval);
        startAutoSlide();
    });
});

cards.forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
});
startFlipInterval();
startAutoSlide();