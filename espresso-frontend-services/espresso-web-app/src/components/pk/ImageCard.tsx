import React, { FormEvent, Suspense, useState } from 'react'
import styled, { keyframes }  from 'styled-components'
import Loading from '../../app/Loading';
import ReactCardFlip from 'react-card-flip';
import "@fontsource/akaya-telivigala"
import Button from '../../app/Button';
import { pkSystemApi, usePkSystemHook } from '../../state/pk-system-hook';
import { randomIntBetweenZeroAndXButNotY } from '../../util/randomIntBetweenZeroAndX';
import { ImageItem } from '../../types/ImageItem';
import { Link } from 'react-router-dom'

interface Props {
  idCardFlipped: boolean | undefined,
  imgOnClick: () => void,
  imgItem: ImageItem,
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


const ExploreBtn = styled.button`
  background-color: rgb(226, 118, 118);
  color: ${props => props.theme.body};
  outline: none;
  border: none;
  margin: 2rem;
  margin-left: 15rem;
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
      border: 2px solid rgb(226, 118, 118);
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
  margin-left: 3rem;
  width: 13rem;
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
const ImgInfoSection = styled.div`
  color: #FFFFFF;
  font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
  margin: 3rem;
`
const ImgInfoText = styled.p`

`;

const PromptText = styled.p`
  color: #FFFFFF;
  margin: 3rem;
`;


const HeartButton = styled.div`
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

export const ImageCard = ({ idCardFlipped, imgOnClick, imgItem }: Props) => {
  const [state] = usePkSystemHook();
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const imgPrompt = imgItem.prompt;
  const imgId = imgItem.id;
  const imgSrc = imgItem.src;
  const imgName = imgItem.name;
  const imgAge = imgItem.age;
  const imgEducaton = imgItem.education;
  const imgFigure = imgItem.figure;
  const imgPersonality = imgItem.personality;
  const imgHobby = imgItem.hobby;
  
  return (
    <ReactCardFlip isFlipped={idCardFlipped}>
      <Box>
        <Suspense fallback={<Loading />}>
          <Frame>
            <img onClick={imgOnClick} key={imgId} src={imgSrc} width={600} height={600} alt={`PK-${imgId}`} />
          </Frame>
        </Suspense>
      </Box>

      <Box>
        <Suspense fallback={<Loading />}>
          <FrameFlipped onClick={imgOnClick}>
            {
              isPromptOpen ?
                <PromptText>提示词: {imgPrompt}</PromptText>
                :
                <ImgInfoSection>
                  <ImgInfoText>姓名: {imgName}</ImgInfoText>
                  <ImgInfoText>年龄: {imgAge}</ImgInfoText>
                  <ImgInfoText>身材: {imgFigure}</ImgInfoText>
                  <ImgInfoText>学历: {imgEducaton}</ImgInfoText>
                  <ImgInfoText>性格: {imgPersonality}</ImgInfoText>
                  <ImgInfoText>爱好: {imgHobby}</ImgInfoText>
                </ImgInfoSection>
            }

            {/* <HeartButton onClick={() => {
              if (imgId === state.images[state.leftImageId].id) {
                // keep the left image
                state.rightImageId = randomIntBetweenZeroAndXButNotY(state.imageListLength, imgId);
              }
              else {
                // keep the right image
                state.leftImageId = randomIntBetweenZeroAndXButNotY(state.imageListLength, imgId);
              }
            }}>
            </HeartButton> */}
            <div onClick={() => {
              if (imgId === state.images[state.leftImageId].id) {
                // keep the left image
                state.rightImageId = randomIntBetweenZeroAndXButNotY(state.imageListLength, imgId);
              }
              else {
                // keep the right image
                state.leftImageId = randomIntBetweenZeroAndXButNotY(state.imageListLength, imgId);
              }
            }}>
            <AnimatedHeart />
            </div>

            <ButtonList>
              <Btn>开始聊天</Btn>
              <Btn onClick={() => {
                // TBD: 生成我的提示词 避免翻转
                setIsPromptOpen(!isPromptOpen);
              }}>生成我的提示词</Btn>
            </ButtonList>
          </FrameFlipped>
        </Suspense>
      </Box>
    </ReactCardFlip>
  )
}