import React, { Suspense } from 'react'
import styled from 'styled-components'
import Loading from '../../app/Loading';
import ReactCardFlip from 'react-card-flip';
import "@fontsource/akaya-telivigala"

interface Props {
    idCardFlipped: boolean | undefined,
    imgOnClick: () => void,
    imgKey: number,
    imgSrc: string,
    imgPrompt: string
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

const PromptText = styled.h4`
  margin: 3rem;
  margin-top: 12rem;
`;

export const ImageCard = ({ idCardFlipped, imgOnClick, imgKey, imgSrc, imgPrompt }: Props) => {
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
                    <Frame>
                        <PromptText>Prompt:<br />{imgPrompt}</PromptText>
                    </Frame>
                </Suspense>
            </Box>
        </ReactCardFlip>
    )
}