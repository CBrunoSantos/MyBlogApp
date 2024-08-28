import { View, Text } from "react-native";
import CreatePost from "../components/home/createPost";
import styled from "styled-components/native";
import { NavigationProp } from "@react-navigation/native";
import { ReactElement } from "react";
import api from "./../services/api.service";
import Ionicons from '@expo/vector-icons/Ionicons';

const Home = ({navigation}: {
  navigation: NavigationProp<any>
}): ReactElement => {


  const fetchData = async () =>{
    try {
      // await api.get('/todos/')
      const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      //@ts-ignore
      fetch("https://jsonplaceholder.typicode.com/posts", requestOptions)
        .then((result) => console.log(result))
      
    } catch (error) {
      console.log(error)
    }
  }

  const submit = () => {
    // console.log("post")
    fetchData();
  }

  return (
    <Container>
      <Top>
        <Title>Início</Title>
        <Busca onPress={submit}><Ionicons name="search" size={32} color="black" /></Busca>
      </Top>
      <Body>

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
  background-color: #ffffff;
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