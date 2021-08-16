import styled from 'styled-components';

export const PreviewListWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

export const PreviewWrapper = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  overflow: hidden;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const PreviewActionsWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  transition: opacity 0.3 linear;
  background-color: rgba(0, 0, 0, 0.3);
  ${PreviewWrapper}:hover & {
    opacity: 1;
  }
`;

export const ImageWrapper = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;
