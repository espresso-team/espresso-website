import React, { ChangeEvent, lazy, Suspense } from 'react'
import styled, { keyframes } from 'styled-components'
import Loading from '../../app/Loading';
import ReactCardFlip from 'react-card-flip';
import { usePkSystemHook } from '../../state/pk-system-hook';

interface Props {
  userId: string;
}

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
const Box = styled.div`
width: 50%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

const rotate = keyframes`
100%{
  transform: rotate(1turn);
}
`

const Frame = styled.div`
  display: inline-block;
  overflow: hidden;
  width: 600px;
  height: 600px;
  border-radius:5%;
  box-shadow:20px 20px 20px #828080;
  position: relative;
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const testImagePath = "https://www.humanesociety.org/sites/default/files/styles/2000x850/public/2020-07/kitten-510651.jpg?h=f54c7448&itok=lJefJMMQ";

const userImages = [
  { id: 2, src: testImagePath, userId: "test1" },
  { id: 5, src: testImagePath, userId: "test1" },
  { id: 3, src: testImagePath, userId: "test3" },
];


const Game: React.FC<Props> = ({ userId }) => {
  // import hooks
  const [state, action] = usePkSystemHook();

  //const result = lexica.generate('adventure');
  const userImagesList = userImages.filter(image => image.userId === userId);
  //console.log("userImagesList[0].src", userImagesList[0].src);
  //const result = lexica.generate('adventure');
  //const api = new LexicaAPI();
  // const lexica = new LexicaAPI();
  // const result = lexica.search('example query');
  return (
    <Section id="home">
      <div>Choose the better one ?</div>
      <button onClick={action.handleCardFlip}>Click to flip</button>
      <Container>
        {userImagesList.map(image => (
          <Box>
            <ReactCardFlip isFlipped={state.isFlipped} flipDirection="vertical">
            <Suspense fallback={<Loading />}>
              <Frame>
                <img key={image.id} src={image.src} width={600} height={600} alt={`Image-${image.id}`} />
              </Frame>
            </Suspense>
              <Suspense fallback={<Loading />}>
                This is the back of the card.
              </Suspense>
            </ReactCardFlip>
          </Box>
        ))}
      </Container>
    </Section>
  )
}

export default Game