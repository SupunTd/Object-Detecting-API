import React from 'react';
import { Typography, Container } from '@mui/material';
import MainHeader from "../MainHeader/MainHeader";

const HomePage = () => {
    return (
        <>
            <MainHeader />
        <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '100px' }}>
            <Typography variant="h4" gutterBottom>
               Smile Detection System
            </Typography>
            <Typography variant="h6">
                We are Group 6
            </Typography>
        </Container>

        </>
    );
};

export default HomePage;
