import React from 'react';
import styled from 'styled-components';

interface GirlfriendModel {
  id: number;
  username: string;
  modelName: string;
  imageUrl: string;
  description: string;
}

// Mock data
const mockGirlfriendModels: GirlfriendModel[] = Array.from({ length: 30 }, (_, index) => {
    return {
      id: index + 1,
      username: `User${index + 1}`,
      modelName: `AI Model ${index + 1}`,
      imageUrl: [
        'https://s2.loli.net/2023/02/22/NA9cIs4veuBMPD8.png',
        'https://s2.loli.net/2023/02/22/A86JKsqiklFQaup.png',
        'https://s2.loli.net/2023/02/22/SHsxuN6Jy9njZce.png',
        'https://s2.loli.net/2023/02/22/kQE1SJByfc9Mb6i.png',
        'https://s2.loli.net/2023/03/13/69viI7Leojx2lsR.jpg',
        'https://s2.loli.net/2023/03/13/vhUDzs1eJpZyCOi.jpg',
        'https://s2.loli.net/2023/03/13/ezQWlJv3gZXkpDj.jpg',
        'https://s2.loli.net/2023/03/13/WYUgblZyv5sNcHf.jpg',
      ][index % 8],
      description: `This AI Model ${index + 1} has a unique personality and features. Explore and enjoy the interaction with this model.`,
    };
  });
  
const MyForum: React.FC = () => {
  return (
    <Container>
      <ModelList>
        {mockGirlfriendModels.map((model) => (
          <ModelItem key={model.id}>
            <ModelImage src={model.imageUrl} alt={model.modelName} />
            <ModelInfo>
              <h3>{model.modelName}</h3>
              <p>上传者：{model.username}</p>
              <p>{model.description}</p>
            </ModelInfo>
            <VoteSection>
              <VoteButton>
                <i className="fas fa-arrow-up"></i>
                <span>Upvote</span>
              </VoteButton>
              <VoteButton>
                <i className="fas fa-arrow-down"></i>
                <span>Downvote</span>
              </VoteButton>
            </VoteSection>
          </ModelItem>
        ))}
      </ModelList>
    </Container>
  );
};
const Container = styled.div`
  max-width: 1700px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  font-family: 'Roboto', sans-serif;
`;

const ModelList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const ModelItem = styled.div`
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
  height: 100%;

  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

const ModelImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const ModelInfo = styled.div`
  text-align: center;

  h3 {
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-bottom: 
    5px;
    }

    p {
    font-size: 14px;
    color: #777;
    margin-bottom: 5px;
    }

    p:first-of-type {
    font-weight: bold;
    }
    `;

const VoteSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
`;
const VoteButton = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  color: #777;
  cursor: pointer;

  i {
    font-size: 18px;
  }

  span {
    font-size: 14px;
    margin-left: 5px;
  }

  &:hover {
    color: #333;
  }
`;

export default MyForum;