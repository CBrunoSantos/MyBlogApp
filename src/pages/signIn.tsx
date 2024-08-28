import { NavigationProp } from '@react-navigation/native';
import React, { ReactElement, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = ({navigation}: {
  navigation: NavigationProp<any>
}):  ReactElement => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
    if (!name || !email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const newUser = {
      id: Date.now(), // Usando timestamp como ID único
      name,
      username: name.toLowerCase().replace(/\s+/g, ''), // Criar um username baseado no nome
      email,
      password, // Em um app real, a senha deve ser criptografada
    };

    try {
      // Salvar o novo usuário localmente usando AsyncStorage
      await AsyncStorage.setItem('@user', JSON.stringify(newUser));
      console.log('Usuário criado:', newUser);

      // Navegar para a Home
      navigation.navigate('Home');
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  };
  
  return (
    <Container>
      <Input placeholder="Nome" value={name} onChangeText={setName} />
      <Input placeholder="E-mail" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <Input placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword} />
      <Button onPress={submit}>
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