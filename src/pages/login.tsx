import { NavigationProp } from '@react-navigation/native';
import React, { ReactElement, useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setName } from '../hooks/validation';

const Login = ({ navigation }: { navigation: NavigationProp<any> }): ReactElement => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const submit = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const usersJson = await AsyncStorage.getItem('@users');
      const users = usersJson ? JSON.parse(usersJson) : [];

      const user = users.find(
        (u: { email: string; password: string }) => u.email === email && u.password === password
      );

      if (user) {
        console.log('Usuário autenticado', user);
        dispatch(setName(email));
        navigation.navigate('Home');
      } else {
        Alert.alert('Erro', 'E-mail ou senha inválidos');
      }
    } catch (error) {
      console.log('Erro ao autenticar usuário', error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar autenticar.');
    }
  };

  return (
    <Container>
      <Title>Entrar</Title>
      <Input
        placeholder="E-mail"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <Input
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
      />
      <Button onPress={submit}>
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
