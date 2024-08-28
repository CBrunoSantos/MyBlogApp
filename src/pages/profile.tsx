import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Definindo a interface do tipo User
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;  // Em um app real, a senha deve ser criptografada
}

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('@user');
        if (userData !== null) {
          setUser(JSON.parse(userData) as User);
        }
      } catch (error) {
        console.error('Erro ao carregar os dados do usuário:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <View>
      {user ? (
        <>
          <Text>Nome: {user.name}</Text>
          <Text>Email: {user.email}</Text>
          <Text>Username: {user.username}</Text>
        </>
      ) : (
        <Text>Usuário não encontrado.</Text>
      )}
    </View>
  );
};

export default UserProfile;
