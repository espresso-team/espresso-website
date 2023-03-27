import React from "react";
import styled from "styled-components";
import Typewriter from "typewriter-effect";
import Button from './Button';
import "@fontsource/zcool-kuaile"

const Title = styled.h2`
  font-size: ${(props) => props.theme.fontxxl};
  text-transform: capitalize;
  width: 80%;
  color: ${(props) => props.theme.text};
  align-self: flex-start;

  span {
    text-transform: uppercase;
    font-family: "ZCOOL KuaiLe", sans-serif; 
  }
  .text-1{
      color: blue;
  }
  .text-2{
      color: orange;
  }
  .text-3{
      color: red;
  }

  @media (max-width: 70em) {
    font-size: ${(props) => props.theme.fontxl};

  }
  @media (max-width: 48em) { 
    align-self: center;
    text-align:center;
  }
  @media (max-width: 40em){
    width: 90%;
  }
`;
const SubTitle = styled.h3`
  font-size: ${(props) => props.theme.fontlg};
  text-transform: capitalize;
  color: ${props => `rgba(${props.theme.textRgba}, 0.6)`};
  font-weight:600;
  margin-bottom: 1rem;
  width: 80%;
  align-self: flex-start;

  @media (max-width: 40em) {
    font-size: ${(props) => props.theme.fontmd};

  }

  @media (max-width: 48em) { 
    align-self: center;
    text-align:center;
  }
`

const ButtonContainer = styled.div`
 width: 80%;
  align-self: flex-start;

  @media (max-width: 48em) { 
    align-self: center;
    text-align:center;

    button{
      margin: 0 auto;
    }
  }
`
const TypeWriterText = () => {
  return (
    <>
      <Title>
        智能伴侣，陪伴成长
        <Typewriter
          options={{
            autoStart: true,
            loop: true,
          }}
          onInit={(typewriter) => {
            typewriter
              .typeString(`<span class="text-1">聊天陪伴新时代!</span>`)
              .pauseFor(2000)
              .deleteAll()
              .typeString(`<span class="text-2">个性化虚拟恋人!</span>`)
              .pauseFor(2000)
              .deleteAll()
              .typeString(`<span class="text-3">智能爱情引路人!</span>`)
              .pauseFor(2000)
              .deleteAll()
              .start();
          }}
        />

      </Title>
      <SubTitle>AI爱情新纪元？体验独一无二的陪伴</SubTitle>
      <ButtonContainer>
        <Button text="开始匹配" link="/pk" />
      </ButtonContainer>
    </>
  );
};

export default TypeWriterText;
