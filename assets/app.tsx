import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";

ReactDOM.render(
    <Router>
        <Home />
        <Route exact path="/test/xd">
            <p>lol</p>
        </Route>
    </Router>,
    document.getElementById("root"),
);
