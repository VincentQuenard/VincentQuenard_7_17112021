import { recipes } from './recipes.js';
console.log(recipes);

for (let i = 0; i < recipes.length; i++) {
  console.log(recipes[i]);
  const name = recipes[i].ingredients;
  console.log(name);
}
