import React, { Component} from "react";
import UserList from "./containers/userListContainer";
import "./App.css";

class App extends Component{
  render(){
    return(
      <div className="App">
        <UserList/>
      </div>
    );
  }
}

export default App;