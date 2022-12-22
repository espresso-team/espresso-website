import React from 'react'
import styled from 'styled-components'
import '@fontsource/almendra-sc'

const LogoText = styled.h1`
font-family: "Almendra SC", serif;
font-size: 2em;
color: ${props => props.theme.text};
transition: all 0.2s ease;
&:hover {
    transform: scale(1.1);
}
`
export const Logo = () => {
    return (
        <LogoText>
            Espresso
        </LogoText>
    )
}

export default Logo;