import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import styled from "styled-components";
import Navbar from "../app/Navbar";
import Footer from "../app/Footer";
import backgroundJPG from '../assets/BGIWithoutCharacter.png';

const Section = styled.section`
min-height: ${props => `calc(110vh - ${props.theme.navHeight})`};
width: 100vw;
position: relative;
background: url(${backgroundJPG}) no-repeat center center;
background-size: cover;
`;

interface AuthenticatedLayoutProps {
    children: React.ReactNode;
}

const AuthenticatedLayout = ({ children }: AuthenticatedLayoutProps) => {
    // check userToken to check the login status
    const userToken = localStorage.getItem('userToken');
    
    if (!userToken) {
        return <Navigate to="/login" />;
    }

    return (
        <Section>
            <Navbar />
            {children}
            <Footer />
        </Section>
    );
};

export default AuthenticatedLayout;
