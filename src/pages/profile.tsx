import React, { useContext, useEffect, useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserContext } from '../providers/userContext';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import { RootState } from '../hooks/store';

const UserProfile = () => {
  const { user, updateUser } = useUserContext();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const emailPerfil = useSelector((state: RootState) => state.validation.name);

  const handleSave = () => {
    if(name && email){
      updateUser({name, email});
      Alert.alert('Sucesso', 'perfil atualizado com sucesso!')
    } else{
      Alert.alert('Erro', 'nome e email são obrigatórios!')
    }
  }

  return (
    <Container>
      <Title>Perfil</Title>
      <Title>{emailPerfil}</Title>
      <Label>Nome</Label>
      <Input value={name} onChangeText={setName} placeholder="Nome" />
      <Label>Email</Label>
      <Input value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />
      <ButtonContainer>
        <Button title="salvar" onPress={handleSave}></Button>
      </ButtonContainer>
    </Container>
  );
};

export default UserProfile;

const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: #ffffff;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
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
