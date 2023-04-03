import React, { useState, useEffect } from 'react';
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
    description: `This AI Model ${index + 1} has a unique personality and features.`,
  };
});

const MyForum: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [modelsPerPage] = useState(14);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setTotalPages(Math.ceil(mockGirlfriendModels.length / modelsPerPage));
  }, [modelsPerPage]);

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const modelsToDisplay = mockGirlfriendModels.slice(
    (currentPage - 1) * modelsPerPage,
    currentPage * modelsPerPage
  );

  return (
    <Container>
      <ModelList>
        {modelsToDisplay.map((model) => (
          <ModelItem key={model.id}>
            <ModelImageContainer>
              <ModelImage src={model.imageUrl} alt={model.modelName} />
            </ModelImageContainer>
            <ModelInfo>
              <h3>{model.modelName}</h3>
              <p>上传者：{model.username}</p>
              <p>{model.description}</p>
            </ModelInfo>
            <VoteSection>
              <VoteButton>
                <UpvoteIcon />
                <span>322</span>
              </VoteButton>
              <VoteButton>
                <DownvoteIcon />
                <span>12</span>
              </VoteButton>
            </VoteSection>
          </ModelItem>
        ))}
      </ModelList>
      <Pagination>
        {[...Array(totalPages)].map((_, index) => (
          <PageButton key={index} onClick={() => handleClick(index + 1)}>
            {index + 1}
          </PageButton>
        ))}
      </Pagination>
    </Container>
  );
};
const UpvoteIcon = () => (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 8h-5.612l1.123-3.367c.202-.608.1-1.282-.275-1.802S14.253 2 13.612 2H12c-.297 0-.578.132-.769.36L6.531 8H4c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h13.307a2.01 2.01 0 0 0 1.873-1.298l2.757-7.351A1 1 0 0 0 22 12v-2c0-1.103-.897-2-2-2zM4 10h2v9H4v-9zm16 1.819L17.307 19H8V9.362L12.468 4h1.146l-1.562 4.683A.998.998 0 0 0 13 10h7v1.819z"></path></svg>
  );

const DownvoteIcon = () => (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 3H6.693A2.01 2.01 0 0 0 4.82 4.298l-2.757 7.351A1 1 0 0 0 2 12v2c0 1.103.897 2 2 2h5.612L8.49 19.367a2.004 2.004 0 0 0 .274 1.802c.376.52.982.831 1.624.831H12c.297 0 .578-.132.769-.36l4.7-5.64H20c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm-8.469 17h-1.145l1.562-4.684A1 1 0 0 0 11 14H4v-1.819L6.693 5H16v9.638L11.531 20zM18 14V5h2l.001 9H18z"></path></svg>
);

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  color: #333;
  cursor: pointer;
  font-size: 14px;
  margin: 0 5px;
  padding: 6px 12px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }

  &.active {
    background-color: #007bff;
    border-color: #007bff;
    color: #fff;
  }
`;

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

const ModelImageContainer = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModelImage = styled.img`
  max-width: 100%;
  max-height: 100%;
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