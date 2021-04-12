import React from 'react'
import { Container, Modal, ModalHeader, ModalBody, Alert } from 'reactstrap';
import Dashboard from './pages/Dashboard';
import AuthenticatedRoute from "./auth/AuthenticatedRoute";
import { ToastContainer } from "react-toastify";
import AddUser from "./pages/AddUser";

export default function AppShell() {
    return (
        <div>
            <Container className="h-100">
                <AuthenticatedRoute exact path="/" component={Dashboard} />
                <AuthenticatedRoute exact path="/dashboard" component={Dashboard} />
                <AuthenticatedRoute exact path="/add-user" component={AddUser}/>
            </Container>
            <ToastContainer />
        </div>
    )
}
