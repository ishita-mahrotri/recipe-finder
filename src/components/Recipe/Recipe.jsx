import React from 'react';
import { Link } from 'react-router-dom';
import { getFavorites, setFavorites } from '../../Utils.js';

export default class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Recipe',
      ingredients: [],
      isFavorite: false,
    };
  }

  componentDidMount() {
    this.checkFavorites();
    this.makeIngredientsList();
  }

  makeIngredientsList() {
    const ingredients = [];
    let ingredientsArr = Object.keys(this.props.recipe).filter((item) => item.includes("strIngredient") && this.props.recipe[item] !== "");
    ingredientsArr = ingredientsArr.map((item) => item.match(/\d+/g));

    if (ingredientsArr && ingredientsArr.length > 0) {
      ingredientsArr.forEach((item) => {
        ingredients.push(<li key={item} className="list-item">{this.props.recipe[`strIngredient${item}`]} - {this.props.recipe[`strMeasure${item}`]}</li>);
      });
    }

    this.setState({ ingredients });
  }

  checkFavorites() {
    const favorites = getFavorites();
    if (favorites && favorites.length > 0 && favorites.includes(this.props.recipe.idMeal)) {
      this.setState({ isFavorite: true });
    }
  }

  addToFavorites() {
    const favorites = getFavorites() || [];
    favorites.push(this.props.recipe.idMeal)
    setFavorites(favorites);
    this.setState({ isFavorite: true });
  }

  removeFromFavorites() {
    const favorites = getFavorites();
    if (favorites && favorites.length > 0 && favorites.indexOf(this.props.idMeal >= 0)) {
      favorites.splice(favorites.indexOf(this.props.idMeal), 1);
      setFavorites(favorites);
      this.setState({ isFavorite: false });
    }
  }

  render() {
    return (
      <div className="recipe">
        <div className="header">
          <div className="section-left">
          <Link to={`/homepage`} className="thumbnail-link">
            <i className="fas fa-chevron-left icon-close" onClick={this.props.onClose}></i>
          </Link>
            <h1 className="recipe-name">{this.props.title}</h1>
          </div>
          {
            this.state.isFavorite ? 
            <i className="fas fa-heart icon-favorite filled"
              role="button"
              tabIndex={0}
              onClick={() => this.removeFromFavorites()} 
              onKeyDown={() => this.removeFromFavorites()} 
            /> : 
            <i className="far fa-heart icon-favorite"
              role="button"
              tabIndex={0}
              onClick={() => this.addToFavorites()} 
              onKeyDown={() => this.addToFavorites()} 
            />
          }
        </div>
        <div className="body">
          <img className="thumbnail" src={this.props.recipe.strMealThumb} alt="" />
          <h2>Ingredients</h2>
          <div className="ingredients">
            <ul className="list">
              {this.state.ingredients}
            </ul>
          </div>
          <h2>Instructions</h2>
          <div className="instructions body-copy">
            {this.props.recipe.strInstructions}
          </div>
        </div>
      </div>
    );
  }
}