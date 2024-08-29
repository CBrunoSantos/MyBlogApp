import { View, Text, FlatList } from "react-native";
import CreatePost from "../components/home/createPost";
import styled from "styled-components/native";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { ReactElement, useEffect, useState } from "react";
import api from "./../services/api.service";
import Ionicons from '@expo/vector-icons/Ionicons';
import ViewPost from "../components/home/viewPost";

const Home = ({navigation, route}: {
  navigation: NavigationProp<any>,
  route: RouteProp<any>
}): ReactElement => {

  const [posts, setPosts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        setPosts(data);
        setFilteredPosts(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    if(route.params?.newPost){
      setPosts([route.params?.newPost, ...posts]);
      setFilteredPosts([route.params?.newPost, ...posts]);
    }
  },[route.params?.newPost]);

  useEffect(() => {
    const results = posts.filter(post => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.body.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(results);
  }, [searchQuery, posts]);

  const renderPost = ({item}:{item:any}) => (
    <ViewPost title={item.title} body= {item.body} postId={item.id}/>
  );
  

  return (
    <Container>
      <Header>
        <ProfileButton onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-outline" size={25} color="white" />
        </ProfileButton>
        <Title>Início</Title>
        <BuscaContainer>
          <Busca
            placeholder="Buscar..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Ionicons name="search" size={24} color="black" />
        </BuscaContainer>
      </Header>
      <Body>
        <FlatList
          data={filteredPosts}
          keyExtractor={item => item.id.toString()}
          renderItem={renderPost}
        />
      </Body>
      <Button onPress={() => navigation.navigate('CreatePost')}><Ionicons name="add" size={32} color="white" /></Button>
      <Footer>
        <FooterButton onPress={() => navigation.navigate('Home')}><Ionicons name="home-outline" size={32} color="#0F90D9" /></FooterButton>
        <FooterButton onPress={() => navigation.navigate('CreatePost')}><Ionicons name="star-outline" size={32} color="#0F90D9" /></FooterButton>
      </Footer>
    </Container>
  );
}

export default Home;

const Container = styled.View`
  flex: auto;
  display: flex;
  justify-content: center;
  background-color: #EFF1F5;
`;

const Header = styled.View`
  padding-top: 10%;
  padding-left: 1%;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  background-color: #ffffff;
`;

const Footer = styled.View`
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  background-color: #ffffff;
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

const Button = styled.TouchableOpacity`
  position: absolute;
  right: 3%;
  bottom: 10%;
  height: 50px;
  width: 50px;
  border-radius: 50px;
  background-color: #0F90D9;
  align-items: center;
  padding: 2%;
`;

const FooterButton = styled.TouchableOpacity`
  border-radius: 50px;
  background-color: #ffffff;
  align-items: center;
  padding: 5%;
`;

const ProfileButton = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  border-radius: 50px;
  background-color: #0F90D9;
  align-items: center;
  padding: 2%;
`;

const BuscaContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #ffffff;
  padding: 5px;
  border-radius: 8px;
  flex: 1;
  margin-left: 16px;
`;

const Busca = styled.TextInput`
  flex: 1;
  padding: 8px;
  font-size: 16px;
`;

const Title = styled.Text`
  color: #000000;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  padding-left: 5px;
`;