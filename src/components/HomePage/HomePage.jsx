import React from 'react';
import { Link } from 'react-router-dom';
import homepageBG from '../../assets/home-background.jpg';
import logo from '../../assets/logo.png'
import Modal from '../Modal/Modal.jsx';
import Recipe from '../Recipe/Recipe.jsx';
import Search from './Search.jsx';
import MealsOfTheDay from './MealsOfTheDay.jsx';
import SearchResults from './SearchResults.jsx';
import Favorites from './Favorites.jsx';
import { getFavorites } from '../../Utils';

export default class HomePage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isModalOpen: false,
        isSearchOpen: false,
        recipe: null,
        searchType: '',
        searchValue: '',
        hasFavorites: false,
        showSearch: false,
        showFavorites: false,
        showHomepage: true,
      };
    }

    componentDidMount() {
      //check for favorites
      const favorites = getFavorites();
      if (favorites && favorites.length > 0) {
        this.setState({ hasFavorites: true });
      }
    }

    toggleModal(recipe) {
      const favorites = getFavorites();
      let hasFavorites = false;
      if (favorites && favorites.length > 0) {
        hasFavorites = true;
      }
      this.setState({ isModalOpen: !this.state.isModalOpen, recipe, hasFavorites });
    }

    toggleSearch() {
      this.setState({ isSearchOpen: !this.state.isSearchOpen });
    }

    submitSearch(listName, listValue, toggleSearchModal) {
      if (toggleSearchModal) {
        this.toggleSearch();
      }
      this.setState({ 
        showSearch: true,
        showFavorites: false,
        showHomepage: false,
        searchType: listName,
        searchValue: listValue,
      })
    }

    updateFavorites(hasFavorites) {
      this.setState({ hasFavorites });
    }

    viewFavorites() {
      this.setState({ showFavorites: true, showHomepage: false, showSearch: false });
    }

    viewHomePage() {
      this.setState({ showFavorites: false, showHomepage: true, showSearch: false });
    }

    render() {
      let title = '';
      let body = [];
      if (this.state.showHomepage) {
        title = 'Recipes of the Day';
        body = <MealsOfTheDay onClick={(recipe) => this.toggleModal(recipe)} />;
      } else if (this.state.showFavorites) {
        title = 'Favorites';
        body = <Favorites onClick={(recipe) => this.toggleModal(recipe)} />;
      } else if (this.state.showSearch) {
        title = 'Search Results';
        body = (
          <SearchResults listType={this.state.searchType} listValue={this.state.searchValue} 
            onClick={(recipe) => this.toggleModal(recipe)}
          />
        );
      }
      return (
        <div className="homepage" style={this.state.isModalOpen ? {backgroundColor: 'rgba(0,0,0, 0.2)'} : {}}>
          <div className="header">
          <Link to="/homepage" onClick={() => this.viewHomePage()} style={this.state.isModalOpen ? {pointerEvents: 'none'} : {}}>
            <img src={homepageBG} alt="" className="background" />
            <img src={logo} alt={"logo"} className="logo" />
          </Link>
          <div className="desktop-search" style={this.state.isModalOpen ? {pointerEvents: 'none'} : {}}>
            <Search onClose={() => this.toggleSearch()} submitSearch={(listName, listValue) => this.submitSearch(listName, listValue, false)} />
          </div>
          <h1 className="title">
            {title}
          </h1>
            { 
              this.state.hasFavorites && !this.state.showFavorites ? 
              <Link to="/homepage/favorites">
                <div className="button-favorites"
                  role="button"
                  tabIndex={0}
                  onClick={() => this.viewFavorites()}
                >
                  <i className="fas fa-heart icon-favorite filled" /> View Favorites
                </div>
              </Link>
              : null
            }
          </div>
          {body}
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
              // updateFavorites={(hasFavorites) => this.updateFavorites(hasFavorites)}
              recipe={this.state.recipe}
            />
          </Modal>
          <Modal isOpen={this.state.isSearchOpen}>
            <Search onClose={() => this.toggleSearch()} submitSearch={(listName, listValue) => this.submitSearch(listName, listValue, true)} />
          </Modal>
        </div>
      );
    }
}