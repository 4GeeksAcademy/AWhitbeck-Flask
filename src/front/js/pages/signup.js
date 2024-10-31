import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate, useNavigate } from "react-router-dom";

export const Signup = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()
    const[email, setEmail] = useState(null)
    const[password, setPassword] = useState(null)

    const handleSignup = () => {
        fetch('https://redesigned-potato-4jgj4wxp4r9gf7q7p-3001.app.github.dev/api/signup', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: email,
                password: password,
              })
        }) .then(response => {
            if (response.ok) {
                navigate('/login')
                return;
            }
            throw new Error('Failed to signup.')
        }).catch(e => console.log(e))
    }

    useEffect(() => {

    }, [])
    return (
        <div className="">
            <div className="mb-3 row">
                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                    <input type="text" onChange={(e) => setEmail(e.target.value)} className="form-control" id="staticEmail" />
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                <div className="col-sm-10">
                    <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" id="inputPassword" />
                </div>
            </div>
            <button type="button" onClick={handleSignup} className="btn btn-primary">Signup</button>
        </div>
    );
};
