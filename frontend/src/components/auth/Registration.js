import React, {Component} from "react";

export default class Registration extends Component{

  state = {
    email: " ",
    password: " ",
    password_confirmation: " ",
    registrationErrors: " "
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const {email, password, password_confirmation} = this.state
    fetch("http://localhost:3000/registrations", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
      },
      body: JSON.stringify({
          user: {
            email: email,
            password: password,
            password_confirmation: password_confirmation
          }
      })
    },
    {withCredentials: true
    })
      .then(response => response.json())
      .then(data => {
        if(data.status === "created"){
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
    const {email, password, password_confirmation} = this.state
    return(
      <div className="registration">
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
          <input 
            type="password"
            name="password_confirmation"
            placeholder="Password"
            value={password_confirmation}
            onChange={this.handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
  
}