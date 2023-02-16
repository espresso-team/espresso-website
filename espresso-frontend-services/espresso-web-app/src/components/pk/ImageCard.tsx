import React, { Suspense } from 'react'
import styled from 'styled-components'
import Loading from '../../app/Loading';
import ReactCardFlip from 'react-card-flip';
import "@fontsource/akaya-telivigala"
import Button from '../../app/Button';
import { pkSystemApi, usePkSystemHook } from '../../state/pk-system-hook';

interface Props {
  idCardFlipped: boolean | undefined,
  imgOnClick: () => void,
  imgKey: string,
  imgSrc: string,
  imgPrompt: string,
}

const Box = styled.div`
margin: 3rem;
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

const Frame = styled.div`
  display: inline-block;
  overflow: hidden;
  width: 600px;
  height: 600px;
  border-radius:5%;
  box-shadow:20px 20px 20px #828080;
  position: relative;
  transition: all 0.2s ease;
  &:hover {
    transform: scale(1.1);
}
`;

const FrameFlipped = styled.div`
  display: inline-block;
  overflow: hidden;
  background-color: #828080;
  width: 600px;
  height: 600px;
  border-radius:5%;
  box-shadow:20px 20px 20px #828080;
  position: relative;
  transition: all 0.2s ease;
  &:hover {
    transform: scale(1.1);
}
`;

const PromptText = styled.p`
  color: #FFFFFF;
  margin: 3rem;
`;


// const handleSearchQueryUpdate =
//   (newQuery: string) =>
//     ({ getState, setState }: pkSystemApi) => {
//       var console = require("console-browserify")

//       console.log("newQuery", newQuery);
//       setState({ searchQuery: newQuery });

//       console.log("searchQuery", getState().searchQuery);
//     };


const ExploreBtn = styled.button`
  background-color: ${props => props.theme.text};
  color: ${props => props.theme.body};
  outline: none;
  border: none;
  margin: 2rem;
  margin-left: 13rem;
  font-size: ${props => props.theme.fontmd};
  padding: 0.9rem 2.3rem;
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

const Btn = styled.button`
  background-color: ${props => props.theme.text};
  color: ${props => props.theme.body};
  outline: none;
  border: none;
  margin: 3rem;
  margin-left: 4rem;
  font-size: ${props => props.theme.fontmd};
  padding: 0.9rem 2.3rem;
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

const ButtonList = styled.section`
position: relative;
border-top: 2px solid ${props => props.theme.text};
display: flex;


@media (max-width: 48em) {
height: 5rem;
flex-direction: column;
}
`

export const ImageCard = ({ idCardFlipped, imgOnClick, imgKey, imgSrc, imgPrompt }: Props) => {
  const [state] = usePkSystemHook();
  return (
    <ReactCardFlip isFlipped={idCardFlipped}>
      <Box>
        <Suspense fallback={<Loading />}>
          <Frame>
            <img onClick={imgOnClick} key={imgKey} src={imgSrc} width={600} height={600} alt={`PK-${imgKey}`} />
          </Frame>
        </Suspense>
      </Box>

      <Box>
        <Suspense fallback={<Loading />}>
          <FrameFlipped onClick={imgOnClick}>
            <PromptText>Prompt:<br />{imgPrompt}</PromptText>

            <ExploreBtn onClick={() => {
                  var console = require("console-browserify")
                  console.log("newQuery", imgPrompt);
                  state.searchQuery = imgPrompt;
                }}>Keep Me!</ExploreBtn>
            <ButtonList>
                <Btn>Use Prompt</Btn>
                <Btn>Change Topic</Btn>
            </ButtonList>
          </FrameFlipped>
        </Suspense>
      </Box>
    </ReactCardFlip>
  )
}