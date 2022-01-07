//Importation du tableau des données à injecter
import { recipes } from './recipes.js';

console.log(recipes);

// Container pour injecter les recettes
let recettes = document.querySelector('.cards');

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
      } else if (quantite && unite == undefined) {
        displayIngredients += `<li>${ingredient}</li>`;
      }

      //dropdownIngredient.innerHTML += `<li>${ingredient}</li>`;
    }

    //fonction qui va créer chaque carte de recette à chaque tour de boucle for

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
function removeDuplicate() {
  recipes.forEach((recipe) => {
    const onlyIngredients = recipe.ingredients;
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
removeDuplicate();

// fonction qui va renvoyer une liste non ordonnée en fonction des différentes données de chaque lignes des 3 tableaux
function displayIngredientDropdown(ingredientsListDropdown) {
  ingredientsListDropdown.forEach((ingredientListDropdown) => {
    dropdownIngredient.innerHTML += `<li class="ingredients_list" tabindex="0">${ingredientListDropdown}</li>`;
  });
}
displayIngredientDropdown(ingredientsListDropdown);

function displayApplianceDropdown(appliancesListDropdown) {
  appliancesListDropdown.forEach((applianceListDropdown) => {
    dropdownAppliance.innerHTML += `<li class="appliances_list" tabindex="0">${applianceListDropdown}</li>`;
  });
}
displayApplianceDropdown(appliancesListDropdown);

function displayUstensilsDropdown(utensilsListDropdown) {
  utensilsListDropdown.forEach((utensilListDropdown) => {
    dropdownUtensil.innerHTML += `<li class="utensils_list" tabindex="0">${utensilListDropdown}</li>`;
  });
}
displayUstensilsDropdown(utensilsListDropdown);

let displayTags = document.querySelector('.tags_selection');

let displayIngredientsTag = document.querySelectorAll('.ingredients_list');
let displayAppliancesTag = document.querySelectorAll('.appliances_list');
let displayUtensilsTag = document.querySelectorAll('.utensils_list');

//fonction pour afficher en tags les élements cliqués des dropdown

displayIngredientsTag.forEach((displayIngredientTag) => {
  displayIngredientTag.addEventListener('click', (e) => {
    inputValue = e.target.textContent;
    console.log(e.target.textContent);
    displayTags.innerHTML += `<div class="tags tags_ingredients active">
          <p class="tag_text">${e.target.textContent}</p>
          <button class="btn_close">
            <i class="fas fa-times-circle"></i>
          </button>
        </div>`;
    filterResult();
    closeLingredientList();
    closeTag();
  });
});

displayAppliancesTag.forEach((displayApplianceTag) => {
  displayApplianceTag.addEventListener('click', (e) => {
    inputValue = e.target.textContent;
    displayTags.innerHTML += `<div class="tags tags_appliance active">
          <p class="tag_text">${e.target.textContent}</p>
          <button class="btn_close">
            <i class="fas fa-times-circle"></i>
          </button>
        </div>`;
    filterResult();
    closeApplicanceList();
    closeTag();
  });
});

displayUtensilsTag.forEach((displayUtensilTag) => {
  displayUtensilTag.addEventListener('click', (e) => {
    inputValue = e.target.textContent;
    displayTags.innerHTML += `<div class="tags tags_ustensil active">
          <p class="tag_text">${e.target.textContent}</p>
          <button class="btn_close">
            <i class="fas fa-times-circle"></i>
          </button>
        </div>`;
    filterResult();
    closeUtensilList();
    closeTag();
  });
});

//fermeture des tags ouverts
function closeTag() {
  let tags = document.querySelectorAll('.tags');
  tags.forEach((tag) => {
    console.log(tag);
    tag.addEventListener('click', (e) => {
      console.log(e.target);
      tag.remove();
      displayReset();
    });
  });
}

//Filtre principal

mainSearch.addEventListener('input', (e) => {
  inputValue = e.target.value;
  if (inputValue.length >= 3) {
    filterResult();
    //Si l'input principal est vide alors on reconstruit la page à l'initial
  } else {
    displayReset();
  }
});
function filterResult() {
  filterMainResult = recipes.filter(
    (result) =>
      result.name.toLowerCase().includes(inputValue.toLowerCase()) ||
      result.appliance.toLowerCase().includes(inputValue.toLowerCase()) ||
      result.ustensils.find((ustensil) =>
        ustensil.toLowerCase().includes(inputValue.toLowerCase())
      ) ||
      result.ingredients.find((ingredientArray) =>
        ingredientArray.ingredient
          .toLowerCase()
          .includes(inputValue.toLowerCase())
      ) ||
      result.description.toLowerCase().includes(inputValue.toLowerCase())
  );
  console.log(filterMainResult);
  recettes.innerHTML = '';
  displayRecipes(filterMainResult);

  //On affiche dans les 3 dropdowns les ingrédients, appareils et ustensiles des recettes filtrées en vidant précédemment ceux-ci
  dropdownIngredient.innerHTML = '';
  dropdownAppliance.innerHTML = '';
  dropdownUtensil.innerHTML = '';

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
  //On affiche le résultat de la recherche principale filtrée dans chaque dropdown
  displayIngredientDropdown(filterResultIngredient);
  displayApplianceDropdown(filterResultAppliance);
  displayUstensilsDropdown(filterResultUstensils);
  //Si les lettres entrées ne rencontrent aucune concordance on affiche un message d'erreur
  if (filterMainResult.length == 0) {
    recettes.innerHTML += `
  <p class="name_site"> Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc </p>`;
  }
}
//fonction des input qui filtre les recettes en fonction des lettres tapées

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
let filterIngredientsSearchResult = [];
console.log(filterMainResult);
//Filtre des recettes par les inputs des dropdown
filterIngredientsSearch.addEventListener('input', (e) => {
  inputValue = e.target.value;
  filterIngredientsSearchResult = filterMainResult.filter((result) =>
    result.ingredients.find((ingredientArray) =>
      ingredientArray.ingredient
        .toLowerCase()
        .includes(inputValue.toLowerCase())
    )
  );
  console.log(filterIngredientsSearchResult);
});
/*
filterIngredientsSearch.addEventListener('input', (e) => {
  inputValue = e.target.value;
  if (inputValue.length >= 3) {
    filterResult = filterMainResult.filter((result) =>
      result.ingredients.find((ingredientArray) =>
        ingredientArray.ingredient
          .toLowerCase()
          .includes(inputValue.toLowerCase())
      )
    );
    console.log(filterResult);
    recettes.innerHTML = '';
    displayRecipes(filterResult);
    //FILTRE OK MAIS RETIRER LES DOUBLONS ET FILTER ENSUITE LES 2 DROPDOWNS RESTANTS
    dropdownIngredient.innerHTML = '';

    filterResult.forEach((resultIngredients) => {
      resultIngredients.ingredients.forEach((resultIngredient) => {
        filterResultIngredient.push(resultIngredient.ingredient);
      });
      filterResultIngredient = [...new Set(filterResultIngredient)].sort();
    });

    dropdownAppliance.innerHTML = '';
    dropdownUtensil.innerHTML = '';
    displayIngredientDropdown(filterResultIngredient);

    if (filterResult.length == 0) {
      recettes.innerHTML += `
    <p class="name_site"> Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc </p>`;
    }
  } else {
    recettes.innerHTML = '';
    displayRecipes(recipes);
    dropdownIngredient.innerHTML = '';
    displayIngredientDropdown(ingredientsListDropdown);
  }
});
filterApplianceSearch.addEventListener('input', (e) => {
  inputValue = e.target.value;
  if (inputValue.length >= 3) {
    filterResult = recipes.filter((result) =>
      result.appliance.toLowerCase().includes(inputValue.toLowerCase())
    );
    console.log(filterResult);
    recettes.innerHTML = '';
    displayRecipes(filterResult);

    if (filterResult.length == 0) {
      recettes.innerHTML += `
    <p class="name_site"> Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc </p>`;
    }
  } else {
    recettes.innerHTML = '';
    displayRecipes(recipes);
  }
});
filterUtensilSearch.addEventListener('input', (e) => {
  inputValue = e.target.value;
  if (inputValue.length >= 3) {
    filterResult = recipes.filter((result) =>
      result.ustensils.find((ustensil) =>
        ustensil.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
    console.log(filterResult);
    recettes.innerHTML = '';
    displayRecipes(filterResult);

    if (filterResult.length == 0) {
      recettes.innerHTML += `
    <p class="name_site"> Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc </p>`;
    }
  } else {
    recettes.innerHTML = '';
    displayRecipes(recipes);
  }
});*/
