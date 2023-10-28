import { useState } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../../../stores/userAtom';
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import { API_URL } from '../../../stores/apiUrl';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Signup () {
  const [, setUser] = useAtom(userAtom);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch(API_URL+'/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
          }
        ),
      });
      console.log('After fetch request');

      if (response.ok) {
        const data = await response.json();

        Cookies.set('token', data.accessToken);
        Cookies.set('id', data.id);
        Cookies.set('username', data.username);
        
        console.log(data)
        setUser({
          isLoggedIn: true,
          token: data.accessToken,
          id: data.id,
          username: data.username
        });

        navigate('/')
      } else if (response.status >= 400) {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.log('Error object:', error);
      setError('Erreur');
    }
  };

  return (
    <div className="body center-form" >
      <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicUsername">
        {error && <p>{error}</p>}
        <Form.Control
          type="username"
          placeholder="nom"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Control
          className='form-border'
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Control
          className='form-border'
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <div className="center-button">
      <Button className="submit-button" type="submit">Sign up and log in </Button>
      </div>
    </Form>
  </div>
  )
}

export default Signup;
