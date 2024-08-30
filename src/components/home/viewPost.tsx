import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSelector } from "react-redux";
import { RootState } from "@/src/hooks/store";

interface ViewPostProps {
  title: string;
  body: string;
  postId: number;
  userId:number;
}

const ViewPost: React.FC<ViewPostProps> = ({ title, body, postId, userId }) => {
  const navigation = useNavigation<any>();
  const [user, setUser] = useState<{name: string; email: string} | null>(null);
  const emailPerfil = useSelector((state: RootState) => state.validation.usernameProfile);
  const namePerfil = useSelector((state: RootState) => state.validation.nameProfile);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const data = await response.json();
        setUser({name: data.name || namePerfil, email: data.username || emailPerfil});
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    }
    fetchUser();
  },[userId])

  const handlePress = () => {
    navigation.navigate('PostDetail', { title, body, postId, userId });
  };

  return (
    <Container onPress={handlePress}>
      {user && (
        <>
          <HeaderInfo>
            <ProfileButton>
              <Ionicons name="person-outline" size={25} color="white" />
            </ProfileButton>
            <UserInfo>
              <UserName>{user.name}</UserName>
              <UserEmail>@{user.email}</UserEmail>
            </UserInfo>
          </HeaderInfo>
          <Title>{title}</Title>
          <Body>{body}</Body>
        </>
      )}
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

const ProfileButton = styled.View`
  height: 40px;
  width: 40px;
  border-radius: 50px;
  background-color: #0F90D9;
  align-items: center;
  padding: 2%;
`;

const UserInfo = styled.View`
  flex-direction: column;
  align-items: left;
  margin-bottom: 8px;
  padding-left: 5px;
`;

const HeaderInfo = styled.View`
  flex-direction: row;
  align-items: left;
  margin-bottom: 8px;
`;

const UserName = styled.Text`
  font-weight: bold;
  color: #000;
  font-size: 16px;
`;

const UserEmail = styled.Text`
  font-size: 14px;
  color: #555;
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