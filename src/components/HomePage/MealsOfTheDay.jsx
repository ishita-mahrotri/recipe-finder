import React from 'react';
import { apiCall, fetchData } from '../../Utils';
import RecipeThumbnail from './RecipeThumbnail.jsx';

export default class MealsOfTheDay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mealsOfTheDay: [],
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    let recipe = {};
    const recipeIds = [];
    for (let i = 0; i <= 5; i++) {
      fetchData(apiCall.getRandomRecipe)
      // eslint-disable-next-line
      .then((data) => {
        recipe = data.meals[0];
      })
      // eslint-disable-next-line
      .then(() => {
        if (!recipeIds.includes(recipe.idMeal)) {
          recipeIds.push(recipe.idMeal);
          this.addToList(recipe);
        } else {
          i--;
        }
      });
    }
  }

  addToList(recipe) {
    const mealsOfTheDay = this.state.mealsOfTheDay || [];

    mealsOfTheDay.push(
      <RecipeThumbnail recipe={recipe} key={recipe.idMeal}
        onClick={(args) => this.props.onClick(args)} 
      />
    );
    this.setState({ mealsOfTheDay });
  }

  render() {
    return (
      <div className="meal-list">
        {this.state.mealsOfTheDay}
      </div>
    );
  }
}