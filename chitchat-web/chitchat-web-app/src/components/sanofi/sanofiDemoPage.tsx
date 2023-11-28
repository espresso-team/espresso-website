import React from 'react';
import styled from 'styled-components';

const FullScreenSection = styled.section`
  height: 100vh; // 视口高度
  width: 100vw; // 视口宽度
  position: fixed; // 固定位置
  top: 0;
  left: 0;
  margin: 0; // 移除外边距
  padding: 0; // 移除内边距
  z-index: 10; // 确保在顶层
`;

const SanofiDemoPage = () => {
    return (
        <FullScreenSection>
            <iframe 
                src="https://link.chitchat-ai.com/3CDxZs" 
                width="100%" 
                height="100%" 
                frameBorder="0" // 移除边框
                allowFullScreen // 允许全屏
            ></iframe>
        </FullScreenSection>
    );
};

export default SanofiDemoPage;
