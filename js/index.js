//Importation du tableau des données à injecter
import { recipes } from './recipes.js';

// Container pour injecter les recettes
let recettes = document.querySelector('.cards');
// Container pour injecter les tags
let displayTags = document.querySelector('.tags_selection');

//Constantes pour afficher et gérer les dropdown
const dropdownIngredient = document.querySelector('.filter_ingredients_list');
const dropdownAppliance = document.querySelector('.filter_appliance_list');
const dropdownUtensil = document.querySelector('.filter_utensil_list');
const filterIngredient = document.querySelector('.filter_ingredients');
const filterAppliance = document.querySelector('.filter_appliance');
const filterUtensil = document.querySelector('.filter_utensil');

const filterIngredientsSearch = document.querySelector(
  '.filter_ingredients_search'
);
const filterApplianceSearch = document.querySelector(
  '.filter_appliance_search'
);
const filterUtensilSearch = document.querySelector('.filter_utensil_search');
const filterIngredientsList = document.querySelector(
  '.filter_ingredients_list'
);
const filterApplianceList = document.querySelector('.filter_appliance_list');
const filterUtensilList = document.querySelector('.filter_utensil_list');
const titleIngredients = document.querySelector('.title_ingredients');
const titleAppliance = document.querySelector('.title_appliance');
const titleUtensil = document.querySelector('.title_utensil');

const arrowIngredients = document.querySelector('.arrow_ingredient');
const arrowAppliance = document.querySelector('.arrow_appliance');
const arrowUtensil = document.querySelector('.arrow_utensil');

//  variables de tableaux vides, remplis pour entrées sans doublons pour affichage des dropdown
let ingredientsListDropdown = [];
let appliancesListDropdown = [];
let utensilsListDropdown = [];
//On déclare 3 variables pour chaque dropdown en tableaux vides pour les remplir avec les résultats du filtre pour chaque
let filterResultIngredient = [];
let filterResultAppliance = [];
let filterResultUstensils = [];

// variables recherche
const mainSearch = document.querySelector('.main_search_filter');
let filterMainResult = [...recipes];
let inputValue = '';
let tags = '';

//On boucle pour parcourir toutes les recettes du tableau
function displayRecipes(recipes) {
  for (let i = 0; i < recipes.length; i++) {
    //on recupère le tableau des données ingrédients, quantité et unité contenus dans chaque recette
    const ingredientDetail = recipes[i].ingredients;

    // On déclare une variable avec une chaine vide qu'on va remplir en fonction des données reçues dans la boucle pour afficher les ingrédients
    let displayIngredients = '';

    // On boucle sur la partie ingrédient pour récupérer le contenu pour chaque partie de chaque recette de ingredients
    for (let j = 0; j < ingredientDetail.length; j++) {
      //On récupère les données ingredient pour chaque recette
      const ingredient = ingredientDetail[j].ingredient;

      //On récupère les données quantity pour chaque recette
      const quantite = ingredientDetail[j].quantity;

      //On récupère les données unit pour chaque recette
      let unite = ingredientDetail[j].unit;

      // On réduit le nombre de charactères pour les unités afin de prendre moin de place à l'affichage
      if (unite === 'grammes') {
        unite = 'g';
      } else if (unite === 'cuillères à soupe') {
        unite = 'cas';
      } else if (unite === 'cuillères à café') {
        unite = 'cac';
      }

      //Les données injectées dans la partie des ingrédients sont des listes non ordonnées, on vérifie s'il y a des quantités et des unités aux ingrédients et on injecte en js en fonction
      if (quantite && unite != undefined) {
        displayIngredients += `<li>${ingredient} : ${quantite}${unite}</li>`;
      } else if (quantite != undefined && unite == undefined) {
        displayIngredients += `<li>${ingredient}: ${quantite}</li>`;
      } else {
        displayIngredients += `<li>${ingredient}</li>`;
      }
    }

    //code qui va créer chaque carte de recette à chaque tour de boucle for sur le tableau recipes

    recettes.innerHTML += ` <article class="card" data-id="${recipes[i].id}">
          <div class="card_header">
            <img
              class="card_header_background"
              src="./images/fond_recettes.svg"
              alt="photo_plat"
            />
          </div>
          <div class="card_content">
            <div class="card_content_header">
              <div class="card_title">
                <h3>${recipes[i].name}</h3>
              </div>
              <div class="card_duration">
                <img
                  class="clock"
                  src="./images/horloge.svg"
                  alt="logo cadran horloge"
                />
                <p class="duration">${recipes[i].time} min</p>
              </div>
            </div>
            <div class="card_content_body">
              <div class="card_ingredient">
                <ul class="card_ingredient_list">
                ${displayIngredients}
                </ul>
              </div>
              <div class="card_description">
                <p class="card_description_text">
                ${recipes[i].description}
                </p>
              </div>
            </div>
          </div>
        </article>`;
  }
}
displayRecipes(recipes);

