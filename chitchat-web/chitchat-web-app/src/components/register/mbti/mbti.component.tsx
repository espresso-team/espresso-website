import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Question = styled.h2`
  font-size: 24px;
  margin-bottom: 16px;
  text-align: center;
`;

const OptionsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  background-color: #e0e0e0;
  margin: 0 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c0c0c0;
  }

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #2196f3;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1976d2;
  }
`;

const MBTIComponent = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const handleNextClick = () => {
    // Logic to navigate to the next page
  };

  return (
    <Container>
      <Question>Answer the question:</Question>
      <OptionsContainer>
        <Option
          onClick={() => handleOptionClick('Option 1')}
          style={{ backgroundColor: selectedOption === 'Option 1' ? '#c0c0c0' : '#e0e0e0' }}
        >
          Option 1
        </Option>
        <Option
          onClick={() => handleOptionClick('Option 2')}
          style={{ backgroundColor: selectedOption === 'Option 2' ? '#c0c0c0' : '#e0e0e0' }}
        >
          Option 2
        </Option>
      </OptionsContainer>
      <Button onClick={handleNextClick}>Next</Button>
    </Container>
  );
};

export default MBTIComponent;
