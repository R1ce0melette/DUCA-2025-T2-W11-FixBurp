import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Message, Header, Segment, Grid, Icon } from 'semantic-ui-react';
import { registerUser } from '../services/authService';

// Registration page component for new users. Integrates with Firebase Auth and Firestore.
const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle input changes and update form state
  const handleChange = (e, { name, value }) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error on change
  };

  // Validate form fields before submitting
  const validateForm = () => {
    if (!formData.username || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setLoading(true); // Show loading spinner
    // Call registerUser from authService to create user in Firebase
    const payload = {
      username: formData.username,
      password: formData.password
    };
    const result = await registerUser(payload);
    if (result.success) {
      // On success, redirect to login page with a message
      navigate('/login', {
        state: {
          message: 'Registration successful! Please sign in with your credentials.'
        }
      });
    } else {
      // Show error message from Firebase
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <Container>
      <Grid textAlign="center" style={{ minHeight: '100vh', paddingTop: '2em' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            <Icon name="user plus" />
            Join DEV@Deakin
          </Header>
          <Form size="large" onSubmit={handleSubmit}>
            <Segment stacked>
              {error && (
                <Message negative>
                  <Message.Header>Registration Failed</Message.Header>
                  <p>{error}</p>
                </Message>
              )}
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <Button
                color="teal"
                fluid
                size="large"
                type="submit"
                loading={loading}
                disabled={loading}
              >
                Sign Up
              </Button>
            </Segment>
          </Form>
          <Message>
            Already have an account? <Link to="/login">Sign In</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Register;
