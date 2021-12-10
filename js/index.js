import { recipes } from './recipes.js';
//console.log(recipes);

const recettes = document.querySelector('.cards');
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
const arrow = document.querySelector('.filter_arrow');
const arrowIngredients = document.querySelector('.arrow_ingredient');
const arrowAppliance = document.querySelector('.arrow_appliance');
const arrowUtensil = document.querySelector('.arrow_utensil');

//On boucle pour parcourir toutes les recettes du tableau
for (let i = 0; i < recipes.length; i++) {
  //console.log(recipes[i].ustensils[0]);

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

    dropdownIngredient.innerHTML += `<li>${ingredient}</li>`;
  }

  function displayRecipes() {
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
  displayRecipes();
  dropdownAppliance.innerHTML += `<li>${recipes[i].appliance}</li>`;
  dropdownUtensil.innerHTML += `<li>${recipes[i].ustensils}</li>`;
}

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
  arrow.classList.remove('rotate_arrow');
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
