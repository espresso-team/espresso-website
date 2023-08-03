import React, { useState } from 'react';
import { Input, DatePicker, Button, Radio, RadioChangeEvent, Row, Col, Card, Form } from 'antd';
import styled from 'styled-components';
import dayjs, { Dayjs } from 'dayjs';
import GenderType from '../../../types/GenderType';

interface ProfileUpdateProps {
  user_id: string;
  username: string;
  birthday: Date;
  gender: GenderType;
  phoneNumber: string;
}

const ProfileUpdatePage: React.FC<ProfileUpdateProps> = ({
  user_id,
  username,
  birthday,
  gender,
  phoneNumber,
}) => {
  const [selectedGender, setSelectedGender] = useState<GenderType>(gender);
  const [usernameState, setProfileUsername] = useState(username);
  const [birthdayState, setProfileBirthday] = useState<Date>(birthday);
  const [phoneNumberState, setProfilePhoneNumber] = useState(phoneNumber);

  // TODO no state from previous page (App or Navbar I forgot) yet.
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileUsername(e.target.value);
  };

  // TODO: Add date validation.
  const handleBirthdayChange = (date: Dayjs | null, dateString: string) => {
    if (date != null) {
      setProfileBirthday(date.toDate());
    }
  };

  const handleGenderChange = (e: RadioChangeEvent) => {
    setSelectedGender(e.target.value as GenderType);
  };
  // TODO: Add phone validation.
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfilePhoneNumber(e.target.value);
  };
  const dayjsBirthday = dayjs(birthdayState);

  const handleFormSubmit = () => {
    // Talk to backend to update profile
    // Show banner if the update succeeded / failed.
  };

  const WhiteText = styled.div`color: #ffffff`
  const genderOptions = [
    { label: <WhiteText>男</WhiteText>, value: 'M'},
    { label: <WhiteText>女</WhiteText>, value: 'F'},
    { label: <WhiteText>保密</WhiteText>, value: 'U'},
  ]

  return (
    <Row
      align="middle"
      style={{margin: "5em"}}
    >
      <Col
        span={12}
        offset={6}
      >
        <Card
          bordered={false}
          title={
            <div style={{ textAlign: 'center'}}>
              信息更新
            </div>}
          headStyle={{
            backgroundColor: '#ff6791',
            color: '#ffffff'
          }}
          bodyStyle={{ backgroundColor: '#1d1f66' }}
        >
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
          >
            <Form.Item
              label='昵称'
            >
              <div
                style={{ margin:"10px" }}
              /> 
              <Input
                value={usernameState}
                onChange={handleUsernameChange}
              />
            </Form.Item>
            <Form.Item
              label="生日"
            >
              <div
                style={{margin:"10px"}}
              />
              <DatePicker
                value={dayjsBirthday}
                onChange={handleBirthdayChange}
              />
            </Form.Item>
            <Form.Item
              label="性别"
            >
              <div style={{margin:"15px"}} />
              <Radio.Group
                value={selectedGender}
                onChange={handleGenderChange}
                options={genderOptions}
              />
            </Form.Item>
            <Form.Item
              label="手机号码"
            >
              <div style={{margin:"10px"}} />
              <Input
                value={phoneNumberState}
                onChange={handlePhoneNumberChange}
              />
            </Form.Item>
            <Form.Item
              wrapperCol={{ offset: 4}}
            >
              <Button
                type="primary"
                onClick={handleFormSubmit}
              >
                更新
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default ProfileUpdatePage;
