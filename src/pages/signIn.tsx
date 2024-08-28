import { NavigationProp } from '@react-navigation/native';
import React, { ReactElement } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const SignIn = ({navigation}: {
  navigation: NavigationProp<any>
}):  ReactElement => {

  const submit = () => {
    navigation.navigate('');
  }

  
  return (
    <Container>
      <Input placeholder="Nome"/>
      <Input placeholder="E-mail" keyboardType="email-address" />
      <Input placeholder="Senha" secureTextEntry />
      <Button onPress={() => navigation.navigate('Home')}>
        <ButtonText>Criar conta</ButtonText>
      </Button>
    </Container>
  );
};

export default SignIn;

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