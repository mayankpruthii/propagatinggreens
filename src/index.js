import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Geolocation from "./containers/geolocation/geolocation";
import { Route, BrowserRouter as Router } from "react-router-dom";


ReactDOM.render(
  <Router>
    <Route path="/" component={App} />
    <Route path="/geolocation" component={Geolocation} />
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
