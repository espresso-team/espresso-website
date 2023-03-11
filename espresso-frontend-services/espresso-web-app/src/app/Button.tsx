import React, { MouseEventHandler } from 'react'
import styled from 'styled-components'

const Btn = styled.button`
  display: inline;
  background-color: ${props => props.theme.text};
  color: ${props => props.theme.body};
  outline: none;
  border: none;
  width: 120%;

  font-size: ${props => props.theme.fontmd};
  padding: 0.3rem 1.8rem;
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
      border: 2px solid ${props => props.theme.text};
      width: 100%;
      height: 100%;
      border-radius: 50px;
      
      transition: all 0.2s ease;
  }

  &:hover::after{
      transform: translate(-50%, -50%) scale(1);
      padding: 0.3rem;
  }

  @media (max-width: 48em) {
  font-size: ${props => props.theme.fontsm};
  }
`

const Button = (props: { text: string, link?: string, onclick?: () => void }) => {
  const { text, link = '#!' } = props;
  return (
    
    <a href={link} target="_blank" rel="noreferrer" >
      <Btn onClick={()=>onclick}>
        {text}
      </Btn>
    </a>
  )
}

export default Button;