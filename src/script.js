
import { eleves, groupes } from "./data.js";

function calculerMoyenne(aprenant) {
  let somme = 0;

  aprenant.notes.forEach((note) => {
    somme += note;
  });

  if (aprenant.notes.length === 0) {
    return null;
  }

  return somme / aprenant.notes.length;
}

export function afficherBilan() {
  const conteneurMoyennes = document.querySelector("#moyenneGroupe");
  const conteneurParents = document.querySelector("#parentsAAppeler");
  const totalAbsences = document.querySelector("#totalAbsences");
  const nombreAlertes = document.querySelector("#nombreAlertes");

  conteneurMoyennes.textContent = "";
  conteneurParents.textContent = "";

  const elevesEnAlerte = eleves.filter((eleve) => eleve.absences >= 3);

  nombreAlertes.textContent = elevesEnAlerte.length;
  totalAbsences.textContent = eleves.reduce(
    (total, eleve) => total + eleve.absences,
    0,
  );

  groupes.forEach((groupe) => {
    const elevesDuGroupe = eleves.filter(
      (eleve) => eleve.groupeId === groupe.id,
    );

    const moyennes = elevesDuGroupe
      .map((eleve) => calculerMoyenne(eleve))
      .filter((moyenne) => moyenne !== null);

    let moyenneDuGroupe = "—";

    if (moyennes.length > 0) {
      const somme = moyennes.reduce((total, moyenne) => total + moyenne, 0);
      moyenneDuGroupe = (somme / moyennes.length).toFixed(1) + "/20";
    }

    const ligneMoyenne = document.createElement("div");
    ligneMoyenne.classList.add(
      "flex",
      "items-center",
      "justify-between",
      "gap-2",
    );

    const nomGroupe = document.createElement("span");
    nomGroupe.textContent = groupe.nom;
    nomGroupe.classList.add("text-sm", "text-[#65716A]");

    const valeurMoyenne = document.createElement("span");
    valeurMoyenne.textContent = moyenneDuGroupe;
    valeurMoyenne.classList.add(
      "text-sm",
      "font-semibold",
      "text-[#174A3A]",
    );

    ligneMoyenne.append(nomGroupe, valeurMoyenne);
    conteneurMoyennes.append(ligneMoyenne);

    const blocGroupe = document.createElement("div");
    blocGroupe.classList.add("flex", "flex-col", "gap-1");

    const titreGroupe = document.createElement("p");
    titreGroupe.textContent = groupe.nom;
    titreGroupe.classList.add(
      "text-sm",
      "font-semibold",
      "text-[#174A3A]",
    );

    blocGroupe.append(titreGroupe);

    const alertesDuGroupe = elevesDuGroupe
      .filter((eleve) => eleve.absences >= 3)
      .map((eleve) => ({
        nomComplet: eleve.prenom + " " + eleve.nom,
        telephone: eleve.telephoneParent,
      }));

    const aucunEleveEnAlerte = elevesDuGroupe.every(
      (eleve) => eleve.absences < 3,
    );

    if (aucunEleveEnAlerte) {
      const message = document.createElement("p");
      message.textContent = "Aucun élève en alerte";
      message.classList.add("text-sm", "text-[#65716A]");
      blocGroupe.append(message);
    } else {
      alertesDuGroupe.forEach((alerte) => {
        const information = document.createElement("p");
        information.textContent =
          alerte.nomComplet + " — " + alerte.telephone;
        information.classList.add("text-sm", "text-[#65716A]");
        blocGroupe.append(information);
      });
    }

    conteneurParents.append(blocGroupe);
  });
}

