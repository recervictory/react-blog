import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const logIn = async () => {
        try {
            await signInWithEmailAndPassword(getAuth(), email, password);
        } catch (err) {
            setError(err.message);
        }
    }

  return (
    <div>
      <h1>Log In</h1>
      {error && <p className="error">{error}</p>} 
      <input type="text"  placeholder="Enter your Email" value={email} onChange={ e => setEmail(e.target.value)}/>
      <input type="password" placeholder="Enter your password" value={password} onChange={ e => setPassword(e.target.value)}/>
      <button onClick={logIn} >Log In</button>
        <Link to="/newuser"> Create New User</Link>
    </div>
  )
}

export default LoginPage;
