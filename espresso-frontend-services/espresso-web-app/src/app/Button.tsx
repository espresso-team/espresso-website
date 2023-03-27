import React, { MouseEventHandler } from 'react'
import styled from 'styled-components'


const Btn = styled.button`
display: inline-block;
background-color: ${props => props.theme.text};
color: ${props => props.theme.body};
outline: none;
border: none;

font-size: ${props => props.theme.fontmd};
padding: 0.4rem 1.9rem;
border-radius: 50px;
cursor: pointer;
transition: all 0.2s ease;
position: relative;
&:hover{
    transform: scale(0.9);
}

&::after{
    content: ' ';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    border: 2px solid #000;
    width: 100%;
    height: 100%;
    border-radius: 50px;
    transition: all 0.2s ease;
}

&:hover::after{
    transform: translate(-50%, -50%) scale(1.1);
    padding-top: 2.5rem;
}

@media (max-width: 48em) {
font-size: ${props => props.theme.fontsm};

}
`

const Button = (props: { text: string, link?: string, onClick?: () => void}) => {
  const { text, link = '#!', onClick} = props;
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault(); // Prevent default behavior when an onClick function is provided
      onClick();
    }
  };

  return (
    <a href={link} target="_blank" rel="noreferrer" onClick={handleClick}>
      <Btn>{text}</Btn>
    </a>
  )
}

export default Button;