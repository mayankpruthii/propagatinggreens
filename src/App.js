// import logo from './logo.svg';
import React from "react";
import './App.css';
import Aux from "./hoc/hoc";
import Home from "./containers/home/home";

function App() {
  return (
    <Aux>
      <Home />
    </Aux>
  );
}

export default App;
