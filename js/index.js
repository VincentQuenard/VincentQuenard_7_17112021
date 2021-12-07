import { recipes } from './recipes.js';
//console.log(recipes);
//On boucle pour parcourir toutes les recettes du tableau
for (let i = 0; i < recipes.length; i++) {
  // console.log(recipes[i]);
  const ingredientDetail = recipes[i].ingredients;
  // console.log(ingredients);
  let besoin = '';
  for (let j = 0; j < ingredientDetail.length; j++) {
    // console.log(ingredientDetail[j]);
    const ingredient = ingredientDetail[j].ingredient;
    const quantite = ingredientDetail[j].quantity;
    //console.log(quantite);
    let unite = ingredientDetail[j].unit;
    //
    if (unite === 'grammes') {
      unite = 'g';
    } else if (unite === 'cuillères à soupe') {
      unite = 'cas';
    } else if (unite === 'cuillères à café') {
      unite = 'cac';
    }
    // console.log(unite);

    if (quantite && unite != undefined) {
      besoin += `<li>${ingredient} : ${quantite}${unite}</li>`;
    } else if (quantite != undefined && unite == undefined) {
      besoin += `<li>${ingredient}: ${quantite}</li>`;
      console.log(besoin);
    } else if (quantite && unite == undefined) {
      besoin += `<li>${ingredient}</li>`;
      console.log(besoin);
    }
  }

  const recettes = document.querySelector('.cards');

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
