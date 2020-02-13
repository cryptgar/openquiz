import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";

ReactDOM.render(
    <Router>
        <Home />
    </Router>,
    document.getElementById("root"),
);
