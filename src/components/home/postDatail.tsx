import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native';
import styled from 'styled-components/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/hooks/store';

interface PostDetailProps {
  route: any;
  navigation: any;
}

const PostDetail: React.FC<PostDetailProps> = ({ route, navigation }) => {
  const { postId, title, body, userId } = route.params;
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const emailPerfil = useSelector((state: RootState) => state.validation.emailProfile);
  const namePerfil = useSelector((state: RootState) => state.validation.nameProfile);

  const authenticatedUser = useSelector((state: any) => state.validation);

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

    const fetchUser = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const data = await response.json();
        setUser({ name: data.name || namePerfil, email: data.email || emailPerfil });
      } catch (error) {
        console.log('Erro ao carregar informações do usuário', error);
      }
    };

    fetchComments();
    fetchUser();
  }, [postId, userId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      Alert.alert('Erro', 'O comentário não pode estar vazio.');
      return;
    }

    const commentToAdd = {
      postId,
      id: comments.length + 1,
      name: namePerfil,
      email: emailPerfil || '',
      body: newComment,
    };

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify(commentToAdd),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        setComments(prevComments => [...prevComments, commentToAdd]);
        setNewComment('');
        Alert.alert('Sucesso', 'Comentário adicionado com sucesso!');
      } else {
        throw new Error('Falha ao enviar comentário');
      }
    } catch (error) {
      console.log('Erro ao adicionar comentário', error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar adicionar o comentário.');
    }
  };

  const renderComment = ({ item }: { item: any }) => (
    <Comment>
      <HeaderComment>
        <ProfileButton>
          <Ionicons name="person-outline" size={25} color="white" />
        </ProfileButton>
        <UserComment>
          <CommentName>{item.name}</CommentName>
          <UserEmail>{item.email}</UserEmail>
        </UserComment>
      </HeaderComment>
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
        {user && (
          <HeaderInfo>
            <ProfileButton>
              <Ionicons name="person-outline" size={25} color="white" />
            </ProfileButton>
            <UserInfo>
              <UserName>{user.name}</UserName>
              <UserEmail>@{user.email}</UserEmail>
            </UserInfo>
          </HeaderInfo>
        )}
        <Title>{title}</Title>
        <Body>{body}</Body>
        <SectionTitle>Comentários</SectionTitle>
        {loading ? (
          <ActivityIndicator size="small" color="#0F90D9" />
        ) : (
          <FlatList
            data={comments}
            keyExtractor={item => item.id.toString()}
            renderItem={renderComment}
          />
        )}
        <Footer>
          <AddCommentInput
            placeholder="Adicione um comentário"
            value={newComment}
            onChangeText={setNewComment}
          />
          <AddCommentButton onPress={handleAddComment}>
            <Ionicons name="send" size={24} color="#000" />
          </AddCommentButton>
        </Footer>
      </Content>
    </Container>
  );
};

export default PostDetail;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 10px;
  background-color: #ffffff;
`;

const Header = styled.View`
  padding-top: 10%;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
`;

const TextHeader = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-left: 16px;
`;

const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 10px;
  margin-top: 16px;
`;

const Content = styled.View`
  padding: 16px;
  flex: auto;
  display: flex;
`;

const HeaderInfo = styled.View`
  flex-direction: row;
  align-items: left;
`;

const HeaderComment = styled.View`
  flex-direction: row;
  align-items: left;
`;

const ProfileButton = styled.View`
  height: 40px;
  width: 40px;
  border-radius: 50px;
  background-color: #0F90D9;
  align-items: center;
  padding: 2%;
  margin-right: 2%;
`;

const UserInfo = styled.View`
  margin-bottom: 8px;
`;

const UserComment = styled.View`
  margin-bottom: 8px;
`;

const UserName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #000;
`;

const UserEmail = styled.Text`
  font-size: 14px;
  color: #555;
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
  padding: 15px;
  font-size: 18px;
  font-weight: bold;
  margin-top: 16px;
  margin-bottom: 8px;
  border-top-width: 2px;
  border-top-color: #eeeeee;
  border-bottom-width: 2px;
  border-bottom-color: #eeeeee;
`;

const Comment = styled.View`
  padding: 8px 0;
  border-bottom-width: 2px;
  border-bottom-color: #eeeeee;
`;

const CommentName = styled.Text`
  font-weight: bold;
  color: #333;
`;

const CommentBody = styled.Text`
  color: #555;
`;

const AddCommentInput = styled.TextInput`
  flex: 1;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid #ddd;
`;

const AddCommentButton = styled.TouchableOpacity`
  margin-left: 10px;
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

