# MyBlogApp

MyBlogApp é uma aplicação mobile de blog construída utilizando React Native e Expo. O aplicativo permite que os usuários visualizem postagens, criem novas postagens, comentem nas postagens existentes e gerenciem suas contas de usuário.

## Funcionalidades

- Visualização de postagens de blog.
- Criação de novas postagens.
- Exibição e adição de comentários em postagens.
- Autenticação de usuários (criação de conta e login).
- Pesquisa de postagens por título ou conteúdo.
- Armazenamento local de dados do usuário utilizando `AsyncStorage`.

## Tecnologias Utilizadas

- **React Native**: Biblioteca para desenvolvimento de aplicativos móveis.
- **Expo**: Ferramenta e framework para construir aplicativos React Native rapidamente.
- **Styled Components**: Biblioteca para estilização de componentes.
- **React Navigation**: Biblioteca para navegação no React Native.
- **AsyncStorage**: Biblioteca para armazenamento local de dados no dispositivo.

## Pré-requisitos

Será necessário as seguintes ferramentas:

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

Foi utilizado o Android Studio para esse projeto

- **Android Studio** (para emular dispositivos Android)

## Estrutura do Projeto

MyBlogApp
├── src
│   ├── components
│   │   ├── home
│   │   ├── login
│   │   └── profile
│   ├── pages
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── SignIn.tsx
│   │   └── PostDetail.tsx
│   ├── services
│   │   └── api.service.ts
│   └── context
│       └── UserContext.tsx
├── App.tsx
├── package.json
└── README.md


## Instalação

Siga os passos abaixo para rodar o projeto:

1. **Clone o repositório**:

    ```bash
    git clone https://github.com/CBrunoSantos/MyBlogApp.git
    cd MyBlogApp
    ```

2. **Instale as dependências**:

    ```bash
    npm install
    ```

3. **Instale o Expo CLI globalmente**:

    ```bash
    npm install -g expo-cli
    ```

4. **Execute o projeto**:

    ```bash
    expo start
    ```

5. **Rodar no Android**:

    ```bash
    npm run android
    ```