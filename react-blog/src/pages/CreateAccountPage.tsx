import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';

const CreateAccountPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const createAccount = async () => {
        try {
            if (password !== confirmPassword) {
                setError('Password does not match');
                return;
            } else {
                await createUserWithEmailAndPassword(getAuth(), email, password);
                navigate('/articles');
            }
        } catch(err) {
            setError(err.massage);
        }
    }


  return (
    <div>
      <h1>Log In</h1>
      {error && <p className="error">{error}</p>} 
      <input type="text"  placeholder="Enter your Email" value={email} onChange={ e => setEmail(e.target.value)}/>
      <input type="password" placeholder="Enter your password" value={password} onChange={ e => setPassword(e.target.value)}/>
      <input type="password" placeholder="Enter your password" value={confirmPassword} onChange={ e => setConfirmPassword(e.target.value)}/>
      <button onClick={createAccount} >Log In</button>
        <Link to="/login"> Already Have a new account? Log In</Link>
    </div>
  )
  
}

export default CreateAccountPage;
