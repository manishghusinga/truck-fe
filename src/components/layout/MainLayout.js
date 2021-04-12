import React, { useState, useContext, useReducer, useEffect } from 'react';
import { HashRouter as Router, Route, Switch, Redirect, } from 'react-router-dom';
import { Row, Col, Container } from 'reactstrap';
import Dashboard from '../pages/Dashboard';
import { apis } from "../../service/api";
import { Store } from "../../store/store";
import Login from "../pages/Login";
import AppShell from "../AppShell"
import AuthenticatedRoute from "../auth/AuthenticatedRoute";
import UnauthenticatedRoute from "../auth/UnauthenticatedRoute";
import { ToastContainer } from "react-toastify";

function MainLayout() {
    const [storeState, dispatch] = useContext(Store);

    useEffect(() => {
        // getTaskList();
        // getUserList();
    }, []);


    return (
        <div className="main-layout h-100 w-100">
            {/* <Dashboard></Dashboard> */}
            <div className="d-flex flex-column flex-lg-row">
                <div className="pr-0 pr-lg-3">
                </div>
                <div className="w-100">
                    <main>
                        <Router>
                            <Switch>
                                <UnauthenticatedRoute exact path="/login" component={Login} />
                                <AuthenticatedRoute path="/" component={AppShell} />
                                <ToastContainer />
                            </Switch>
                        </Router>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default MainLayout;
