const addButtons = document.querySelectorAll(".add-button");
const formContainer = document.getElementById("form-container");

addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    formContainer.style.display = "block";
  });
});