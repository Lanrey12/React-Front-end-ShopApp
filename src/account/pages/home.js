import React from 'react';
import { accountService } from '../../redux/actions/userActions'


function Home() {
    const user = accountService.userValue;
    
    return (
        <div className="p-4">
            <div className="container">
    <h1>Hi {user.firstName}!{user.email}</h1>
                <p>You're logged in with React & JWT!!</p>
            </div>
        </div>
    );
}

export { Home };