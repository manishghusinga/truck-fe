import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { apis } from "../../service/api";

export default function Login() {
    const [email, setEmail] = useState("eve.holt@reqres.in");
    const [password, setPassword] = useState("cityslicka");

    function submitLogin() {
        if (!email || !password) {
            toast.error("please enter details")
            return;
        }

        let payload = {
            email: email,
            password: password
        }

        apis.login(payload)
            .then(resp => {
                if (resp.token) {
                    sessionStorage.setItem("token", resp.token)
                    window.location.href = "/"
                    return;
                }
                toast.error("something went wrong");
            })
    }

    return (
        <div className="pt-3 text-center">
            <Form onSubmit={submitLogin}>
                <FormGroup>
                    <Label>
                        <div className="text-left">
                            Email:
                        </div>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </Label>
                </FormGroup>

                <FormGroup>
                    <Label>
                        <div className="text-left">
                            Password:
                        </div>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </Label>
                </FormGroup>

                <FormGroup>
                    <Button>
                        Login
                    </Button>
                </FormGroup>
            </Form>
        </div>
    )
}
