import React from 'react';
import { apiCall, fetchData } from '../../Utils';
import RecipeThumbnail from './RecipeThumbnail.jsx';

export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
    }
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.listType !== this.props.listType || prevProps.listValue !== this.props.listValue) {
      this.getData();
    }
  }

  getData() {
    let queryURL = '';

    if (this.props.listType === 'categories') {
      queryURL = apiCall.getCategoriesSearch;
    } else if (this.props.listType === 'areas') {
      queryURL = apiCall.getAreasSearch;
    } else {
      queryURL = apiCall.getIngredientsSearch;
    }

    fetchData(`${queryURL}${this.props.listValue}`)
    // eslint-disable-next-line
    .then((data) => {
      this.buildSearchGrid(data.meals);
    })
  }

  buildSearchGrid(recipes) {
    const searchResults = [];
    recipes.forEach((recipe) => {
      searchResults.push(
        <RecipeThumbnail recipe={recipe} key={recipe.idMeal}
          onClick={(args) => this.props.onClick(args)} 
        />
      );
    });

    this.setState({ searchResults });
  }

  render() {
    return (
      <div className="search-results">
        {this.state.searchResults}
      </div>
    );
  }
}