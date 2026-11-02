import { eleves, groupes } from "./data.js";
export function creeLigne(aprenant) {
  const lign = document.createElement("div");
  lign.classList.add(
    "flex",
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
  let somme = 0;
  let moyenne = "—";

  aprenant.notes.forEach((e) => {
    somme += e;
  });

  if (aprenant.notes.length > 0) {
    moyenne = (somme / aprenant.notes.length).toFixed(1);
  }

  p.textContent = moyenne === "—" ? "—" : moyenne + "/20";
  p.classList.add("text-sm", "font-semibold", "text-[#174A3A]", "sm:text-base");

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
      "bg-red-50",
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
  lign.append(info, details);

  return lign;
}

export function afficherApprenants(tab) {
  const contenair = document.querySelector("#container");
  contenair.innerHTML = "";
  let arr = tab ?? eleves;
  arr.forEach((eleve) => {
    contenair.append(creeLigne(eleve));
  });
}
