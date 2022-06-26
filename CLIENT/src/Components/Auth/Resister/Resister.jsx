import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const axios = require("axios");

const theme = createTheme();

export const Register = () => {
 const baseUrl = `https://crimescheck.herokuapp.com` 

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = ({
      username: data.get('username'),
      password: data.get('password'),
    });
    signUp(user)
    async function signUp(user) {
      const letters = /^[0-9a-zA-Z]+$/;

      if(user.username.match(letters))
        {
            const a = await axios.post(`${baseUrl}/signup`, user)
            const response = a.data;
            if(response.status === 'success') {
      
            }else{
              alert('Please Provide Unique credential')
            }
            alert('please signin now')
            navigate('/signin')
          
        }
        else
        {
        alert('User address must have alphanumeric characters only');
        return false;
        }
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" style={{marginBottom: "20px"}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
        
      </Container>

    </ThemeProvider>
  );
}