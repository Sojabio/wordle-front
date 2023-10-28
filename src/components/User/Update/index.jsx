import { useState } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../../../stores/userAtom';
import { API_URL } from '../../../stores/apiUrl';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';

function UpdateUser() {
  const [newUsername, setNewUsername] = useState('');
  const [user, setUser] = useAtom(userAtom);
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleUsernameUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(API_URL+'/api/user/update-username', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': user.token
        },
        body: JSON.stringify({
            newUsername: newUsername,
        }),
      });

      if (response.ok) {
        const data = await response.json();


        Cookies.set('username', newUsername);

        setUser({
          ...user,
          username: newUsername,
        });

        setError('Modification réussie');
        console.log("modification réussie");
      } else {
        setError('La modification a échoué');
      }
    } catch (error) {
      setError('Une erreur s\'est produite');
    }
  };


  return (
    <div className="col-md-12">
      <Form onSubmit={handleUsernameUpdate}>
        <Form.Group controlId="formBasicUsername">
          <h3>Want to change your username ? </h3>
          <h3>Your current username is {user.username} </h3>
          {error && <p>{error}</p>}
          <Form.Control
            type="username"
            placeholder="new username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            required
          />
        </Form.Group>
        <div>
          <Button type="submit">Update username</Button>
        </div>
      </Form>
    </div>
  );

}

export default UpdateUser
