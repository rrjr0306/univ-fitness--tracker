import React, {useState} from 'react';
import { fetchLogin, fetchRegister } from "./api/api";

const AccountForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return(
        <form>
            <h1>Sign Up</h1>
            <div>
                <label>Username</label>
                    <input 
                    type="text" 
                    value={username} 
                    placeholder="username" 
                    required
                    onChange={(event) => {
                        setUsername(event.target.value)
                    }}
                    />
            </div>
            <div>
                <label>Password</label>
                    <input 
                    type="text" 
                    value={password} 
                    placeholder="password" 
                    minLength="8"
                    required
                    onChange={(event) => {
                        setPassword(event.target.value)
                    }}/>
            </div>
            <button type="submit">
                Sign Up
            </button>
        </form>
    )
}

export default AccountForm;