import React from 'react';
import homepageBG from '../../assets/home-background.jpg';
import logo from '../../assets/logo.png'
import Modal from '../Modal/Modal.jsx';
import Recipe from '../Recipe/Recipe.jsx';
import Search from './Search.jsx';
import MealsOfTheDay from './MealsOfTheDay.jsx';
import SearchResults from './SearchResults';

export default class HomePage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isModalOpen: false,
        isSearchOpen: false,
        submitSearch: false,
        recipe: null,
        searchType: '',
        searchValue: '',
      };
    }

    componentDidMount() {
      console.log(this.props.match);
    }

    toggleModal(recipe) {
      this.setState({ isModalOpen: !this.state.isModalOpen, recipe });
    }

    toggleSearch() {
      this.setState({ isSearchOpen: !this.state.isSearchOpen });
    }

    submitSearch(listName, listValue) {
      this.toggleSearch();
      this.setState({ 
        submitSearch: true,
        searchType: listName,
        searchValue: listValue,
      })
      console.log(listName, listValue);
    }



    render() {
      return (
        <div className="homepage">
          <div className="header">
            <img src={homepageBG} alt="" className="background" />
            <img src={logo} alt={"logo"} className="logo" />
            <h1 className="title">Recipes of the Day</h1>
          </div>
          {this.state.submitSearch ? 
            <SearchResults listType={this.state.searchType} listValue={this.state.searchValue} 
              onClick={(recipe) => this.toggleModal(recipe)}
            />
            : 
            <MealsOfTheDay onClick={(recipe) => this.toggleModal(recipe)} />
          }
          <div className="search-button" role="button" tabIndex={0} 
            onClick={() => this.toggleSearch()}
            onKeyDown={() => this.toggleSearch()}
          >
            <i className="fas fa-search search-icon"></i>
          </div>
          <Modal isOpen={this.state.isModalOpen}>
            <Recipe
              title={this.state.recipe ? this.state.recipe.strMeal : ''}
              onClose={() => this.toggleModal(null)}
              recipe={this.state.recipe}
            />
          </Modal>
          <Modal isOpen={this.state.isSearchOpen}>
            <Search onClose={() => this.toggleSearch()} submitSearch={(listName, listValue) => this.submitSearch(listName, listValue)} />
          </Modal>
        </div>
      );
    }
}