import { View, Text } from "react-native";
import styled from "styled-components/native";

export default function Post(){
  return (
    <Container>
      <Input placeholder="Titulo"/>
      <TextArea placeholder="Descrição"/>
      <Button onPress={() => ''}>
        <ButtonText>Publicar</ButtonText>
      </Button>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 16px;
  background-color: #ffffff;
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
  border-radius: 5px;
  background-color: #007bff;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;