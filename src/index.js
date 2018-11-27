import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import * as ROUTES from './constants/routes';
import App from './components/App';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import registerServiceWorker from './registerServiceWorker';

const Root = () => (
  <Router>
    <Switch>
      <Route exact path={ROUTES.HOME} component={App} />
      <Route path={ROUTES.LOGIN} component={Login} />
      <Route path={ROUTES.REGISTER} component={Register} />
    </Switch>
  </Router>
)

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
