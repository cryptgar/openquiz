import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Home from "./components/Home";
import CreatePage from "./components/Create";
import { NavBar } from "./components/NavBar";

ReactDOM.render(
    <Router>
        <CssBaseline />
        <NavBar />
        <Route exact path="/">
            <Home />
        </Route>
        <Route exact path="/create">
            <CreatePage />
        </Route>
    </Router>,
    document.getElementById("root"),
);
