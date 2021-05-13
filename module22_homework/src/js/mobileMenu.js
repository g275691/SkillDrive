const mobileBurger = document.querySelector(".mobile__burger"),
    mobileMenu = document.querySelector(".mobile__wrapper"),
    burgerComponents = document.querySelectorAll(".mobile__burger-rect");

export function menuActivation() {
    mobileBurger.addEventListener("click", function () {
        if (mobileBurger.classList.contains('is-active')) {
            burgerComponents.forEach((el, i) => {
                el.style.animation = `rect-${i} 1s ease-in-out both`;
            });
            mobileBurger.classList.toggle('is-active');
            mobileMenu.classList.toggle("is-active");
        } else {
            burgerComponents.forEach((el, i) => {
                el.style.animation = `rect-${i + 3} 0.8s ease-out both reverse`;
            });
            mobileBurger.classList.toggle('is-active');
            mobileMenu.classList.toggle("is-active");
        }
    });
}

