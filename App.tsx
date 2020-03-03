import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import ListQuestions from './src/screens/ListQuestions';
import { Container, Header, Body, Title } from "native-base";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import GlobalStyles from './src/styles/GlobalStyles';

export default function App() {
  
  const [isReady, setReady] = useState(false);

  const getFonts = async () => {
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      });
      setReady(true);    
  }

  useEffect(() => {
    getFonts();
  }, [])
  
  return (
      !isReady ? <AppLoading/> :
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <Container>
          <Header> 
            <Body style={{alignItems: 'center'}}>
              <Title>Preguntas y respuestas</Title>
            </Body>        
          </Header>
          <ListQuestions />
        </Container>
      </SafeAreaView> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
