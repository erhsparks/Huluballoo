import React from 'react';
import { Provider } from 'react-redux';
import {
  Router,
  Route,
  IndexRoute,
  hashHistory
} from 'react-router';

import {
  fetchCategories,
  fetchCategory
} from '../actions/categories_actions';

import App from './app.jsx';
import Home from './home.jsx';
import CategoryDetailContainer from './categories/category_detail_container';
import { About } from './footer/about';
import { Jobs } from './footer/jobs';
import { Disclaimer } from './footer/disclaimer';
import { Terms } from './footer/terms';
import { Privacy } from './footer/privacy';

const Root = ({ store }) => {
  const _redirectIfLoggedIn = (nextState, replace) => {
    if (store.getState().session.currentUser) {
      replace('/');
    }
  };

  const loadCategories = () => {
    store.dispatch(fetchCategories());
  };

  const loadCategory = nextState => {
    store.dispatch(fetchCategory(nextState.params.categoryId));
  };

  return (
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={Home} onEnter={loadCategories} />
          <Route path=':categoryId' component={CategoryDetailContainer} onEnter={loadCategory} />
          <Route path='about' component={About} />
          <Route path='jobs' component={Jobs} />
          <Route path='disclaimer' component={Disclaimer} />
          <Route path='terms' component={Terms} />
          <Route path='privacy' component={Privacy} />
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
