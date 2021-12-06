import { recipes } from './recipes.js';
console.log(recipes);
//On boucle sur la longueur du tableau en incrémentant de 1
for (let i = 0; i < recipes.length; i++) {
  console.log(recipes[i]);
  const ingredients = recipes[i].ingredients;
  console.log(ingredients);

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
                  <li>10cl de truc</li>
                  <li>20cl de bidulle</li>
                  <li>10cl de truc</li>
                  <li>20cl de bidulle</li>
                  <li>10cl de truc</li>
                  <li>20cl de bidulle</li>
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
