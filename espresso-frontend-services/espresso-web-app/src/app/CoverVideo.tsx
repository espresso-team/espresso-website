import React from 'react'
import styled from 'styled-components'
import GIF from '../assets/demoVideo.mp4'

const VideoContainer = styled.div`
width: 100%;

video{
    width: 90%;
    height: auto;
}

@media (max-width: 64em) {
  min-width: 40vh;
}
`

const CoverVideo = () => {
  return (
    <VideoContainer>
        <video autoPlay muted loop>
          <source src={GIF} type="video/mp4" />
        </video>
    </VideoContainer>
  )
}

export default CoverVideo