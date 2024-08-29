import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface PostDetailProps {
  route: any;
  navigation: any;
}

const PostDetail: React.FC<PostDetailProps> = ({ route, navigation }) => {
  const { postId, title, body } = route.params;
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.log('Erro ao carregar comentários', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  const renderComment = ({ item }: { item: any }) => (
    <Comment>
      <CommentName>{item.name}</CommentName>
      <CommentBody>{item.body}</CommentBody>
    </Comment>
  );

  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <TextHeader>Publicação</TextHeader>
      </Header>
      <Content>
        <Title>{title}</Title>
        <Body>{body}</Body>
        <SectionTitle>Comentários</SectionTitle>
        {loading ? (
          <ActivityIndicator size="small" color="#007bff" />
        ) : (
          <FlatList
            data={comments}
            keyExtractor={item => item.id.toString()}
            renderItem={renderComment}
            ListFooterComponent={<AddCommentButton><Ionicons name="chatbubble-outline" size={24} color="black" /><AddCommentText>Adicione um comentário</AddCommentText></AddCommentButton>}
          />
        )}
      </Content>
    </Container>
  );
};

export default PostDetail;

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background-color: #f8f8f8;
`;

const TextHeader = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-left: 16px;
`;

const Content = styled.View`
  padding: 16px;
  flex: auto;
  display: flex;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Body = styled.Text`
  font-size: 16px;
  color: #333333;
  margin-bottom: 16px;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-top: 16px;
  margin-bottom: 8px;
`;

const Comment = styled.View`
  padding: 8px 0;
  border-bottom-width: 1px;
  border-bottom-color: #eeeeee;
`;

const CommentName = styled.Text`
  font-weight: bold;
  color: #333;
`;

const CommentBody = styled.Text`
  color: #555;
`;

const AddCommentButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  margin-top: 16px;
  border-radius: 8px;
  background-color: #f0f0f0;
`;

const AddCommentText = styled.Text`
  margin-left: 8px;
  font-size: 16px;
  color: #333;
`;
