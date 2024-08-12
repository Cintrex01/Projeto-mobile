import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const AgradecimentoParticipacaoProjeto = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.goBack(); // Volta para a tela anterior após 3 segundos
    }, 3000); // 3000 milissegundos = 3 segundos

    return () => clearTimeout(timer); // Limpa o timer ao desmontar o componente
  }, [navigation]);

  return (
    <View style={estilos.view}>
      <Text style={estilos.texto}>Obrigado por participar da pesquisa!</Text>
      <Text style={estilos.texto}>Aguardamos você no próximo ano!</Text>
    </View>
  );
};

const estilos = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    backgroundColor: '#372775',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'AveriaLibre-Regular',
  },
});

export default AgradecimentoParticipacaoProjeto;
