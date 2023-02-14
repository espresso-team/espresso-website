import React from 'react'
import styled from 'styled-components'
import { usePkSystemHook } from '../../state/pk-system-hook';
import "@fontsource/akaya-telivigala"
import { ImageCard } from './ImageCard';

interface Props {
  userId: string;
}

const Title = styled.h1`
    text-transform: uppercase;
    font-family: "Akaya Telivigala", cursive;
`

const Section = styled.section`
min-height: ${props => `calc(100vh - ${props.theme.navHeight})`};
width: 100vw;
position: relative;
background-color: ${props => props.theme.body};
`

const Container = styled.div`
width: 75%;
min-height: 80vh;
margin: 0 auto;
display: flex;
justify-content: center;
align-items: center;

@media (max-width: 64em) {
  width: 85%;
}
@media (max-width: 48em) {
  flex-direction: column-reverse;
  width: 100%;
  &>*:first-child{
    width: 100%;
    margin-top: 0rem;
  }
}
`

const testImagePath = "https://www.humanesociety.org/sites/default/files/styles/2000x850/public/2020-07/kitten-510651.jpg?h=f54c7448&itok=lJefJMMQ";
const testImagePath2 = "https://media.npr.org/assets/img/2021/08/11/gettyimages-1279899488_wide-f3860ceb0ef19643c335cb34df3fa1de166e2761-s1100-c50.jpg"
const userImages = [
  { id: 1, src: testImagePath, userId: "test1", prompt: "this is the prompt of card one" },
  { id: 2, src: testImagePath2, userId: "test1", prompt: "this is the prompt of card two" },
];

const Game: React.FC<Props> = ({ userId }) => {
  // import hooks
  const [state, action] = usePkSystemHook();

  return (
    <Section id="home">
        <Title>Which one do you prefer...</Title>
      <Container>
        <ImageCard
          idCardFlipped={state.isFlippedCardOne}
          imgOnClick={action.handleFlipCardOne}
          imgKey={userImages[0].id}
          imgSrc={userImages[0].src}
          imgPrompt={userImages[0].prompt}
        />

        <ImageCard
          idCardFlipped={state.isFlippedCardTwo}
          imgOnClick={action.handleFlipCardTwo}
          imgKey={userImages[1].id}
          imgSrc={userImages[1].src}
          imgPrompt={userImages[1].prompt}
        />
      </Container>
    </Section>
  )
}

export default Game