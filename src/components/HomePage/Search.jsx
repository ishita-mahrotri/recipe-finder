import React from 'react';
import { Link } from 'react-router-dom';
import { apiCall, fetchData } from '../../Utils';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      categories: [],
      areas: [],
      ingredients: [],
      filteredRecipes: [],
    }
  }

  componentDidMount() {
    this.getFilterData();
  }

  getFilterData() {
    let categories = [];
    let areas = [];
    let ingredients = [];
    fetchData(apiCall.getCategories)
    // eslint-disable-next-line
    .then((data) => {
      categories = data.meals.map(item => item.strCategory);
      categories = [...new Set(categories)];
      this.setState({ categories });
    });

    fetchData(apiCall.getAreas)
    // eslint-disable-next-line
    .then((data) => {
      areas = data.meals.map(item => item.strArea);
      areas = [...new Set(areas)];
      this.setState({ areas });
    });

    fetchData(apiCall.getIngredients)
    // eslint-disable-next-line
    .then((data) => {
      ingredients = data.meals.map(item => item.strIngredient);
      ingredients = [...new Set(ingredients)];
      this.setState({ ingredients });
    });
  }

  handleInputChange(value) {
    const filteredRecipes = this.filterSearchResults(value);
    console.log(filteredRecipes);
    this.setState({
      searchString: value, 
      filteredRecipes,
    });
  }

  filterSearchResults(searchString) {
    let filteredRecipes = [];
    console.log(searchString);
    if (searchString) {
      console.log('inside true loop');
      const categories = this.createFilterList('categories', 'category');
      const areas = this.createFilterList('areas', 'area');
      const ingredients = this.createFilterList('ingredients', 'ingredient');
      filteredRecipes = [...categories, ...areas, ...ingredients];
    }

    return filteredRecipes;
  }

  createFilterList(listName, label) {
    const list = [];
    const listArr = this.state[listName].filter(item => item.toLowerCase().includes(this.state.searchString));
    listArr.forEach((item) => {
      list.push(
        <Link to={`/homepage/search/${listName}/${item}`} key={`${listName}-${item}`}>
          <li className="list-item"
            role="button" tabIndex={0}
            onClick={() => this.props.submitSearch(listName, item)}
            onKeyDown={() => this.props.submitSearch(listName, item)}
          >
            <p className="item">{item}</p>
            <p className="label">{label}</p>
          </li>
        </Link>
      );
    });

    return list;
  }

  render() {
    return (
      <div className="search">
        <div className="header">
          <i className="fas fa-chevron-left icon-close" onClick={this.props.onClose}></i>
          <input type="text" className="search-text" autoFocus
            value={this.state.searchString} 
            onChange={e => this.handleInputChange(e.target.value)}
          />
        </div>
        <div className="filter-list">
          <ul>
            {this.state.filteredRecipes}
          </ul>
        </div>
      </div>
    );
  }
}