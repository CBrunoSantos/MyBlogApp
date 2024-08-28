import { NavigationProp } from '@react-navigation/native';
import React, { ReactElement } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const Login = ({navigation}: {
  navigation: NavigationProp<any>
}):  ReactElement => {

  const submit = () => {
    navigation.navigate('');
  }

  
  return (
    <Container>
      <Title>Entrar</Title>
      <Input placeholder="E-mail" keyboardType="email-address" />
      <Input placeholder="Senha" secureTextEntry />
      <Button onPress={() => navigation.navigate('Home')}>
        <ButtonText>Entrar</ButtonText>
      </Button>

      <SignIn onPress={() => navigation.navigate('SignIn')}>
        <ButtonText>Criar uma conta nova</ButtonText>
      </SignIn>
    </Container>
  );
};

export default Login;

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

const SignIn = styled.TouchableOpacity`
  width: 100%;
  padding: 5px;
  border-radius: 5px;
  background-color: #007bff;
  align-items: center;
  margin-top: 5px;
`;

const Title = styled.Text`
  color: #000000;
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 30%;
`;