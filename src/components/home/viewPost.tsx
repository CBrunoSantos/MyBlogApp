import styled from "styled-components/native";

interface ViewPostProps {
  title: string;
  body:string;
}

const ViewPost: React.FC<ViewPostProps> = ({title, body}) => {

  return (
    <Container>
      <Title>{title}</Title>
      <Body>{body}</Body>
    </Container>
  );
}

export default ViewPost;

const Container = styled.View`
  padding: 10px;
  margin-bottom: 8px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #000000;
  margin-bottom: 8px;
`;

const Body = styled.Text`
  font-size: 14px;
  color: #333333;
`;