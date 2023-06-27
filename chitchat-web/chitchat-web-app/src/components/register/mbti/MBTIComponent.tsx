import React, { useState } from 'react';
import { Typography, Button, Row, Col, Card } from 'antd';

const { Title } = Typography;
const { Meta } = Card;

interface MBTIComponentProps {
  question: string;
  option1: string;
  option2: string;
  onOptionSelect: (option: number) => void;
}

const MBTIComponent: React.FC<MBTIComponentProps> = ({ question, option1, option2, onOptionSelect }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onOptionSelect(option === option1 ? 0 : 1);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '50vh' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>{question}</Title>
      <Row gutter={[16, 16]} justify="center" style={{ marginBottom: '12px' }}>
        <Col xs={24} sm={12} md={10} lg={8}>
          <Card 
            hoverable
            style={{ width: '100%', height: '150px', backgroundColor: selectedOption === option1 ? '#c0c0c0' : '#e0e0e0' }} 
            onClick={() => handleOptionClick(option1)}
          >
            <Meta description={option1} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={10} lg={8}>
          <Card 
            hoverable
            style={{ width: '100%', height: '150px', backgroundColor: selectedOption === option2 ? '#c0c0c0' : '#e0e0e0' }} 
            onClick={() => handleOptionClick(option2)}
          >
            <Meta description={option2} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MBTIComponent;
