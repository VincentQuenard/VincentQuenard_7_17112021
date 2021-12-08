import { recipes } from './recipes.js';
console.log(recipes);

const recettes = document.querySelector('.cards');
const dropdownIngredient = document.querySelector('.filter_ingredients_list');

//On boucle pour parcourir toutes les recettes du tableau
for (let i = 0; i < recipes.length; i++) {
  console.log(recipes[i]);

  //on recupère le tableau des données ingrédients, quantité et unité contenus dans chaque recette
  const ingredientDetail = recipes[i].ingredients;
  // console.log(ingredients);

  // On déclare une variable avec une chaine vide qu'on va remplir en fonction des données reçues dans la boucle pour afficher les ingrédients
  let besoin = '';

  // On boucle sur la partie ingrédient pour récupérer le contenu pour chaque partie de chaque recette de ingredients
  for (let j = 0; j < ingredientDetail.length; j++) {
    // console.log(ingredientDetail[j]);

    //On récupère les données ingredient pour chaque recette
    const ingredient = ingredientDetail[j].ingredient;

    //On récupère les données quantity pour chaque recette
    const quantite = ingredientDetail[j].quantity;
    //console.log(quantite);

    //On récupère les données unit pour chaque recette
    let unite = ingredientDetail[j].unit;
    // console.log(unite);

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
      besoin += `<li>${ingredient} : ${quantite}${unite}</li>`;
    } else if (quantite != undefined && unite == undefined) {
      besoin += `<li>${ingredient}: ${quantite}</li>`;
      //  console.log(besoin);
    } else if (quantite && unite == undefined) {
      besoin += `<li>${ingredient}</li>`;
      //  console.log(besoin);
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
                ${besoin}
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
}

const filterIngredient = document.querySelector('.filter_ingredients');
const titleIngredients = document.querySelector('.title_ingredients');

const filterIngredientsSearch = document.querySelector(
  '.filter_ingredients_search'
);
const filterIngredientsList = document.querySelector(
  '.filter_ingredients_list'
);
const rotationArrow = document.querySelector('.filter_arrow');

filterIngredient.addEventListener('click', (e) => {
  console.log(e);
  rotationArrow.classList.add('rotate_arrow');
  titleIngredients.classList.add('hidden');
  filterIngredientsSearch.classList.remove('hidden');
  filterIngredientsList.classList.remove('hidden');
});
