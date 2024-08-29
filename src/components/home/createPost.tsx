import { View, Text } from "react-native";
import styled from "styled-components/native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationProp } from "@react-navigation/native";
import { ReactElement, useState } from "react";

const  CreatePost = ({navigation}: {
  navigation: NavigationProp<any>
}): ReactElement => {

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handlePost = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          body,
        }),
      });
      const newPost = await response.json();
      navigation.navigate('Home', {newPost});
    } catch (error) {
      console.log(error)
    }
  }

  const voltar = () => {
    navigation.goBack()
  }

  return (
    <Container>
      <Header>
        <Back onPress={voltar}><Ionicons name="close" size={30} color="black" /></Back>
        <Title>Nova Publicação </Title>
      </Header>
      <Body>
        <Label>Título da publicação</Label>
        <Input placeholder="Adicione um título" value={title} onChangeText={setTitle}/>
        <Label>Texto da publicação</Label>
        <TextArea placeholder="O que gostaria de compartilhar?" value={body} onChangeText={setBody} multiline={true}/>
      </Body>
      <Footer>
        <Button onPress={handlePost}>
          <ButtonText>Publicar</ButtonText>
        </Button>
      </Footer>
    </Container>
  );
}

export default CreatePost;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 20px;
  background-color: #ffffff;
`;

const Header = styled.View`
  padding-top: 8%;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
`;

const Body = styled.View`
  flex: auto;
  display: flex;
  justify-content: center;
  background-color: #ffffff;
  padding: 15px;
`;

const Footer = styled.View`
  background-color: #ffffff;
  padding: 5%;
`;

const Input = styled.TextInput`
  width: 100%;
  padding: 15px;
  margin-bottom: 3%;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
`;

const TextArea = styled.TextInput`
  width: 100%;
  height: 50%;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 15px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  text-align: top;
`;

const Button = styled.TouchableOpacity`
  width: 100%;
  padding: 15px;
  border-radius: 50px;
  background-color: #0F90D9;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

const Title = styled.Text`
  color: #000000;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

const Back = styled.TouchableOpacity`
  height: 50px;
  width: 50px;
  align-items: center;
  padding: 2%;
`;

const Label = styled.Text`
  font-size: 16px;
  margin-bottom: 8px;
  align-items: "left";
`;
