import styled from "styled-components/native";
import { NavigationProp } from "@react-navigation/native";
import { ReactElement } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';

const Favorites = ({navigation}: {
  navigation: NavigationProp<any>
}): ReactElement => {


  return (
    <Container>
      <Header>
        <Title>Favoritos</Title>
          <Ionicons name="search" size={24} color="black" />
      </Header>
      <Body>
      <Ionicons name="construct-outline" size={250} color="black" />
      <Title>EM PROGRESSO</Title>
      </Body>
      <Footer>
        <FooterButton onPress={() => navigation.navigate('Home')}><Ionicons name="home-outline" size={25} color="#000000" />
          <FooterText>HOME</FooterText>
        </FooterButton>
        <FooterButton onPress={() => navigation.navigate('Favorites')}><Ionicons name="star-outline" size={25} color="#0F90D9" />
          <FooterText>FAVORITOS</FooterText>
        </FooterButton>
      </Footer>
    </Container>
  );
}

export default Favorites;

const Container = styled.View`
  flex: auto;
  display: flex;
  justify-content: center;
  background-color: #EFF1F5;
`;

const Header = styled.View`
  padding-top: 10%;
  padding-left: 1%;
  padding-right: 1%;
  padding-bottom: 4%;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  background-color: #ffffff;
`;

const Footer = styled.View`
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  background-color: #ffffff;
`;

const Body = styled.View`
  flex: auto;
  display: flex;
  justify-content: center;
  background-color: #EFF1F5;
  margin-left: auto;
  margin-right: auto;
  padding: 5%;
`;

const FooterButton = styled.TouchableOpacity`
  background-color: #ffffff;
  align-items: center;
  padding: 3%;
`;

const FooterText = styled.Text`
  background-color: #ffffff;
  align-items: center;
  font-size: 10px;
`;


const Title = styled.Text`
  color: #000000;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  padding-left: 5px;
`;