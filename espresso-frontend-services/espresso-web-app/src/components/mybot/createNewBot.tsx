import React, { useState } from 'react';
import styled from 'styled-components';
import { BsPlus } from 'react-icons/bs';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px; 
  padding: 20px;
  box-sizing: border-box;
  margin: 0 auto;
`;


const Title = styled.h1`
  font-size: 24px;
  margin: 10px;
`;

const UploadArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border: 2px dashed #999;
  border-radius: 5px;
  margin: 20px;

  &:hover {
    cursor: pointer;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 5px;
  border-radius: 5px;
`;

const StyledLabel = styled.label`
  font-size: 14px;
  color: #666;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  margin: 10px;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const TagItem = styled.div<{ selected: boolean }>`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: ${(props) => (props.selected ? "#2196f3" : "#f0f0f0")};
  color: ${(props) => (props.selected ? "#fff" : "#000")};
  margin: 5px;
  cursor: pointer;
`;


const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 5px;
  border-radius: 5px;
`;

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
`;

const StyledSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 34px;

    &:before {
      position: absolute;
      content: '';
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: 0.4s;
      border-radius: 50%;
    }
  }

  input:checked + span {
    background-color: #2196f3;
  }

  input:focus + span {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + span:before {
    transform: translateX(26px);
  }
`;


const StyledButton = styled.button<{ primary?: boolean }>`
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 20px;
  cursor: pointer;
  background-color: ${(props) => (props.primary ? "#000" : "#07c160")};
  color: #fff;

  &:hover {
    opacity: 0.9;
  }
`;


const CreateNewBot = () => {
  const [tags, setTags] = useState([
    '友好',
    '幽默',
    '严肃',
    '热情',
    '活泼',
    '机智',
    '负责',
    '自信',
    '乐观',
    '善良',
    '开朗',
    '温柔',
    '稳重',
    '独立',
    '务实',
    '内敛',
    '果断',
    '谨慎',
    '慷慨',
    '忠诚',
    '谦逊',
    '犹豫',
    '直率',
    '颓废',
    '矛盾',
    '轻浮',
    '悲观',
    '敏感',
    '充满活力',
    '平静',
    '感性',
    '理性',
    '拖延',
    '自律',
    '怀疑',
    '嘲讽',
    '坚定',
    '迷茫',
    '急躁',
    '耐心',
    '自负',
    '虚荣',
  ]);
  

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };


  const handleShareToWeChat = () => {
    // 在这里实现分享到微信朋友圈的功能
  };

  return (

    <Container>
      <Title>创建我的AI分身</Title>
      <UploadArea>
        <BsPlus size={24} />
      </UploadArea>
      <InputContainer>
        <SectionTitle>AI名称</SectionTitle>
        <StyledInput type="text" placeholder="AI名称" />
        <StyledLabel>AI姓名不能重复且在10个字符以内。创建后无法修改。</StyledLabel>
      </InputContainer>
      <SectionTitle>AI描述</SectionTitle>
      <TagsContainer>
        {tags.map((tag, index) => (
          <TagItem
            key={index}
            selected={selectedTags.includes(tag)} // 添加了这一行
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </TagItem>
        ))}

      </TagsContainer>
      <SectionTitle>其他提示词</SectionTitle>
      <StyledTextarea />
      <SwitchContainer>
        <StyledLabel>公开显示提示词</StyledLabel>
        <StyledSwitch>
          <input type="checkbox" />
          <span></span>
        </StyledSwitch>
      </SwitchContainer>
      <StyledButton primary>创建AI</StyledButton>
      <StyledButton onClick={handleShareToWeChat}>分享到朋友圈赚取点数</StyledButton>
    </Container>
  );
};

export default CreateNewBot;