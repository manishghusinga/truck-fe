import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import {
    Row,
    Col,
    Button,
    Modal,
    ModalBody,
    FormGroup,
    FormFeedback,
    Input,
    Label,
    Form
} from 'reactstrap';
import { Store } from "../../store/store";
import moment from "moment";
import { apis } from "../../service/api";
import { toast } from 'react-toastify';
import { apiService } from '../../service/service';

function Dashboard(props) {
    const [storeState, dispatch] = useContext(Store);
    let history = useHistory();

    function getUser() {
        apis.getUser()
            .then(response => {
                dispatch({ type: 'userList', reducer: 'userList', payload: { userList: response } });
            })
    }
    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        console.log(storeState.userList, "storeState.userListstoreState.userList")
    })

    const goToAddUserPage = () => {
        history.push("/add-user")
    }

    const deleteUser = (data) => {
        apis.deleteUser({ id: data.id })
            .then(resp => {
                if (resp && resp.success === false) {
                    return toast.error("something went wrong");
                }
                getUser();
                toast.success("user has been deleted");
            })
    }

    const editUser = (data) => {
        history.push({
            pathname: '/add-user',
            state: {
                data: data,
            },
        })
    }

    return (
        <div className="px-3">
            <Row className="pt-3">
                <Row className="py-4">
                    <div>
                        <Button onClick={goToAddUserPage}>
                            Add User
                            </Button>
                    </div>
                </Row>

                <Form>
                    <table className="table">
                        <thead>
                            <th>Name</th>
                            <th>Photo</th>
                            <th>Email</th>
                            <th>Action</th>
                        </thead>
                        {
                            storeState.userList && (storeState.userList.data) ?
                                <tbody>
                                    {
                                        storeState.userList.data.map((item, index) =>
                                            <tr key={index}>
                                                <td>{`${item.first_name} ${item.last_name}`}</td>
                                                <td>
                                                    <img src="https://reqres.in/img/faces/1-image.jpg" width={"40"} />
                                                </td>
                                                <td>{item.email}</td>
                                                <td>
                                                    <span>
                                                        <button
                                                            className="btn btn-link"
                                                            onClick={() => editUser(item)}>

                                                            Edit
                                                        </button>

                                                        <button
                                                            className="btn btn-link"
                                                            onClick={() => deleteUser(item)}>

                                                            Delete
                                                        </button>
                                                    </span>
                                                </td>
                                            </tr>
                                        )}
                                </tbody>
                                :
                                null
                        }
                    </table>
                </Form>
            </Row>
        </div>
    );
}

export default Dashboard;