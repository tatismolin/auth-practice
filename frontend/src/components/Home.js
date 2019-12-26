import React, {Component} from "react";
import Registration from "./auth/Registration";
import Login from "./auth/Login";

export default class Home extends Component{

    handleSuccessfulAuth = (data) => {
        const {handleLogin, history} = this.props
        handleLogin(data)
        history.push("/dashboard")
    }

    handleLogoutClick = () => {
        const {handleLogout} = this.props
        fetch("http://localhost:3000/logout", {method: "DELETE"}, {withCredentials: true})
            .then(response => response.json())
        handleLogout()
    }

    render(){
        const {loggedInStatus} = this.props
        return(
            <div className="home">
                <h1>Home</h1>
                <h1>Status: {loggedInStatus}</h1>
                <button onClick={() => this.handleLogoutClick()}>Log Out</button>
                <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
                <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
            </div>
        );
    }
  
}