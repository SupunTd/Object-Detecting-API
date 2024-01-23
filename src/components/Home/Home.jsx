import React from 'react';
import { Typography, Container } from '@mui/material';
import MainHeader from "../MainHeader/MainHeader";

const HomePage = () => {
    return (
        <>
            <MainHeader />
        <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '100px' }}>
            <Typography variant="h4" gutterBottom>
                Welcome to My Home Page
            </Typography>
            <Typography variant="h6">
                Hello, I'm Supun Thilakshana
            </Typography>
        </Container>

        </>
    );
};

export default HomePage;
