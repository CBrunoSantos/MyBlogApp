import React from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

interface ViewPostProps {
  title: string;
  body: string;
  postId: number;
}

const ViewPost: React.FC<ViewPostProps> = ({ title, body, postId }) => {
  const navigation = useNavigation<any>();

  const handlePress = () => {
    navigation.navigate('PostDetail', { postId, title, body });
  };

  return (
    <Container onPress={handlePress}>
      <Title>{title}</Title>
      <Body>{body}</Body>
    </Container>
  );
};

export default ViewPost;

const Container = styled.TouchableOpacity`
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
