//Burger-menu

const mobileBurger = document.querySelector(".mobile__burger"),
    mobileMenu = document.querySelector(".mobile__wrapper"),
    burgerComponents = document.querySelectorAll(".mobile__burger-rect");

function menuActivation () {
    if(mobileBurger.classList.contains('is-active')) {
        burgerComponents.forEach((el,i) => {
        el.style.animation = `rect-${i} 1s ease-in-out both`; })
        mobileBurger.classList.toggle('is-active');
        mobileMenu.classList.toggle("is-active");
    } else {
        burgerComponents.forEach((el,i) => {
        el.style.animation = `rect-${i+3} 0.8s ease-out both reverse`; })
        mobileBurger.classList.toggle('is-active');
        mobileMenu.classList.toggle("is-active");
    }
}

mobileBurger.addEventListener("click", menuActivation)

//Collapsible-block

const rectsQuestions = document.querySelectorAll(".questions__container-rect"),
    answers = document.querySelectorAll(".questions__container-answer"),
    arrowsQuestions = document.querySelectorAll(".icon-arrow");

rectsQuestions.forEach((el,i) => {
    el.addEventListener("click", function(){
        if(!answers[i].classList.contains("is-active")) {
            el.classList.add("is-active");
            answers[i].style.maxHeight = answers[i].scrollHeight + "px";
            arrowsQuestions[i].classList.add("is-active");
        } else {
            el.classList.remove("is-active");
            answers[i].style.maxHeight = 0;
            arrowsQuestions[i].classList.remove("is-active");
        }
        answers[i].classList.toggle("is-active");
    })
});