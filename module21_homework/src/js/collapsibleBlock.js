

export function collapsibleQuestions () {

    document.querySelectorAll(".questions__container-rect").forEach(el => {
        el.addEventListener("click", function () {
            if (!this.nextSibling.classList.contains("is-active")) {
                this.classList.add("is-active");
                this.nextSibling.style.maxHeight = this.nextSibling.scrollHeight + "px";
                this.querySelector(":last-child").classList.add("is-active");
            } else {
                this.classList.remove("is-active");
                this.nextSibling.style.maxHeight = 0;
                this.querySelector(":last-child").classList.remove("is-active");
            }
            this.nextSibling.classList.toggle("is-active");
        });
    });
}