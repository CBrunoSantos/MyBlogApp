import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { FlatList, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ViewPost from '@/src/components/home/viewPost'; // Ajuste o caminho de acordo com a sua estrutura
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp } from '@react-navigation/native';

const Profile = ({ navigation }: { navigation: NavigationProp<any> }): ReactElement => {
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      try {
        const userJson = await AsyncStorage.getItem('@currentUser');
        const currentUser = userJson ? JSON.parse(userJson) : null;

        if (currentUser) {
          setUser(currentUser);

          const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${currentUser.id}`);
          const userPosts = await response.json();
          setPosts(userPosts);
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário e posts:', error);
      }
    };

    fetchUserAndPosts();
  }, []);

  const renderPost = ({ item }: { item: any }) => (
    <ViewPost title={item.title} body={item.body} postId={item.id} userId={item.userId} />
  );

  if (!user) {
    return (
      <Container>
        <LoadingText>Carregando...</LoadingText>
      </Container>
    );
  }

  const voltar = () => {
    navigation.goBack();
  }

  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={() => voltar()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <TextHeader>Perfil</TextHeader>
      </Header>
      <BodyProfile>
        <HeaderProfile>
          <ProfileButton>
            <Ionicons name="person-outline" size={50} color="white" />
          </ProfileButton>
          <UserInfo>
            <UserName>{user.name}</UserName>
            <UserEmail>@{user.username}</UserEmail>
          </UserInfo>
        </HeaderProfile>
        <UserStatus>
          <Ionicons name="mail-outline" size={15} color="black" />
          {user.email || 'E-mail não disponível'}
        </UserStatus>
        <UserStatus>
          <Ionicons name="location-outline" size={15} color="black" />{user.address ? `${user.address.street}, ${user.address.city}` : 'Endereço não disponível'}
        </UserStatus>
        <UserStatus>
          <Ionicons name="briefcase-outline" size={15} color="black" />{user.company.name || 'Telefone não disponível'}
        </UserStatus>
        <UserStatus>
          <Ionicons name="call-outline" size={15} color="black" />{user.phone || 'Telefone não disponível'}
        </UserStatus>
      </BodyProfile>
        <Body>
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderPost}
          />
      </Body>
    </Container>
  );
};

export default Profile;

const Container = styled.View`
  flex: auto;
  display: flex;
  justify-content: center;
  background-color: #EFF1F5;
`;

const Header = styled.View`
  padding-top: 10%;
  padding-left: 1%;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  background-color: #ffffff;
`;

const HeaderProfile = styled.View`
  padding-top: 1%;
  padding-left: 1%;
  padding-bottom: 3%;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  background-color: #ffffff;
`;

const BodyProfile = styled.View`
  padding-top: 5%;
  padding-bottom: 5%;
  padding-left: 1%;
  flex-direction: column;
  background-color: #ffffff;
  border-bottom-left-radius:20px;
  border-bottom-right-radius:20px;
`;

const TextHeader = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-left: 16px;
`;

const Body = styled.View`
  flex: auto;
  display: flex;
  justify-content: center;
  background-color: #EFF1F5;
  margin-left: auto;
  margin-right: auto;
  padding: 5%;
`;

const ProfileButton = styled.View`
  height: 80px;
  width: 80px;
  border-radius: 40px;
  background-color: #0F90D9;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const UserInfo = styled.View`
  flex-direction: column;
`;

const UserName = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #000;
`;

const UserEmail = styled.Text`
  font-size: 16px;
  color: #000000;
  margin-top: 4px;
`;

const UserStatus = styled.Text`
  flex-direction: row;
  align-items: center;
  font-size: 14px;
  color: #000000;
  margin-top: 1%;
  padding-left: 5%;
`;


const LoadingText = styled.Text`
  font-size: 18px;
  color: #000000;
  text-align: center;
  margin-top: 20px;
`;
