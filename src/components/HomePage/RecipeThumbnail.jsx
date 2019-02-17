import React from 'react';
import { Link } from 'react-router-dom';

const RecipeThumbnail = props => (
  <Link to={`/homepage/${props.recipe.strMeal}`} className="thumbnail-link">
    <div className="recipeCard" 
      onClick={() => props.onClick(props.recipe)} 
      onKeyDown={() => props.onClick(props.recipe)}
      role="button"
      tabIndex={0}
    >
      <h2 className="title">{props.recipe.strMeal}</h2>
      <img src={props.recipe.strMealThumb} alt={props.recipe.strMeal} className="thumbnail" />
    </div>
  </Link>
);

export default RecipeThumbnail;
