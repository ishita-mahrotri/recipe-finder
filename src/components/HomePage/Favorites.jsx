import React from 'react';
import { apiCall, fetchData, getFavorites } from '../../Utils';
import RecipeThumbnail from './RecipeThumbnail.jsx';

export default class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteRecipes: [],
    }
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.favorites !== this.props.favorites) {
      this.getData();
    }
  }

  getData() {
    let recipe = {};
    const favorites = getFavorites();
    if (favorites && favorites.length > 0) {
      for (let i = 0; i < favorites.length; i++) {
        fetchData(`${apiCall.getRecipe}${favorites[i]}`)
        // eslint-disable-next-line
        .then((data) => {
          recipe = data.meals[0];
        })
        // eslint-disable-next-line
        .then(() => {
          this.addToList(recipe);
        });
      }
    }
  }

  addToList(recipe) {
    const favoriteRecipes = this.state.favoriteRecipes || [];

    favoriteRecipes.push(
      <RecipeThumbnail recipe={recipe} key={recipe.idMeal}
        onClick={(args) => this.props.onClick(args)} 
      />
    );
    this.setState({ favoriteRecipes });
  }

  render() {
    return (
      <div className="search-results">
        {this.state.favoriteRecipes}
      </div>
    );
  }
}