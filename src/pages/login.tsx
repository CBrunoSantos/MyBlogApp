import { NavigationProp } from '@react-navigation/native';
import React, { ReactElement, useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setNameProfile,setUsernameProfile } from '../hooks/validation';

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
        console.log('Usuário nome', user.name, 'Usuário email', user.email);
        dispatch(setUsernameProfile(user.username));
        dispatch(setNameProfile(user.name));
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
      <Title>Login</Title>
      <Label>E-mail</Label>
      <Input
        placeholder="Endereço de e-mail"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <Label>Senha</Label>
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
        <SignText>Criar nova conta</SignText>
      </SignIn>
    </Container>
  );
};

export default Login;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 16px;
  background-color: #ffffff;
`;

const Input = styled.TextInput`
  width: 100%;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 15px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
`;

const Button = styled.TouchableOpacity`
  width: 100%;
  padding: 15px;
  border-radius: 5px;
  background-color: #0F90D9;
  align-items: center;
  border-radius: 30px;
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
  align-items: center;
  margin-top: 5px;
`;

const SignText = styled.Text`
  color: #0F90D9;
  font-size: 16px;
  font-weight: bold;
`;

const Title = styled.Text`
text-align: center;
  color: #000000;
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 15%;
`;

const Label = styled.Text`
  font-size: 16px;
  margin-bottom: 8px;
  align-items: "left";
`;
