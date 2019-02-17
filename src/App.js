import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './stylesheets/main.css';
import HomePage from './components/HomePage/HomePage.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Hello',
    };
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter basename="/recipefinder">
          <div>
            <Switch>
              <Route exact path="/" render={props => <Redirect to="/homepage" />} />
              <Route exact path="/homepage" render={props => <HomePage />} />
              <Route exact path="/homepage/search/:queryType/:query" render={props => <HomePage />} />
              <Route exact path="/homepage/:recipename" render={props => <HomePage />} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
