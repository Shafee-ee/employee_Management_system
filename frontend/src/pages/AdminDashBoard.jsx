import React from "react";
import { useAuth } from "../context/AuthContext";

const AdminDashBoard = () => {

    const { user } = useAuth()
    return (
        <div>Admin DashBoard</div>
    )
}

export default AdminDashBoard