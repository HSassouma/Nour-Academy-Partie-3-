import './style.css'
import '@fortawesome/fontawesome-free/css/fontawesome.css'
import '@fortawesome/fontawesome-free/css/solid.css'
import { afficherApprenants,afficherFormulaire,ajouterEleve,ajouterNote,fermerFormulaire,filtrerApprenants, marquerAbsent  } from './script.js'
afficherApprenants()
const inputRecherche=document.querySelector("#recherche")
const selectGroup= document.querySelector("#selectGroup")
inputRecherche.addEventListener("input",filtrerApprenants)
selectGroup.addEventListener("change",filtrerApprenants) ;

const selectTri= document.querySelector("#triEtudiants")
selectTri.addEventListener("change",filtrerApprenants) ;

const container=document.querySelector("#container")
container.addEventListener("click",(event)=>{
    const btn=event.target.closest("button")
    if(!btn) return 
    const id=btn.dataset.id
    const action=btn.dataset.action
    if(action==="absent"){
        marquerAbsent(id)
    }
     else if(action==="note"){
        const ligne=btn.closest("[data-row-id]")
        const input=ligne.querySelector("input")
        ajouterNote(id,input.value)
    }
})

const btnOuvrirForm = document.querySelector("#btnAjouterEleve")
const btnFermerForm = document.querySelector("#btnFermerForm")
const formAjouterEleve = document.querySelector("#formAjouterEleve")
btnOuvrirForm.addEventListener("click", afficherFormulaire)
btnFermerForm.addEventListener("click", fermerFormulaire)
formAjouterEleve.addEventListener("submit", (event) => {
    event.preventDefault()
    ajouterEleve()
})


