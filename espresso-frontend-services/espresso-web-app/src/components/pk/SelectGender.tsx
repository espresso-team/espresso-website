// SelectGender.tsx
import React from 'react';
import styled from 'styled-components';
import GenderType from '../../types/GenderType';

interface Props {
  selectedGender: GenderType;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  background-color: transparent;
  border: 1px solid #000;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
`;

const SelectGender: React.FC<Props> = ({ selectedGender }) => {
  const handleSelect = (gender: GenderType) => {
    
  };

  return (
    <Container>
      <Button
        onClick={() => handleSelect(GenderType.BOYS)}
        style={{ borderColor: selectedGender === GenderType.BOYS ? 'blue' : 'black' }}
      >
        {GenderType.BOYS}
      </Button>
      <Button
        onClick={() => handleSelect(GenderType.GIRLS)}
        style={{ borderColor: selectedGender === GenderType.GIRLS ? 'pink' : 'black' }}
      >
        {GenderType.GIRLS}
      </Button>
    </Container>
  );
};

export default SelectGender;
