`use strict`;

const navigation = document.querySelector(`.navigation`);
const allLinks = [...document.querySelectorAll(`a`)];
const allFeatures = [...document.querySelectorAll(`.feature`)]
const allAboutImg = [...document.querySelectorAll(`.about--img`)];
const allPrices = [...document.querySelectorAll(`.price`)];
const allSections = [...document.querySelectorAll(`.section-need`)];
const navOpener = document.querySelector(`.nav-opener`);
const navMobile = document.querySelector(`.nav--mobile`)
const navLineTop = document.querySelector(`.line-top`);
const navLineMiddle = document.querySelector(`.line-middle`);
const navLineBottom = document.querySelector(`.line-bottom`)

// Preventing all link's defaullt behavior
document.body.addEventListener(`click`, function(e){
    if(allLinks.includes(e.target)) {
        e.preventDefault();
    }
    if(e.target.classList.contains(`btn--discover`)) {
        const id = e.target.getAttribute(`href`);
        document.querySelector(id).scrollIntoView({behavior: `smooth`})
    }
})

// Navigation Part
navigation.addEventListener(`click`, function(e){
    e.preventDefault();
    if(e.target.classList.contains(`nav__link`)) {
        const id = e.target.getAttribute(`href`);
        document.querySelector(id).scrollIntoView({behavior: `smooth`})
    }
})

// adding fade in effect to features
const revealEl = function(entries, observer) {
    entries.forEach((entry) => {
        if(entry.isIntersecting) {
            entry.target.classList.remove(`fadeIn-effect`)
            observer.unobserve(entry.target)
        }
    })
}
const featureObserver = new IntersectionObserver(revealEl, {
    root:null,
    threshold: .25,
})

// adding observer to els 
allFeatures.forEach((fet) => {
    featureObserver.observe(fet)
});
// adding fade in effect in about imgs

const revealImg = function(entries, observer) {
    const [entry] = entries;
    if(entry.isIntersecting) {
        const index = allAboutImg.indexOf(entry.target);
        entry.target.classList.remove(`img-fadeIn--${index+1}`);
        observer.unobserve(entry.target);
    }
}

const aboutImgObserver = new IntersectionObserver(revealImg, {
    root: null,
    threshold: .35,
})

// adding observer to images 
allAboutImg.forEach(img => aboutImgObserver.observe(img));

// adding fade in effect on prices
const priceObserver = new IntersectionObserver(revealEl.bind(allPrices), {
    root: null,
    threshold: .20,
})
allPrices.forEach(price => priceObserver.observe(price));

// adding color effect on nav
const navColorChange = function(entries, observer){
    const [entry] = entries;
    const id = entry.target.getAttribute(`id`);
    if(!entry.isIntersecting) {
        const navEl = document.querySelector(`a[href="#${id}"]`)
        navEl.style.color = ``;
    }
    if(entry.isIntersecting){
        const navEl = document.querySelector(`a[href="#${id}"]`)
        navEl.style.color = `rgb(255, 105, 130)`
    }
}

const sectionObserver = new IntersectionObserver(navColorChange, {
    root: null,
    threshold: .5,
})

allSections.forEach(section => sectionObserver.observe(section));

// setting up mobile nav
const navToggler = function() {
    navigation.classList.toggle(`nav-expand`);
    navLineTop.classList.toggle(`line-top-clicked`);
    navLineMiddle.classList.toggle(`line-opacity-0`);
    navLineBottom.classList.toggle(`line-bottom-clicked`);
}
const navCloser = function() {
    navigation.classList.remove(`nav-expand`);
    navLineTop.classList.remove(`line-top-clicked`);
    navLineMiddle.classList.remove(`line-opacity-0`);
    navLineBottom.classList.remove(`line-bottom-clicked`);    
}

navOpener.addEventListener(`click`, function(e) {
    e.preventDefault();
    navToggler();
})
navMobile.addEventListener(`click`, function(e) {
    e.preventDefault()
    if(e.target.classList.contains(`nav__link`)) {
        navToggler();
    }
})
document.addEventListener(`keydown`, function(e) {
    e.preventDefault();
    if(e.key === `Escape`) {
        navCloser();
    }
})