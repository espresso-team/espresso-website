import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { pkSystemApi, usePkSystemHook } from '../../state/pk-system-hook';
import "@fontsource/akaya-telivigala"
import { ImageCard } from './ImageCard';
import axios from 'axios';

interface Props {
  userId: string;
}

var console = require("console-browserify")

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
enum HttpStatus {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
}

// const getImages = () => {
//   return async ({ dispatch, setState, getState }: pkSystemApi) => {
//     console.log("set Image start")
//     const res = await axios
//       .get(`https://lexica.art/api/v1/search?q=${getState().searchQuery}`)
//     // .then((response) => {
//     //   setState({images: response.data.images});
//     // })
//     // .catch((err) => console.log(err));
//     if (res.status === HttpStatus.OK) {
//       const imageData = res.data.images as ImageItems || [];
//       if (imageData[0] && imageData[1]) {
//         setState({ images: imageData });
//       } else {
//         console.log("Couldnt find Image 0 and 1")
//       }
//       console.log("set Image done")
//       return true;
//     }
//     console.log("set Image failed with res.status:", res.status)
//     return false;
//   };
// }

const Game: React.FC<Props> = () => {
  // import hooks
  const [state, action] = usePkSystemHook();
  const [index, setIndex] = useState(0);
  const images = state.images;

  console.log("images[state.leftImageId].src",images[state.leftImageId].src);
  

  useEffect(() => {
    // const res = axios
    //   .get(`https://lexica.art/api/v1/search?q=${state.searchQuery}`)
    //   .then((response) => {
    //     setImages(response.data.images);
    //   })
    //   .catch((err) => console.log(err));

    // // update index
    // setIndex(randomIntBetweenOneAndFive());
  }, [state.leftImageId, state.rightImageId]);
  return (
    <Section id="home">
      <Title>Click the one you prefer...</Title>

      <Container>
        {images && <ImageCard
          idCardFlipped={state.isFlippedCardOne}
          imgOnClick={action.handleFlipCardOne}
          imgId={images[state.leftImageId].id}
          imgSrc={images[state.leftImageId].src}
          imgPrompt={images[state.leftImageId].prompt}
        />}

        {images && <ImageCard
          idCardFlipped={state.isFlippedCardTwo}
          imgOnClick={action.handleFlipCardTwo}
          imgId={images[state.rightImageId].id}
          imgSrc={images[state.rightImageId].src}
          imgPrompt={images[index + 1].prompt}
        />}
      </Container>
    </Section>
  )
}

export default Game