export function fetchData(requestURL) {
  return fetch(requestURL)
  .then(function(response) {
    return response.json();
  })
}

export const apiCall = {
  getRandomRecipe: 'https://www.themealdb.com/api/json/v1/1/random.php',
  getCategories: 'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
  getAreas: 'https://www.themealdb.com/api/json/v1/1/list.php?a=list',
  getIngredients: 'https://www.themealdb.com/api/json/v1/1/list.php?i=list',
  getCategoriesSearch: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=',
  getAreasSearch: 'https://www.themealdb.com/api/json/v1/1/filter.php?a=',
  getIngredientsSearch: 'https://www.themealdb.com/api/json/v1/1/filter.php?i=',
  getRecipe: 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=',
}

export function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites'));
}

export function setFavorites(favorites) {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}