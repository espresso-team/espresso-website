import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { pkSystemApi, usePkSystemHook } from '../../state/pk-system-hook';
import "@fontsource/zcool-kuaile"
import { ImageCard } from './ImageCard';
import Tooltip from 'rc-tooltip';
import { randomIntBetweenZeroAndXButNotY } from '../../util/randomIntBetweenZeroAndX';
import GenderType from '../../types/GenderType';
import SelectGender from './SelectGender';

interface Props {
  userId: string;
}

var console = require("console-browserify")

const Title = styled.h1`
    text-transform: uppercase;
    font-family: "ZCOOL KuaiLe", sans-serif;
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



const HeartButton = styled.div`
  margin-top:0;
  margin-left: 250px;
  position: relative;
  width: 100px;
  height: 90px;
  &:before,
  &:after {
    position: absolute;
    content: '';
    left: 50px;
    top: 0;
    width: 50px;
    height: 80px;
    background: #ca8888;
    border-radius: 50px 50px 0 0;
    transform: rotate(-45deg);
    transform-origin: 0 100%;
  }
  &:after {
    left: 0;
    transform: rotate(45deg);
    transform-origin: 100% 100%;
  }
  &:hover::after{
    cursor: pointer;
  }
`;
const heartBeat = keyframes`
  0%
  {
    transform: scale( .75 );
  }
  20%
  {
    transform: scale( 1.1 );
  }
  40%
  {
    transform: scale( .75 );
  }
  60%
  {
    transform: scale( 1.1 );
  }
  80%
  {
    transform: scale( .75 );
  }
  100%
  {
    transform: scale( .75 );
  }
`;

const AnimatedHeart = styled(HeartButton)`
  animation: ${heartBeat} 1s infinite;
`;


const Game: React.FC<Props> = () => {
  // import hooks
  const [state, action] = usePkSystemHook();
  const images = state.images;
  const [selectedGender, setSelectedGender] = useState<GenderType>(GenderType.BOYS);

  const handleSelectGender = (gender: GenderType) => {
    setSelectedGender(gender);
  };

  useEffect(() => {
    // const res = axios
    //   .get(`https://lexica.art/api/v1/search?q=${state.searchQuery}`)
    //   .then((response) => {
    //     setImages(response.data.images);
    //   })
    //   .catch((err) => console.log(err));

    // // update index
    // setIndex(randomIntBetweenOneAndFive());
  }, [state.curImageId]);
  return (
    <Section id="home">
      {state.userGender == GenderType.UNKNOWN ? <SelectGender selectedGender={selectedGender} /> :
      <>
      <Title>点击卡片试试</Title>
      <Container>
        {images && <ImageCard
          idCardFlipped={state.isFlippedCardOne}
          imgOnClick={action.handleFlipCardOne}
          imgItem={images[state.curImageId]}
        />}
      </Container>
      </>
      }
    </Section>
  )
}

export default Game