//Fonctions des actions faites à l'ouverture des dropdowns
function openLingredientList() {
  arrowIngredients.classList.add('rotate_arrow');
  titleIngredients.classList.add('hidden');
  filterIngredientsSearch.classList.remove('hidden');
  filterIngredient.style.width = '50%';
  filterIngredientsList.classList.remove('hidden');
}

function openApplicanceList() {
  arrowAppliance.classList.add('rotate_arrow');
  titleAppliance.classList.add('hidden');
  filterApplianceSearch.classList.remove('hidden');
  filterAppliance.style.width = '50%';
  filterApplianceList.classList.remove('hidden');
}

function openUtensilList() {
  arrowUtensil.classList.add('rotate_arrow');
  titleUtensil.classList.add('hidden');
  filterUtensilSearch.classList.remove('hidden');
  filterUtensil.style.width = '50%';
  filterUtensilList.classList.remove('hidden');
}

//Fonctions des actions faites à la fermeture des dropdowns, retour à l'affihage initial
function closeLingredientList() {
  arrowIngredients.classList.remove('rotate_arrow');
  titleIngredients.classList.remove('hidden');
  filterIngredientsSearch.classList.add('hidden');
  filterIngredient.style.width = '10.625rem';
  filterIngredientsList.classList.add('hidden');
}

function closeApplicanceList() {
  arrowAppliance.classList.remove('rotate_arrow');
  titleAppliance.classList.remove('hidden');
  filterApplianceSearch.classList.add('hidden');
  filterAppliance.style.width = '10.625rem';
  filterApplianceList.classList.add('hidden');
}

function closeUtensilList() {
  arrowUtensil.classList.remove('rotate_arrow');
  titleUtensil.classList.remove('hidden');
  filterUtensilSearch.classList.add('hidden');
  filterUtensil.style.width = '10.625rem';
  filterUtensilList.classList.add('hidden');
}

//Gestion des ouvertures et fermetures des dropdown
arrowIngredients.addEventListener('click', (e) => {
  if (arrowIngredients.classList.contains('rotate_arrow')) {
    closeLingredientList();
  } else {
    openLingredientList();
  }
});

arrowAppliance.addEventListener('click', (e) => {
  if (arrowAppliance.classList.contains('rotate_arrow')) {
    closeApplicanceList();
  } else {
    openApplicanceList();
  }
});

arrowUtensil.addEventListener('click', (e) => {
  if (arrowUtensil.classList.contains('rotate_arrow')) {
    closeUtensilList();
  } else {
    openUtensilList();
  }
});

//fonction qui va concatener et ne renvoyer qu'un tableau pour les 3 entrées et on va retirer les mots se répétant avec new Set
function removeDuplicate(recipes) {
  recipes.forEach((recipe) => {
    let onlyIngredients = recipe.ingredients;
    onlyIngredients.forEach((onlyIngredient) => {
      ingredientsListDropdown = [
        ...new Set(ingredientsListDropdown.concat(onlyIngredient.ingredient)),
      ].sort();
    });

    appliancesListDropdown = [
      ...new Set(appliancesListDropdown.concat(recipe.appliance)),
    ].sort();

    utensilsListDropdown = [
      ...new Set(utensilsListDropdown.concat(recipe.ustensils)),
    ].sort();
  });
}
removeDuplicate(recipes);

