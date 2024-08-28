import { View, Text } from "react-native";
import styled from "styled-components/native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationProp } from "@react-navigation/native";
import { ReactElement } from "react";

const  CreatePost = ({navigation}: {
  navigation: NavigationProp<any>
}): ReactElement => {

  const voltar = () => {
    navigation.goBack()
  }

  return (
    <Container>
      <Top>
        <Back onPress={voltar}><Ionicons name="close" size={30} color="black" /></Back>
        <Title>Nova Publicação </Title>
      </Top>
      <Body>
        <Input placeholder="Titulo"/>
        <TextArea placeholder="Descrição"/>
      </Body>
      <Footer>
        <Button onPress={() => ''}>
          <ButtonText>Publicar</ButtonText>
        </Button>
      </Footer>
    </Container>
  );
}

export default CreatePost;

const Container = styled.View`
  flex: auto;
  display: flex;
  justify-content: center;
  background-color: #EFF1F5;
`;

const Top = styled.View`
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
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
`;

const TextArea = styled.TextInput`
  width: 100%;
  height: 50%;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
`;

const Button = styled.TouchableOpacity`
  width: 100%;
  padding: 15px;
  border-radius: 50px;
  background-color: #007bff;
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