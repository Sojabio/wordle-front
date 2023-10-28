import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import { useAtom } from 'jotai';
import { userAtom } from './stores/userAtom';
import { useEffect } from 'react';
import Cookies from 'js-cookie';


import Home from './pages/Home';
import Signup from './pages/Auth/Signup';
import Signin from './pages/Auth/Signin';

import Navbar from './components/Navbar'

import Statistics from './pages/User/Statistics';
import Parameters from './pages/User/Parameters';

import UpdateUser from './components/User/Update';

import Unauthorized from './pages/Auth/Unauthorized';


function App() {
  const [user] = useAtom(userAtom);
  const [, setUser] = useAtom(userAtom);

  useEffect(() => {
    const token = Cookies.get('token');
    const id = Cookies.get('id');
    const username = Cookies.get('username');

    if (token) {
      setUser({
        id: id,
        isLoggedIn: true,
        token: token,
        username: username
      });
    }
  }, []);

  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/signin" element={<Signin/>}/>
          {user.isLoggedIn ? (
            <>
              <Route path="/statistics" element={<Statistics/>}/>
              <Route path="/parameters" element={<Parameters/>}/>
              <Route path="/update" element={<Parameters/>}/>
            </>
          ) : (
            <>
              <Route path="/parameters" element={<Unauthorized/>}/>
              <Route path="/statistics" element={<Unauthorized/>}/>
              <Route path="/update" element={<Unauthorized/>}/>

            </>
          )}
        </Routes>
      </Router>
    </>
  )
}

export default App