// fonction qui va renvoyer une liste non ordonnée en fonction des différentes données de chaque lignes des 3 tableaux et filtrer les recettes au clic ainsi que les contenus des dropdowns
function displayIngredientDropdown(ingredientsListDropdown) {
  ingredientsListDropdown.forEach((ingredientListDropdown) => {
    dropdownIngredient.innerHTML += `<li class="ingredients_list" tabindex="0">${ingredientListDropdown}</li>`;
  });
  let displayIngredientsTag = document.querySelectorAll('.ingredients_list');
  displayIngredientsTag.forEach((displayIngredientTag) => {
    displayIngredientTag.addEventListener('click', (e) => {
      inputValue = e.target.textContent;

      displayTags.innerHTML += `<div class="tags tags_ingredients active">
            <p class="tag_text">${inputValue}</p>
            <button class="btn_close">
              <i class="fas fa-times-circle"></i>
            </button>
          </div>`;

      filterIngredientResult(filterMainResult);
      closeLingredientList();
      closeTag();
    });
  });
}
displayIngredientDropdown(ingredientsListDropdown);

function displayApplianceDropdown(appliancesListDropdown) {
  appliancesListDropdown.forEach((applianceListDropdown) => {
    dropdownAppliance.innerHTML += `<li class="appliances_list" tabindex="0">${applianceListDropdown}</li>`;
  });
  let displayAppliancesTag = document.querySelectorAll('.appliances_list');
  displayAppliancesTag.forEach((displayApplianceTag) => {
    displayApplianceTag.addEventListener('click', (e) => {
      inputValue = e.target.textContent;
      displayTags.innerHTML += `<div class="tags tags_appliance">
            <p class="tag_text">${inputValue}</p>
            <button class="btn_close">
              <i class="fas fa-times-circle"></i>
            </button>
          </div>`;
      filterApplianceResult(filterMainResult);
      closeApplicanceList();
      closeTag();
    });
  });
}
displayApplianceDropdown(appliancesListDropdown);

function displayUstensilsDropdown(utensilsListDropdown) {
  utensilsListDropdown.forEach((utensilListDropdown) => {
    dropdownUtensil.innerHTML += `<li class="utensils_list" tabindex="0">${utensilListDropdown}</li>`;
  });
  let displayUtensilsTag = document.querySelectorAll('.utensils_list');
  displayUtensilsTag.forEach((displayUtensilTag) => {
    displayUtensilTag.addEventListener('click', (e) => {
      inputValue = e.target.textContent;
      displayTags.innerHTML += `<div class="tags tags_ustensil">
            <p class="tag_text">${inputValue}</p>
            <button class="btn_close">
              <i class="fas fa-times-circle"></i>
            </button>
          </div>`;
      filterUstensilsResult(filterMainResult);
      closeUtensilList();
      closeTag();
    });
  });
}
displayUstensilsDropdown(utensilsListDropdown);

// Fonction de fermeture des tags ouverts et d'affichage des recettes et contenus des dopdowns en fonction des choix de l'utilisateur
function closeTag() {
  //On selectionne sur les boutons de fermeture
  let crosses = document.querySelectorAll('.btn_close');
  //On boucle sur tous les boutons
  for (let cross = 0; cross < crosses.length; cross++) {
    //On écoute l'évenement clic sur les croix
    crosses[cross].addEventListener('click', function () {
      //on retire au clic le parent de la croix qui est le tag
      this.parentElement.remove();
      tags = document.querySelectorAll('.tags');
      filterMainResult = [...recipes];
      //S'il n'y a pas de tag et que le champ de l'input principal est vide, on affiche la page comme lors de l'arrivée
      if (tags.length == 0 && mainSearch.value.length == 0) {
        displayReset(recipes);
        //S'il n'y a pas de tag mais que l'input à des lettres, on affiche en fonction du filtre de l'input principal
      } else if (tags.length == 0 && mainSearch.value.length >= 1) {
        filterMainResult = [];
        for (let result of recipes) {
          if (
            result.name
              .toLowerCase()
              .includes(mainSearch.value.toLowerCase()) ||
            result.ingredients.find((ingredientArray) =>
              ingredientArray.ingredient
                .toLowerCase()
                .includes(mainSearch.value.toLowerCase())
            ) ||
            result.description
              .toLowerCase()
              .includes(mainSearch.value.toLowerCase())
          ) {
            filterMainResult.push(result);
          }
        }
        recettes.innerHTML = '';
        displayRecipes(filterMainResult);
      } else {
        //Sinon on flitre en fonction des tags sélectionnés
        filterByTag(filterMainResult);
      }
    });
  }
}

