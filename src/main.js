import './style.css'
import '@fortawesome/fontawesome-free/css/fontawesome.css'
import '@fortawesome/fontawesome-free/css/solid.css'
import { afficherApprenants,filtrerApprenants  } from './script.js'
afficherApprenants()
const inputRecherche=document.querySelector("#recherche")
const selectGroup= document.querySelector("#selectGroup")
inputRecherche.addEventListener("input",filtrerApprenants)
selectGroup.addEventListener("change",filtrerApprenants) ;

const selectTri= document.querySelector("#triEtudiants")
selectTri.addEventListener("change",filtrerApprenants) ;

