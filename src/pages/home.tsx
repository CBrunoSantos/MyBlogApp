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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    if(route.params?.newPost){
      setPosts([route.params?.newPost, ...posts])
    }
  },[route.params?.newPost]);

  const renderPost = ({item}:{item:any}) => (
    <ViewPost title={item.title} body= {item.body}/>
  );

  const submit = () => {
    console.log("post")
  }

  return (
    <Container>
      <Top>
        <Title>Início</Title>
        <Busca onPress={submit}><Ionicons name="search" size={32} color="black" /></Busca>
      </Top>
      <Body>
        <FlatList 
        data={posts} 
        keyExtractor={item => item.id.toString()}
        renderItem={renderPost}/>
      </Body>
      <Footer>
      <Button onPress={() => navigation.navigate('CreatePost')}><Ionicons name="add" size={32} color="white" /></Button>
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

const Top = styled.View`
  padding: 5%;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const Footer = styled.View`
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  margin-bottom: 2%;
  margin-right: 2%;
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
  height: 50px;
  width: 50px;
  border-radius: 50px;
  background-color: #007bff;
  align-items: center;
  padding: 2%;
`;

const Busca = styled.TouchableOpacity`
  height: 50px;
  width: 50px;
  align-items: center;
  padding: 2%;
`;

const Title = styled.Text`
  color: #000000;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
`;