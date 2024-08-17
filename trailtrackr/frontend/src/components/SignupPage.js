import React from 'react';
import AuthForm from './AuthForm';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();

  const handleSignup = (credentials) => {
    // Add logic to handle signup
    console.log('Signing up:', credentials);
    navigate('/home');
  };

  return <AuthForm title="Sign Up" handleSubmit={handleSignup} />;
};

export default SignupPage;