//Fonction qui filtre par les tags sélectionnés
function filterByTag(recipes) {
  recettes.innerHTML = '';
  tags.forEach((tag) => {
    filterMainResult = recipes.filter(
      (result) =>
        result.ingredients.find((ingredientArray) =>
          ingredientArray.ingredient
            .toLowerCase()
            .includes(tag.innerText.toLowerCase())
        ) ||
        result.appliance.toLowerCase().includes(tag.innerText.toLowerCase()) ||
        result.ustensils.find((ustensil) =>
          ustensil.toLowerCase().includes(tag.innerText.toLowerCase())
        )
    );
    resultFilter(filterMainResult);
  });
}

//Filtre principal

mainSearch.addEventListener('input', (e) => {
  inputValue = e.target.value;
  filterMainResult = [...recipes];
  if (inputValue.length >= 3) {
    filterMainInputResult(filterMainResult);

    //Si l'input principal est vide alors on reconstruit la page à l'initial
  } else {
    displayReset();
  }
});

//fonction de l'input principal qui boucle et filtre le tableau selon le titre,les ingrédients ou la description en fonction des lettres tapées
function filterMainInputResult(recipes) {
  filterMainResult = [];
  for (let result of recipes) {
    if (
      result.name.toLowerCase().includes(inputValue.toLowerCase()) ||
      result.ingredients.find((ingredientArray) =>
        ingredientArray.ingredient
          .toLowerCase()
          .includes(inputValue.toLowerCase())
      ) ||
      result.description.toLowerCase().includes(inputValue.toLowerCase())
    ) {
      filterMainResult.push(result);
    }
  }
  resultFilter(filterMainResult);
}

function resultFilter(filterMainResult) {
  recettes.innerHTML = '';
  displayRecipes(filterMainResult);
  filterDropdown(filterMainResult);
  if (filterMainResult.length == 0) {
    recettes.innerHTML += `
  <p class="name_site"> Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc </p>`;
  }
}
function filterDropdown(filterMainResult) {
  //On s'assure que les dropdown sont bien vide lorsqu'on éxécute la fonction
  filterResultIngredient = [];
  filterResultAppliance = [];
  filterResultUstensils = [];
  filterMainResult.forEach((filteMainResultForDropdown) => {
    //On accède à la liste de chaque ingrédient avec le foreach du résultat de la recherche, dans une variable on stocke l'enlèvement des doublons et la concatenations du nouveau résultat

    filteMainResultForDropdown.ingredients.forEach((resultIngredient) => {
      filterResultIngredient = [
        ...new Set(filterResultIngredient.concat(resultIngredient.ingredient)),
      ].sort();
    });

    //On filtre le tableau sur les appareils puis ustensiles où on concanène le résultat dans un nouveau tableau stocké dans une variable en ayant retiré les doublons
    filterResultAppliance = [
      ...new Set(
        filterResultAppliance.concat(filteMainResultForDropdown.appliance)
      ),
    ].sort();

    filterResultUstensils = [
      ...new Set(
        filterResultUstensils.concat(filteMainResultForDropdown.ustensils)
      ),
    ].sort();
  });
  //On affiche dans les 3 dropdowns les ingrédients, appareils et ustensiles des recettes filtrées en vidant précédemment ceux-ci
  dropdownIngredient.innerHTML = '';
  dropdownAppliance.innerHTML = '';
  dropdownUtensil.innerHTML = '';
  displayIngredientDropdown(filterResultIngredient);
  displayApplianceDropdown(filterResultAppliance);
  displayUstensilsDropdown(filterResultUstensils);
}
//fonctions qui filtrent en fonction des ingrédients, des appareils ou ustensiles correspondant à la recherche de l'utilisateur au clic
function filterIngredientResult(recipes) {
  filterMainResult = recipes.filter((result) =>
    result.ingredients.find((ingredientArray) =>
      ingredientArray.ingredient
        .toLowerCase()
        .includes(inputValue.toLowerCase())
    )
  );
  resultFilter(filterMainResult);
}

