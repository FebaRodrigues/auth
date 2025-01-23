import  { useState } from 'react';
import axios from '../axios';//backend the api ne connect cheyyan vendi axios use akane
import { useNavigate } from 'react-router-dom';
//useNavigate click akumbo welcome to dashbord pagelek veranam

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });//username: '', password: '' idh initial stage use state de
  const [error, setError] = useState('');
  const navigate = useNavigate();// navigate lek store aaki useState

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });//...formData spread operateor ellam formDatal store aagum
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/login', formData);///auth/login// data ille token aa token vechit respond cheynm
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');//respond cheydit /dashboardlek veranam navigate aagum
    } catch (err) {
      setError(err.response.data.error);
    }
  };


  //simple design aan
  //error vannal red color aayit veranam
  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;