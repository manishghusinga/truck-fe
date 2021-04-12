import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { FormGroup, Input, Label, Form, Button } from 'reactstrap'
import { apis } from '../../service/api';
import { useHistory, useLocation } from "react-router-dom";
import { apiService } from '../../service/service';

export default function AddUser() {
    let history = useHistory();
    let location = useLocation()
    const {
        email = "",
        first_name = "",
        last_name = "",
        id
    } = location.state && location.state.data || {};

    const [emailId, setEmail] = useState(email);
    const [firstName, setFirstName] = useState(first_name);
    const [lastName, setLastName] = useState(last_name);
    const [phone, setPhone] = useState("");

    const addUser = () => {

        if (!emailId || !firstName || !lastName) {
            return toast.error("please add all details first!")
        }

        let payload = {
            email: emailId,
            first_name: firstName,
            last_name: lastName,
            phone: phone,
        }

        if (id) {
            payload = Object.assign(payload, { id: id })
            apis.updateUser(payload)
                .then(resp => resp)
        }

        apis.addUser(payload)
            .then(resp => {
                if (resp.id) {
                    toast.success("user  added successfully")
                    history.push("/");
                    return;
                }
                toast.error("something went wrong, user not added")
            })
    }

    return (
        <div className="mt-2 text-center">
            <h4 className="bold">
                {
                    email ?
                        "Edit User"
                        :
                        "Add User"
                }
            </h4>
            <Form>
                <FormGroup>
                    <Label>
                        First Name:
                        <Input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)} />
                    </Label>
                </FormGroup>

                <FormGroup>
                    <Label>
                        Last Name:
                        <Input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)} />

                    </Label>
                </FormGroup>

                <FormGroup>
                    <Label>
                        Email:
                        <Input type="email" value={emailId} onChange={(e) => setEmail(e.target.value)} />
                    </Label>
                </FormGroup>

                <FormGroup>
                    <Label>
                        Phone:
                        <Input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </Label>
                </FormGroup>

                <FormGroup>
                    <Button onClick={addUser}>
                        {
                            email ?
                                "Edit User"
                                :
                                "Add User"
                        }
                    </Button>
                </FormGroup>
            </Form>
        </div>
    )
}
