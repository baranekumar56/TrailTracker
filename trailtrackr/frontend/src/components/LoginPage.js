import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [centerId, setCenterId] = useState('');
  const [wrongDataFlag, setWrongDataFlag] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      let obj = {}
      obj['name'] = username;
      obj['password'] = password;
      obj['centerId'] = centerId;
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      });
  
      if (response.status !== 200) {
        setWrongDataFlag(true)
        return
      }
  
      const contentType = response.headers.get('content-type');
      let data;
  
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
        console.log(data)
      } else {
        const text = await response.text();
        console.error('Unexpected response type:', text);
        return;
      }
  
      localStorage.setItem('userdetails', JSON.stringify(data));
      setWrongDataFlag(false)
      // Navigate or handle the data as needed
      navigate('/mainpage');
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div style={styles.container}>
      <div style={styles.leftPanel}>
        <div style={styles.headingContainer}>
          <h1 style={styles.heading}>Trail Trackr</h1>
        </div>
        <p style={styles.info}>Manage your trailers efficiently from distribution centers to stores.</p>
        {/* Add custom Walmart design elements here */}
      </div>
      <div style={styles.rightPanel}>
        <h2>Sign in</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            style={styles.input}
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={styles.input}
          />
          <input 
            type="text" 
            placeholder="Center ID" 
            value={centerId} 
            onChange={(e) => setCenterId(e.target.value)} 
            style={styles.input}
          />
          <button type="submit" style={styles.button} onClick={handleLogin}>Login</button>
        </form>
        {wrongDataFlag && <InvalidData/> }
      </div>
    </div>
  );
};

const InvalidData = () => {
  return (
    <div>
      <h3 style={styles.invalid}>Invalid credentials</h3>
    </div>
  )
}
const styles = {
  headingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  },
  invalid:{
    color:'red',
    fontSize:"10px"
  },
  heading: {
    padding:'0px',
    fontSize: '70px',
    color: '#ffffff',
    marginBottom: '10px',
  },
  trademark: {
    fontSize: '14px',
    color: '#0071ce',
    fontWeight: 'bold',
    position: 'absolute',
    right: '-80px',
    top: '-10px',
  },
  info: {
    fontSize: '18px',
    fontWeight: 'bolder',
    textAlign: 'center',
    marginTop: '20px',
    color:'#ffffff'
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  leftPanel: {
    flex: 1,
    backgroundColor: '#1A1110',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  rightPanel: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#ffffff',
  },
  form: {
    width: '300px',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#0071ce',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default LoginPage;