export function creeLigne(aprenant) {
  const lign = document.createElement("div");

  lign.classList.add(
    "flex",
    "flex-wrap",
    "items-center",
    "justify-between",
    "gap-3",
    "rounded-xl",
    "border-3",
    "border-[#E6F0E9]",
    "bg-white",
    "p-4",
    "transition-colors",
    "duration-200",
    "hover:bg-[#FAF8F2]",
    "m-3",
  );

  lign.dataset.rowId = aprenant.id;

  if (aprenant.absences >= 3) {
    lign.classList.remove(
      "border-[#E6F0E9]",
      "bg-white",
      "hover:bg-[#FAF8F2]",
    );

    lign.classList.add("border-red-200", "bg-red-50", "hover:bg-red-100");
  }

  const info = document.createElement("div");
  info.classList.add("flex", "items-center", "gap-3", "min-w-0");

  const icon = document.createElement("i");
  icon.classList.add(
    "fa-solid",
    "fa-user",
    "flex!",
    "h-10",
    "w-10!",
    "shrink-0",
    "items-center",
    "justify-center",
    "rounded-full",
    "bg-[#E6F0E9]",
    "text-[#174A3A]",
    "text-base",
  );

  const btnAbsent = document.createElement("button");
  btnAbsent.textContent = "Absent";
  btnAbsent.dataset.id = aprenant.id;
  btnAbsent.dataset.action = "absent";

  btnAbsent.classList.add(
    "rounded-lg",
    "border",
    "border-[#E6F0E9]",
    "bg-[#FAF8F2]",
    "px-3",
    "py-2",
    "text-xs",
    "font-medium",
    "text-[#174A3A]",
    "transition-colors",
    "hover:bg-[#E6F0E9]",
  );

  const inputNote = document.createElement("input");
  inputNote.type = "number";
  inputNote.min = "0";
  inputNote.max = "20";
  inputNote.dataset.id = aprenant.id;
  inputNote.placeholder = "Note";

  inputNote.classList.add(
    "w-20",
    "rounded-lg",
    "border",
    "border-[#E6F0E9]",
    "bg-white",
    "px-2",
    "py-2",
    "text-sm",
    "outline-none",
    "focus:border-[#174A3A]",
  );

  const btnNote = document.createElement("button");
  btnNote.textContent = "Ajouter";
  btnNote.dataset.id = aprenant.id;
  btnNote.dataset.action = "note";

  btnNote.classList.add(
    "rounded-lg",
    "bg-[#174A3A]",
    "px-3",
    "py-2",
    "text-xs",
    "font-medium",
    "text-white",
    "transition-colors",
    "hover:bg-[#23634D]",
  );

  const actions = document.createElement("div");
  actions.classList.add(
    "flex",
    "flex-wrap",
    "items-center",
    "gap-2",
  );

  const h2 = document.createElement("h2");
  h2.textContent = aprenant.nom + " " + aprenant.prenom;

  h2.classList.add(
    "truncate",
    "text-sm",
    "font-semibold",
    "text-[#1D2924]",
    "sm:text-base",
  );

  const details = document.createElement("div");
  details.classList.add(
    "flex",
    "shrink-0",
    "items-center",
    "gap-4",
    "sm:gap-8",
  );

  const p = document.createElement("p");
  const moyenne = calculerMoyenne(aprenant);

  p.textContent = moyenne === null ? "—" : moyenne.toFixed(1) + "/20";

  p.classList.add(
    "text-sm",
    "font-semibold",
    "text-[#174A3A]",
    "sm:text-base",
  );

  const absences = document.createElement("p");

  const blocNom = document.createElement("div");
  blocNom.classList.add("flex", "flex-col", "gap-1", "min-w-0");
  blocNom.append(h2);

  if (aprenant.absences >= 3) {
    const message = document.createElement("span");
    message.textContent = "Prévenir les parents";

    message.classList.add(
      "w-fit",
      "rounded-full",
      "border",
      "border-red-200",
      "bg-white",
      "px-2.5",
      "py-0.5",
      "text-xs",
      "font-medium",
      "text-red-700",
    );

    blocNom.append(message);
  }

  absences.textContent = aprenant.absences + " absences";

  absences.classList.add(
    "whitespace-nowrap",
    "rounded-full",
    "bg-[#FAF8F2]",
    "px-3",
    "py-1.5",
    "text-xs",
    "font-medium",
    "text-[#65716A]",
    "sm:text-sm",
  );

  info.append(icon, blocNom);
  details.append(p, absences);
  actions.append(btnAbsent, inputNote, btnNote);
  lign.append(info, details, actions);

  return lign;
}

export function triNom(tab) {
  return tab.slice().sort((a, b) => a.nom.localeCompare(b.nom, "fr"));
}

export function triMoyenne(tab) {
  return tab.slice().sort((a, b) => {
    const moyenneA = calculerMoyenne(a);
    const moyenneB = calculerMoyenne(b);

    if (moyenneA === null && moyenneB === null) {
      return 0;
    }

    if (moyenneA === null) {
      return 1;
    }

    if (moyenneB === null) {
      return -1;
    }

    return moyenneB - moyenneA;
  });
}

export function afficherApprenants(tab) {
  const contenair = document.querySelector("#container");
  contenair.innerHTML = "";

  let arr = tab ?? eleves;

  document.querySelector("#nombreEtudiants").textContent =
    `${arr.length} / ${eleves.length} étudiants`;

  arr.forEach((eleve) => {
    contenair.append(creeLigne(eleve));
  });
}

export function filtrerApprenants() {
  const rechercheValue = document
    .querySelector("#recherche")
    .value.toLowerCase();

  const valueselect = document.querySelector("#selectGroup").value;

  let result = eleves.filter((eleve) => {
    const nom = eleve.nom.toLowerCase();
    const prenom = eleve.prenom.toLowerCase();

    const recherche =
      nom.includes(rechercheValue) || prenom.includes(rechercheValue);

    const groupe =
      valueselect === "" || eleve.groupeId === Number(valueselect);

    return recherche && groupe;
  });

  const tri = document.querySelector("#triEtudiants").value;

  if (tri === "nom") {
    result = triNom(result);
  } else if (tri === "moyenne") {
    result = triMoyenne(result);
  }

  afficherApprenants(result);
}

export function marquerAbsent(id) {
  const eleve = eleves.find((a) => a.id === Number(id));

  if (!eleve) return;

  eleve.absences++;

  const ancienneLigne = document.querySelector(
    `[data-row-id="${id}"]`
  );

  if (ancienneLigne) {
    ancienneLigne.replaceWith(creeLigne(eleve));
  }

  afficherBilan();
}

