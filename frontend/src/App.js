import "./App.css";
import React, {Component} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";

export default class App extends Component{

  state = {
    loggedInStatus: "NOT_LOGGED_IN",
    user: {}
  }

  checkLoginStatus = () => {
    const {loggedInStatus} =this.state
    fetch("http://localhost:3000/logged_in", {method: "GET"}, {withCredentials: true})
      .then(response => response.json())
      .then(data => {
        if(data.logged_in && loggedInStatus === "NOT_LOGGED_IN"){
          this.setState({
            loggedInStatus: "LOGGED_IN",
            user: data.user
          })
        }else if(!data.logged_in && loggedInStatus === "LOGGED_IN"){
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {}
          })
        }
    })
  }

  componentDidMount = () => {
    this.checkLoginStatus()
  }

  handleLogout = () => {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    })
  }

  handleLogin = (data) => {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    })
  }

  render(){
    const {loggedInStatus} = this.state
    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route 
              exact 
              path={"/"} 
              render={props => (
                <Home {...props} 
                  handleLogin={this.handleLogin} 
                  handleLogout={this.handleLogout}
                  loggedInStatus={loggedInStatus} 
                />
              )} 
            />
            <Route 
              exact 
              path={"/dashboard"} 
              render={props => (
                <Dashboard {...props} loggedInStatus={loggedInStatus} />
              )} 
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }

}