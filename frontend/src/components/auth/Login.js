import React, {Component} from "react";

export default class Login extends Component{

  state = {
    email: " ",
    password: " ",
    loginErrors: " "
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const {email, password} = this.state
    fetch("http://localhost:3000/sessions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            user: {
                email: email,
                password: password
            }
        })
    },
    {withCredentials: true
    })
        .then(response => response.json())
        .then(data => {
            if(data.logged_in === true){
                this.props.handleSuccessfulAuth(data)
            }
        })
  }

  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  render(){
    const {email, password} = this.state
    return(
      <div className="login">
        <form onSubmit={this.handleSubmit}>
          <input 
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={this.handleChange}
            required
          />
          <input 
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={this.handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
  
}