export class Users {
    constructor() {
        this.name = ""
        this.email = ""
    }

    //Methode inscription
    Inscription(InscriptionSubmit, password, message, btnSubmit, email, nom, prenom, btnModal) {
        InscriptionSubmit.addEventListener("submit", (e) => {
            e.preventDefault() 
    
            //On fait patienter l'utilisateur
            btnSubmit.classList.replace("btn-info", "btn-warning")
            btnSubmit.innerHTML = `<i class="fa fa-spin fa-spinner"></i> Traitement en cours...`
    
            message.innerHTML = "" //On vide d'abord le message d'erreur
            message.style.display = "none"
    
            //On test si les champs sont bien rempli
            let test = (nom.value !== "" && prenom.value !== "" && email.value !== "" && password.value !== "") ? true : false

            if (!test) {
                //On attentd 2ms avant d'afficher l'erreur
                setTimeout(() => {
                    message.innerHTML = "Veuillez remplir tous les champs"
                    message.style.display = "block"
                    btnSubmit.classList.replace("btn-warning", "btn-primary")
                    btnSubmit.innerHTML = "Créer un compte"
                }, 1000);
            } else {
                //On recupére les données dans le localStorage
                let table = JSON.parse(localStorage.getItem("utilisateurs")) || []
    
                //Générons les id des utilisateurs en utilisant la fonction Math.random()
                let id = Math.random().toString(30)
                //On stock les données en localStorage
                table.push({ 
                    id: id, 
                    nom: nom.value + " " + prenom.value, 
                    email: email.value, 
                    password: password.value 
                })
                localStorage.setItem("utilisateurs", JSON.stringify(table))
                setTimeout(() => {
                    btnModal.click() //Ouvre le modal de success
                    btnSubmit.classList.replace("btn-warning", "btn-primary")
                    btnSubmit.innerHTML = "Créer un compte"
                    InscriptionSubmit.reset() //La propriété reset permet de vider le formulaire
                }, 2000)
            }
        })
    }

    
    //Connexion
    Connexion(loginSubmit, password, message, btnSubmit, email) {
       
        //Exutons notre formulaire
        loginSubmit.addEventListener("submit", (e) => {
            e.preventDefault() // preventDefault() empêche que la page soit rafraichi lorsque on soumet le formulaire

            //On fait patienter l'utilisateur
            btnSubmit.classList.replace("btn-info", "btn-warning")
            btnSubmit.innerHTML = `<i class="fa fa-spin fa-spinner"></i> Traitement en cours...`

            message.innerHTML = "" //On vide d'abord le message d'erreur
            message.style.display = "none"

            //On test si les champs sont bien rempli
            let test = (email.value !== "" && password.value !== "") ? true : false

            if (!test) {
                //On attentd 2ms avant d'afficher l'erreur
                setTimeout(() => {
                    message.innerHTML = "Email et mot de passe requis"
                    message.style.display = "block"
                    btnSubmit.classList.replace("btn-warning", "btn-primary")
                    btnSubmit.innerHTML = "Se connecter"
                }, 1000);
            } else {
                //On recupére les données dans le localStorage
                let table = JSON.parse(localStorage.getItem("utilisateurs")) || []

                if (table && table.length > 0) {
                    //On test si les valeurs saisis correspondent à ce que nous avons dans la BD
                    let testUser = table.find(index => index.email === email.value && index.password === password.value)
                    if (testUser !== undefined) {
                        localStorage.setItem("userID", testUser.id) 
                        location.href = "/chat.html" //On redirige l'utilisateur vers la page profil.html lorsque la connexion est reussi
                    } else {
                        setTimeout(() => {
                            message.innerHTML = "Email ou mot passe incorrect"
                            message.style.display = "block"
                            btnSubmit.classList.replace("btn-warning", "btn-primary")
                            btnSubmit.innerHTML = "Se connecter"
                        }, 2000)
                    }
                } else {
                    //Le tableau est vide
                    setTimeout(() => {
                        message.innerHTML = "Ce compte n'existe pas"
                        message.style.display = "block"
                        btnSubmit.classList.replace("btn-warning", "btn-primary")
                        btnSubmit.innerHTML = "Se connecter"
                    }, 2000)
                }
            }
        })
    }

}