const mobileBurger = document.querySelector(".mobile__burger"),
    mobileMenu = document.querySelector(".mobile__wrapper");

mobileBurger.addEventListener("click", function () {
    if(mobileBurger.classList.contains('is-active')) {
        document.querySelectorAll(".mobile__burger-rect").forEach((el,i) => {
        el.style.animation = `rect-${i} 1s ease-in-out both`; })
        mobileBurger.classList.toggle('is-active');
        mobileMenu.classList.toggle("is-active");
    } else {
        document.querySelectorAll(".mobile__burger-rect").forEach((el,i) => {
        el.style.animation = `rect-${i+3} 0.8s ease-out both reverse`; })
        mobileBurger.classList.toggle('is-active');
        mobileMenu.classList.toggle("is-active");
    }
})

document.querySelectorAll(".questions__container-rect").forEach((el,i) => {
    el.addEventListener("click", function(){
        if(!document.querySelectorAll(".questions__container-answer")[i].classList.contains("is-active")) {
            el.classList.add("is-active");
            document.querySelectorAll(".questions__container-answer")[i].style.maxHeight = document.querySelectorAll(".questions__container-answer")[i].scrollHeight + "px";
            document.querySelectorAll(".icon-arrow")[i].classList.add("is-active");
        } else {
            el.classList.remove("is-active");
            document.querySelectorAll(".questions__container-answer")[i].style.maxHeight = 0;
            document.querySelectorAll(".icon-arrow")[i].classList.remove("is-active");
        }
        document.querySelectorAll(".questions__container-answer")[i].classList.toggle("is-active");
    })
});


