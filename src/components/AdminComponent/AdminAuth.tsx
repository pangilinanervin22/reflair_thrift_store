"use client"

import { useState } from "react";
import AdminLoginForm from "../Forms/AdminLoginForm/AdminLoginForm";
import AdminRegisterForm from "../Forms/AdminRegisterForm/AdminRegisterForm";

export default function AdminAuth() {
    const [isRegistering, setIsRegistering] = useState(false)
    return (
        <>
            {isRegistering ?
                <AdminRegisterForm registering={() => setIsRegistering(false)} /> :
                <AdminLoginForm registering={() => setIsRegistering(true)} />
            }
        </>
    )
}