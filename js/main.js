import { Users } from './Modules/Users.js';

let path = location.pathname

document.addEventListener('DOMContentLoaded', () => {

    if (path === "/" || path === "/connexion.html") {

        let loginSubmit = document.getElementById("loginSubmit")
        let viewPassword = document.getElementById("viewPassword")
        let password = document.getElementById("password")

        let message = document.getElementById("message")
        let btnSubmit = document.getElementById("btnSubmit")
        let email = document.getElementById("email")

        //Afficher et masquer le mot de passe
        viewPassword.addEventListener("click", () => {
            if (password.type === "password") {
                password.type = "text"
                viewPassword.innerHTML = `<i class="fa fa-eye-slash"></i>`
            } else {
                password.type = "password"
                viewPassword.innerHTML = `<i class="fa fa-eye"></i>`
            }
        })

        const user = new Users()
        user.Connexion(loginSubmit, password, message, btnSubmit, email)

    } else if (path === "/inscription.html") {

        let InscriptionSubmit = document.getElementById("InscriptionSubmit")
        let viewPassword = document.getElementById("viewPassword")
        let btnModal = document.getElementById("btnModal")
        let password = document.getElementById("password")

        let message = document.getElementById("message")
        let btnSubmit = document.getElementById("btnSubmit")
        let nom = document.getElementById("nom")
        let prenom = document.getElementById("prenom")
        let email = document.getElementById("email")

        //Afficher et masquer le mot de passe
        viewPassword.addEventListener("click", () => {
            if (password.type === "password") {
                password.type = "text"
                viewPassword.innerHTML = `<i class="fa fa-eye-slash"></i>`
            } else {
                password.type = "password"
                viewPassword.innerHTML = `<i class="fa fa-eye"></i>`
            }
        })

        const user = new Users()
        user.Inscription(InscriptionSubmit, password, message, btnSubmit, email, nom, prenom, btnModal)
        }
    })
