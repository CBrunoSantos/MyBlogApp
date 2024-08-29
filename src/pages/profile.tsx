import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserContext } from '../providers/userContext';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import { RootState } from '../hooks/store';
import { NavigationProp } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

const UserProfile = ({ navigation }: { navigation: NavigationProp<any> }): ReactElement => {
  const { user, updateUser } = useUserContext();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const emailPerfil = useSelector((state: RootState) => state.validation.emailProfile);
  const namePerfil = useSelector((state: RootState) => state.validation.nameProfile);

  const handleSave = () => {
    if(name && email){
      updateUser({name, email});
      Alert.alert('Sucesso', 'perfil atualizado com sucesso!')
    } else{
      Alert.alert('Erro', 'nome e email são obrigatórios!')
    }
  }

  const voltar = () => {
    navigation.goBack()
  }

  return (
    <Container>
      <Header>
        <Back onPress={voltar}><Ionicons name="arrow-back" size={30} color="black" /></Back>
      <Title>Perfil</Title>
      </Header>
      <Body>
      <Title>{emailPerfil}</Title>
      <Title>{namePerfil}</Title>
      <Label>Nome</Label>
      <Input value={name} onChangeText={setName} placeholder="Nome" />
      <Label>Email</Label>
      <Input value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />
      <ButtonContainer>
        <Button title="salvar" onPress={handleSave}></Button>
      </ButtonContainer>
      </Body>

    </Container>
  );
};

export default UserProfile;

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

const Title = styled.Text`
  color: #000000;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

const Body = styled.View`
  flex: auto;
  display: flex;
  justify-content: center;
  background-color: #ffffff;
  padding: 15px;
`;

const Label = styled.Text`
  font-size: 16px;
  margin-bottom: 8px;
`;

const Input = styled.TextInput`
  width: 100%;
  padding: 15px;
  margin-bottom: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
`;

const ButtonContainer = styled.View`
  margin-top: 16px;
`;