export function ajouterNote(id, value) {
  const eleve = eleves.find((a) => a.id === Number(id));

  if (!eleve) return;

  const note = Number(value);

  if (
    value.trim() === "" ||
    note < 0 ||
    note > 20
  ) {
    alert("Veuillez entrer une note entre 0 et 20.");
    return;
  }

  eleve.notes.push(note);

  filtrerApprenants();
  afficherBilan();
}

const formulaireContainer=document.querySelector("#formulaireContainer")
export function afficherFormulaire() {
  formulaireContainer.classList.remove("hidden");
}
export function fermerFormulaire() {
  formulaireContainer.classList.add("hidden");
}

export function ajouterEleve(){
  const regexNom = /^[A-Za-zÀ-ÿ\s-]{2,}$/
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const regexTelephone = /^(06|07)\d{8}$|^\+212[67]\d{8}$/
  const prenom = document.querySelector("#prenom")
const nom = document.querySelector("#nom")
const groupe = document.querySelector("#groupe")
const emailParent = document.querySelector("#emailParent")
const telephoneParent = document.querySelector("#telephoneParent")
const erreurPrenom = document.querySelector("#erreurPrenom")
const erreurNom = document.querySelector("#erreurNom")
const erreurEmail = document.querySelector("#erreurEmail")
const erreurTelephone = document.querySelector("#erreurTelephone")
const prenomValide = regexNom.test(prenom.value.trim())
const nomValide = regexNom.test(nom.value.trim())
const emailValide = regexEmail.test(emailParent.value.trim())
const telephoneValide = regexTelephone.test(telephoneParent.value.trim())
if (prenomValide) {
    erreurPrenom.textContent = "Prénom valide"
    erreurPrenom.classList.add("text-green-600")
    erreurPrenom.classList.remove("text-red-600")
    prenom.classList.add("border-green-500")
    prenom.classList.remove("border-red-500")
} else {
    erreurPrenom.textContent = "Prénom invalide (2 lettres minimum)"
    erreurPrenom.classList.add("text-red-600")
    erreurPrenom.classList.remove("text-green-600")
    prenom.classList.add("border-red-500")
    prenom.classList.remove("border-green-500")
}
if (nomValide) {
    erreurNom.textContent = "Nom valide"
    erreurNom.classList.add("text-green-600")
    erreurNom.classList.remove("text-red-600")
    nom.classList.add("border-green-500")
    nom.classList.remove("border-red-500")
} else {
    erreurNom.textContent = "Nom invalide (2 lettres minimum)"
    erreurNom.classList.add("text-red-600")
    erreurNom.classList.remove("text-green-600")
    nom.classList.add("border-red-500")
    nom.classList.remove("border-green-500")
}
if (emailValide) {
    erreurEmail.textContent = "Email valide"
    erreurEmail.classList.add("text-green-600")
    erreurEmail.classList.remove("text-red-600")
    emailParent.classList.add("border-green-500")
    emailParent.classList.remove("border-red-500")
} else {
    erreurEmail.textContent = "Email invalide"
    erreurEmail.classList.add("text-red-600")
    erreurEmail.classList.remove("text-green-600")
    emailParent.classList.add("border-red-500")
    emailParent.classList.remove("border-green-500")
}
if (telephoneValide) {
    erreurTelephone.textContent = "Téléphone valide"
    erreurTelephone.classList.add("text-green-600")
    erreurTelephone.classList.remove("text-red-600")
    telephoneParent.classList.add("border-green-500")
    telephoneParent.classList.remove("border-red-500")
} else {
    erreurTelephone.textContent = "Format invalide (06/07 ou +212)"
    erreurTelephone.classList.add("text-red-600")
    erreurTelephone.classList.remove("text-green-600")
    telephoneParent.classList.add("border-red-500")
    telephoneParent.classList.remove("border-green-500")
}
const validations = [ prenomValide, nomValide,emailValide,telephoneValide,]

const formulaireValide = validations.every(validation => validation === true)
if (!formulaireValide) {
    return
}
  const nouveauEleve = {
    id: eleves.length+1,
    prenom: prenom.value.trim(),
    nom: nom.value.trim(),
    groupeId: Number(groupe.value),
    emailParent: emailParent.value.trim(),
    telephoneParent: telephoneParent.value.trim(),
    absences: 0,
    notes: []
}
const eleveExiste = eleves.some(eleve =>
    eleve.prenom.toLowerCase() === nouveauEleve.prenom.toLowerCase() &&
    eleve.nom.toLowerCase() === nouveauEleve.nom.toLowerCase() &&
    eleve.groupeId === nouveauEleve.groupeId
)
if (eleveExiste) {
    alert("Cet élève existe déjà dans ce groupe")
    return
}
const nombreEleves = eleves.filter(eleve =>
    eleve.groupeId === nouveauEleve.groupeId
).length

if (nombreEleves >= 15) {
    alert("Ce groupe est complet (15 élèves maximum)")
    return
}
eleves.push(nouveauEleve)
filtrerApprenants()
afficherBilan()
document.querySelector("#formAjouterEleve").reset()
setTimeout(() => {
  fermerFormulaire();
}, 1000);
}