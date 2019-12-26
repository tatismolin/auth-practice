import React from "react";

export default function Dashboard({loggedInStatus}){

    return(
      <div className="dashboard">
        <h1>Dashboard</h1>
        <h1>Status: {loggedInStatus}</h1>
      </div>
    );
  
}