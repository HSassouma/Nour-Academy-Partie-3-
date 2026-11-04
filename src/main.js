import './style.css'
import '@fortawesome/fontawesome-free/css/fontawesome.css'
import '@fortawesome/fontawesome-free/css/solid.css'
import { afficherApprenants,filtrerApprenants, marquerAbsent  } from './script.js'
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
})

