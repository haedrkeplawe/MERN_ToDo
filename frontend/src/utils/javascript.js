export const fillterFun = (id) => {
    const boxs = document.querySelectorAll(".box")
    const buttons = document.querySelectorAll(".fillter button")
    boxs.forEach(box => {
        box.style.display = "flex"
        if (id === "active" && box.className.includes("completed")) {
            box.style.display = "none"
        } else if (id === "completed" && !box.className.includes("completed")) {
            box.style.display = "none"
        }
    });
    buttons.forEach(button => {
        button.className = ""
        if (button.id === id) {
            button.className = "active"
        }
    })
}