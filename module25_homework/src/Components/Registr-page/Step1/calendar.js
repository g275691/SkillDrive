export const calendar = () => {

    document.querySelectorAll(".ui-icon")[0].classList.remove("ui-icon");
    document.querySelector(".ui-icon-circle-triangle-w").innerText="";
    document.querySelector(".ui-datepicker-prev").classList.add("icon-arrow");
    document.querySelector(".icon-arrow").style.transform="rotate(90deg)";
    document.querySelector(".icon-arrow").style.color="green";

    document.querySelectorAll(".ui-icon")[0].classList.remove("ui-icon");
    document.querySelector(".ui-icon-circle-triangle-e").innerText="";
    document.querySelector(".ui-datepicker-next").classList.add("icon-arrow");
    document.querySelectorAll(".icon-arrow")[1].style.transform="rotate(-90deg)";
    document.querySelectorAll(".icon-arrow")[1].style.color="green";

}