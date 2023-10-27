import { useState } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../../../stores/userAtom';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../../../stores/apiUrl';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Signin() {
  const [, setUser] = useAtom(userAtom);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(API_URL+'/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            username: username,
            password: password
          }
        }),
      });

      if (response.ok) {
        const data = await response.json();
        Cookies.set('token', response.headers.get("Authorization"));
        Cookies.set('id', data.user.id);
        setUser({
          isLoggedIn: true,
          token: response.headers.get("Authorization"),
          id: data.user.id
        });
        navigate('/')
        console.log("authentification réussie");
        console.log(response.headers.get("Authorization"));
      } else {
        setError('Identifiants invalides');
      }
    } catch (error) {
      setError('Une erreur s\'est produite');
    }
  };

  return (
    <div className="col-md-12">
      <Form onSubmit={handleSignin}>
        <h3> Connexion </h3>
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
        <Form.Group controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <div>
          <Button type="submit">Se connecter</Button>
        </div>
      </Form>
    </div>
  );
}

export default Signin;
