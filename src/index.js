import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import 'semantic-ui-css/semantic.min.css';
import * as ROUTES from './constants/routes';
import App from './components/App';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Spinner from './Spinner';
import registerServiceWorker from './registerServiceWorker';
import Firebase from './firebase';
import rootReducer from './reducers';
import { setUser, clearUser } from './actions';

const store = createStore(rootReducer, composeWithDevTools());

class Root extends React.Component {
  componentDidMount() {
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.setUser(user);
        this.props.history.push(ROUTES.HOME);
      } else {
        this.props.history.push(ROUTES.LOGIN);
        this.props.clearUser();
      }
    });
  }

  render() {
    return this.props.isLoading ? <Spinner /> : (
      <Switch> 
        <Route exact path={ROUTES.HOME} component={App} />
        <Route path={ROUTES.LOGIN} component={Login} />
        <Route path={ROUTES.REGISTER} component={Register} />
      </Switch>
    );
  }
}

const mapStateFromProps = state => ({
  isLoading: state.user.isLoading
});

const RootWithAuth = withRouter(
  connect(
    mapStateFromProps, 
    { setUser, clearUser }
    )(Root)
  );

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
