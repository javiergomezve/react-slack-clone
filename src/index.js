import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import * as ROUTES from './constants/routes';
import App from './components/App';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import registerServiceWorker from './registerServiceWorker';
import Firebase from './firebase';

class Root extends React.Component {
  componentDidMount() {
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.history.push(ROUTES.HOME);
      }
    });
  }
  
  render() {
    return (
      <Switch> 
        <Route exact path={ROUTES.HOME} component={App} />
        <Route path={ROUTES.LOGIN} component={Login} />
        <Route path={ROUTES.REGISTER} component={Register} />
      </Switch>
    );
  }
}

const RootWithAuth = withRouter(Root);

ReactDOM.render(
  <Router>
    <RootWithAuth />
  </Router>
  , document.getElementById('root'));
registerServiceWorker();
