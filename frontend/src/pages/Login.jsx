import React, { useState } from "react";
import axios from "axios";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http:localhost:5000/api/auth/login", { email, password });
            console.log(response)
        }

        catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="flex flex-col items-center h-screen  justify-center bg-gradient-to-b from-customYellow to-gray-100 to-50% space-y-6" >
            <h2 className="font-mono text-3xl text-customBlue">Employee Management system</h2>
            <form onSubmit={handleSubmit}>
                <div className="border shadow p-6 w-80 bg-customBlue">
                    <h2 className="text-2xl font-bold mb-4 text-center text-white"> Login</h2>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-white">Email</label>
                        <input
                            type="email"
                            className="w-full px-3 py-2 border"
                            placeholder="enter email..."
                            onChange={(e) => setEmail(e.target.value)} />

                    </div>
                    <div>
                        <label htmlFor="password" className="block text-white">Password</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border"
                            placeholder="*******"
                            onChange={(e) => setPassword(e.target.value)} />


                    </div>
                    <div className="mb-4 flex items-center justify-between ">
                        <label className="inline-flex">
                            <input type="checkbox" className="form-checkbox" />
                            <span className="ml-2 text-white">Remember me </span>
                        </label>

                        <a href="#" className="text-customYellow">Forgot Password?</a>

                    </div>

                    <button type="submit"
                        className="w-full bg-customRed text-white py-2">Login</button>
                </div>
            </form>

        </div >
    )

}

export default Login