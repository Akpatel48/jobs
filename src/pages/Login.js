import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography, Grid } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
import Logo from '../components/Logo';
// sections
import { LoginForm } from '../sections/auth/login';
import AuthSocial from '../sections/auth/AuthSocial';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(8, 0),
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
  padding: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    margin: theme.spacing(2, 2, 2, 2),
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(8, 0),
  },
}));

// ----------------------------------------------------------------------

export default function Login() {
  const isDesktop = useResponsive('up', 'md');

  return (
    <Page title="Login">
      <RootStyle>
        <HeaderStyle>
          <Logo />
        </HeaderStyle>

        <Grid container spacing={2} justifyContent="center">
          {isDesktop && (
            <Grid item md={6}>
              <SectionStyle>
                <Typography variant="h4" sx={{ mb: 3 }}>
                  Hi, Welcome Back
                </Typography>
                <img src="/static/illustrations/illustration_login.png" alt="login" />
              </SectionStyle>
            </Grid>
          )}

          <Grid item xs={12} md={6}>
            <Container maxWidth="sm">
              <ContentStyle>
                <Typography variant="h4" gutterBottom>
                  Sign in
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                  Enter your details below.
                </Typography>
                <AuthSocial />
                <LoginForm />
                <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                  Don’t have an account?{' '}
                  <Link variant="subtitle2" component={RouterLink} to="/register">
                    Get started
                  </Link>
                </Typography>
              </ContentStyle>
            </Container>
          </Grid>
        </Grid>
      </RootStyle>
      <ToastContainer />
    </Page>
  );
}