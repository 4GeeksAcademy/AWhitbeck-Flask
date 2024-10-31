import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export const Profile = () => {
    const { token } = useParams()
    const [user, setUser] = useState(false)

    useEffect(() => {
        async function getUser() {
            const opts = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': "Bearer " + token,
                },
            };
            let response = await fetch(process.env.BACKEND_URL + "api/private", opts)
            let data = await response.json()
            if (data.message == "You have access!") {
                setUser(true)
            }
        }
        getUser()
    }, [])
    return (
        <div>
            {user == true ? <h1>
                Welcome back!
            </h1> : <h1>YOU DON'T BELONG HERE!!</h1>}
        </div>)
};