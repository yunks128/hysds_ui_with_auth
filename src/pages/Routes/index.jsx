import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";

import { handleAuth } from "../../auth";
import { authenticate, logout } from "../../redux/actions";

import LoadingPage from "../LoadingPage";

import Tosca from "../Tosca";
import ToscaOnDemand from "../ToscaOnDemand";
import ToscaUserRules from "../ToscaUserRules";
import ToscaRuleEditor from "../ToscaRuleEditor";

import Figaro from "../Figaro";
import FigaroOnDemand from "../FigaroOnDemand";
import FigaroUserRules from "../FigaroUserRules";
import FigaroRuleEditor from "../FigaroRuleEditor";

import { ROOT_PATH, AUTH } from "../../config/index.js";

import "./style.scss";

const Routes = (props) => {
  const { authenticated, darkMode } = props;
  // const [mounted, setMounted] = useState(false);
  const classTheme = darkMode ? "__theme-dark" : "__theme-light";

  useEffect(() => {
    // setMounted(true);
    if (AUTH) {
      handleAuth(props.authenticate);
    }
  }, []);

  if (AUTH && !authenticated) {
    return (
      <div className={classTheme}>
        <LoadingPage />
      </div>
    );
  }

  return (
    <div className={classTheme}>
      <Router basename={ROOT_PATH}>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/tosca" />} />
          <Route exact path="/tosca" component={Tosca} />
          <Route exact path="/tosca/on-demand" component={ToscaOnDemand} />
          <Route exact path="/tosca/user-rules" component={ToscaUserRules} />
          <Route exact path="/tosca/user-rule" component={ToscaRuleEditor} />
          <Route
            exact
            path="/tosca/user-rule/:rule"
            component={ToscaRuleEditor}
          />
          <Route exact path="/figaro" component={Figaro} />
          <Route exact path="/figaro/on-demand" component={FigaroOnDemand} />
          <Route exact path="/figaro/user-rules" component={FigaroUserRules} />
          <Route exact path="/figaro/user-rule" component={FigaroRuleEditor} />
          <Route
            exact
            path="/figaro/user-rule/:rule"
            component={FigaroRuleEditor}
          />
        </Switch>
      </Router>
    </div>
  );
};

const mapStateToProps = (state) => ({
  authenticated: state.authReducer.authenticated,
  token: state.authReducer.token,
  darkMode: state.themeReducer.darkMode,
});

const mapDispatchToProps = (dispatch) => ({
  authenticate: (payload) => dispatch(authenticate(payload)),
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