function filterApplianceResult(recipes) {
  filterMainResult = recipes.filter((result) =>
    result.appliance.toLowerCase().includes(inputValue.toLowerCase())
  );
  resultFilter(filterMainResult);
}
function filterUstensilsResult(recipes) {
  filterMainResult = recipes.filter((result) =>
    result.ustensils.find((ustensil) =>
      ustensil.toLowerCase().includes(inputValue.toLowerCase())
    )
  );
  resultFilter(filterMainResult);
}

//Fonction qui reconstruit la page comme à l'arrivée sur celle-ci
function displayReset() {
  recettes.innerHTML = '';
  displayRecipes(recipes);
  dropdownIngredient.innerHTML = '';
  displayIngredientDropdown(ingredientsListDropdown);
  dropdownAppliance.innerHTML = '';
  displayApplianceDropdown(appliancesListDropdown);
  dropdownUtensil.innerHTML = '';
  displayUstensilsDropdown(utensilsListDropdown);
}

//recherche secondaire après premier filtrage input principal
//Variables pour le nouveau tableau au filtre par l'input secondaire de chaque dropdown
let filterByIngredientsInput = [];
let filterByApplianceInput = [];
let filterByUstensilesInput = [];
//Variables pour tableau ne contenant le résultat que des ingrédients, appareils ou ustensiles
let resultFilterIngredient = [];
let resultFilterAppliance = [];
let resultFilterUstensil = [];

//Filtre des recettes par les inputs des dropdown après filtre principal
filterIngredientsSearch.addEventListener('input', (e) => {
  inputValue = e.target.value;
  //on filtre le tableau de recette par les ingredients
  filterByIngredientsInput = filterMainResult.filter((result) =>
    result.ingredients.find((ingredientArray) =>
      ingredientArray.ingredient
        .toLowerCase()
        .includes(inputValue.toLowerCase())
    )
  );

  //on s'assure que le tableau à remplir est bien vide
  resultFilterIngredient = [];
  //pour chaque résultat du filtre on enlève les doublons et on regroupe en un seul tableau les ingrédients
  filterByIngredientsInput.forEach((filterArrayIngredients) => {
    filterArrayIngredients.ingredients.forEach((resultFilterIngredients) => {
      resultFilterIngredient = [
        ...new Set(
          resultFilterIngredient.concat(resultFilterIngredients.ingredient)
        ),
      ].sort();
    });
  });
  //on déclare une variable qui va renvoyer seulement le résultat des ingrédients correspondant à la recherche
  let filterIngredientWord = resultFilterIngredient.filter((word) =>
    word.toLowerCase().includes(inputValue.toLowerCase())
  );
  //on vide le dropdown et on affiche à l'intérieur le résultat de la recherche, de la correspondance
  dropdownIngredient.innerHTML = '';
  displayIngredientDropdown(filterIngredientWord);
});
//On répète la même logique de l'input ingredient sur ceux des appareils et ustensiles
filterApplianceSearch.addEventListener('input', (e) => {
  inputValue = e.target.value;
  filterByApplianceInput = filterMainResult.filter((result) =>
    result.appliance.toLowerCase().includes(inputValue.toLowerCase())
  );

  resultFilterAppliance = [];
  filterByApplianceInput.forEach((resultFilterAppliances) => {
    resultFilterAppliance = [
      ...new Set(
        resultFilterAppliance.concat(resultFilterAppliances.appliance)
      ),
    ].sort();
  });
  let filterApplianceWord = resultFilterAppliance.filter((word) =>
    word.toLowerCase().includes(inputValue.toLowerCase())
  );

  dropdownAppliance.innerHTML = '';
  displayApplianceDropdown(filterApplianceWord);
});

filterUtensilSearch.addEventListener('input', (e) => {
  inputValue = e.target.value;
  filterByUstensilesInput = filterMainResult.filter((result) =>
    result.ustensils.find((ustensil) =>
      ustensil.toLowerCase().includes(inputValue.toLowerCase())
    )
  );

  filterByUstensilesInput.forEach((resultFilterUstensils) => {
    resultFilterUstensil = [
      ...new Set(resultFilterUstensil.concat(resultFilterUstensils.ustensils)),
    ].sort();
  });
  let filterUstensilWord = resultFilterUstensil.filter((word) =>
    word.toLowerCase().includes(inputValue.toLowerCase())
  );

  dropdownUtensil.innerHTML = '';
  displayUstensilsDropdown(filterUstensilWord);
});
