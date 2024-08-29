import { NavigationProp } from '@react-navigation/native';
import React, { ReactElement, useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';

const SignIn = ({ navigation }: { navigation: NavigationProp<any> }): ReactElement => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
    if (!name || !email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      username: name.toLowerCase().replace(/\s+/g, ''),
      email,
      password,
    };

    try {
      const usersJson = await AsyncStorage.getItem('@users');
      const users = usersJson ? JSON.parse(usersJson) : [];

      users.push(newUser);

      await AsyncStorage.setItem('@users', JSON.stringify(users));
      console.log('Usuário criado:', newUser);

      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  };

  const voltar = () => {
    navigation.goBack()
  }

  return (
    <Container>
      <Header>
        <Back onPress={voltar}><Ionicons name="arrow-back" size={30} color="black" /></Back>
        <Title>Criar nova conta </Title>
      </Header>
      <Body>
        <Label>Nome de usuário</Label>
        <Input placeholder="Nome de usuário" value={name} onChangeText={setName} />
        <Label>E-mail</Label>
        <Input placeholder="Endereço de e-mail" keyboardType="email-address" value={email} onChangeText={setEmail} />
        <Label>Senha</Label>
        <Input placeholder="Adicione uma senha" secureTextEntry value={password} onChangeText={setPassword} />
        <Button onPress={submit}>
          <ButtonText>Criar conta</ButtonText>
        </Button>
      </Body>
    </Container>
  );
};

export default SignIn;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 20px;
  background-color: #ffffff;
`;

const Header = styled.View`
  padding-top: 10%;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
`;

const Back = styled.TouchableOpacity`
  height: 50px;
  width: 50px;
  align-items: center;
  padding: 2%;
`;

const Body = styled.View`
  flex: auto;
  display: flex;
  justify-content: center;
  background-color: #ffffff;
  padding: 15px;
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

const Label = styled.Text`
  font-size: 16px;
  margin-bottom: 8px;
  align-items: "left";
`;

const Title = styled.Text`
  color: #000000;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;