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

      if (response.status === 200) {
        const data = await response.json();

        Cookies.set('token', response.headers.get("Authorization"));
        Cookies.set('id', data.user.id);
        console.log(data)
        setUser({
          isLoggedIn: true,
          token: response.headers.get("Authorization"),
          id: data.user.id
        });

        navigate('/')
      } else if (response.status >= 400) {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError('Erreur');
    }
  };

  return (
    <div className="body center-form" >
      <Form onSubmit={handleSubmit}>
      <div className="form-title">Créer un compte</div>
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
      <Button className="submit-button" type="submit">Créer et se connecter </Button>
      </div>
    </Form>
  </div>
  )
}

export default Signup;
