const btnModal = document.getElementById("btn-modal")
const btnClose = document.getElementById("btn-close-modal")

btnModal.addEventListener("click", () => {
    const modal = document.querySelector(".container-modal")
    modal.style.display = "flex";
})

btnClose.addEventListener("click", () => {
    const modal = document.querySelector(".container-modal")
    modal.style.display = "none";
})
