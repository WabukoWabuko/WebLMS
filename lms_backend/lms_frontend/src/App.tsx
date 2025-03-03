import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';

interface Subject {
  id: number;
  name: string;
  form: number;
  teacher: string;
}

const App: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/', {
        username,
        password,
      });
      const newToken = response.data.access;
      setToken(newToken);
      localStorage.setItem('token', newToken); // Store token locally
      fetchSubjects(newToken);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const fetchSubjects = (token: string) => {
    axios.get('http://127.0.0.1:8000/api/subjects/', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => setSubjects(response.data))
    .catch(error => console.error('Error fetching subjects:', error));
  };

  if (!token) {
    return (
      <Container>
        <Typography variant="h3" gutterBottom>Kenyan High School LMS</Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">Login</Button>
        </form>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h3" gutterBottom>Kenyan High School LMS</Typography>
      <Typography variant="h5">Subjects</Typography>
      <List>
        {subjects.map(subject => (
          <ListItem key={subject.id}>
            <ListItemText primary={`${subject.name} (Form ${subject.form})`} secondary={`Teacher: ${subject.teacher}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default App;
