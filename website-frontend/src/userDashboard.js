import React from 'react'

const userDashboard = () => {
    const logout = ()=>{
        if(localStorage.getItem("studentid")){
            localStorage.removeItem('studentid');
            window.location = "/";
        }
    }
    return (
        <div>
            <h1>Welcome to User Dashboard</h1>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default userDashboard
