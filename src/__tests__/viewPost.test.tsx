// src/components/__tests__/ViewPost.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ViewPost from '../components/home/viewPost'; // Certifique-se de ajustar o caminho de acordo com seu projeto
import { NavigationContainer } from '@react-navigation/native';

describe('ViewPost Component', () => {
  const mockNavigate = jest.fn();

  const props = {
    title: 'Título do Post',
    body: 'Corpo do post',
    postId: 1,
    userId: 1,
  };

  beforeEach(() => {
    mockNavigate.mockReset();
  });

  it('deve renderizar corretamente com o título e o corpo', () => {
    const { getByText } = render(
      <NavigationContainer>
        <ViewPost {...props} />
      </NavigationContainer>
    );

    expect(getByText('Título do Post')).toBeTruthy();
    expect(getByText('Corpo do post')).toBeTruthy();
  });

  it('deve navegar para o PostDetail ao pressionar o post', () => {
    const { getByText } = render(
      <NavigationContainer>
        <ViewPost {...props} />
      </NavigationContainer>
    );

    fireEvent.press(getByText('Título do Post'));

    // Aqui, verificamos se a navegação foi chamada
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('PostDetail', {
      title: props.title,
      body: props.body,
      postId: props.postId,
      userId: props.userId,
    });
  });
});
