document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector(".modal");
  const btnClose = document.querySelector(".btn-close");
  const btnSubmit = document.querySelector(".btn-submit");

  const btnConnect = document.querySelector("#connect");
  const responseText = document.querySelector("#response");

  btnConnect.addEventListener("click", () => {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";

    // set input fields to empty
    document.querySelectorAll("input").forEach((item) => (item.value = ""));

    document.querySelector("#message").value = "";

    responseText.style.display = "none";
  });

  btnClose.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "scroll";
  });
  // const form = document.querySelector("form");

  btnSubmit.addEventListener("click", async (event) => {
    event.preventDefault();
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;

    const email = document.querySelector("#email").value;
    const subject = document.querySelector("#subject").value;

    const message = document.querySelector("#message").value;

    // Do some validation check
    if (!firstName || !lastName || !email || !message) {
      const responseText = document.querySelector("#response");

      responseText.textContent = "Champs obligatoires manquant !";
      responseText.style.display = "inline";
      responseText.style.color = "red";
    } else {
      const dataToSend = {
        firstName,
        lastName,
        email,
        subject,
        message,
      };
      // console.log(dataToSend);

      try {
        const response = await axios.post(
          //   "http://localhost:3000/form",
          "https://site--form-contact-backend--25428jw7g85y.code.run/form",
          dataToSend
        );

        if (response.data) {
          responseText.textContent = "Formulaire soumis avec succés !";
          responseText.style.display = "inline";
          responseText.style.color = "green";

          document
            .querySelectorAll("input")
            .forEach((item) => (item.value = ""));

          document.querySelector("#message").value = "";
          setTimeout(() => {
            responseText.style.display = "none";
            //   modal.style.display = "none";
          }, 5000);
        }
      } catch (error) {
        responseText.textContent = "Erreur : Echec de soumission";
        responseText.style.display = "inline";
        setTimeout(() => {
          responseText.style.display = "none";
          //   modal.style.display = "none";
        }, 5000);
      }
    }
  });
});
