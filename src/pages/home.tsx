import { View, Text } from "react-native";
import Post from "../components/home/post";
import styled from "styled-components/native";
import { NavigationProp } from "@react-navigation/native";
import { ReactElement } from "react";
import api from "./../services/api.service";

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
      fetch("https://jsonplaceholder.typicode.com/todos/", requestOptions)
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
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Home</Text>
      <Button onPress={() => navigation.navigate('Post')}></Button>
      <Busca onPress={submit}><Text>buscar dados</Text></Busca>
    </View>
  );
}

const Button = styled.TouchableOpacity`
  height: 50px;
  width: 50px;
  border-radius: 50px;
  background-color: #007bff;
`;

const Busca = styled.TouchableOpacity`
  height: 50px;
  width: 50px;
  background-color: #007bff;
  text-align: 'center';
`;

export default Home;