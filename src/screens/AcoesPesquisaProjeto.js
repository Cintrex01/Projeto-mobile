import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';

const AcoesPesquisaProjeto = props => {
  const nome = useSelector(state => state.pesquisa.nome);

  useEffect(() => {
    props.navigation.setOptions({
      title: nome,
    });
  }, [nome, props.navigation]);

  const goToRelatorioProjeto = () => {
    props.navigation.navigate('RelatorioProjeto');
  };

  const goToModificarPesquisaProjeto = () => {
    props.navigation.navigate('ModificarPesquisaProjeto');
  };

  const goToColetaProjeto = () => {
    props.navigation.navigate('ColetaProjeto');
  };

  return (
    <View style={estilos.view}>
      <View style={estilos.fundo}>
        <TouchableOpacity onPress={goToModificarPesquisaProjeto}>
          <Icon name="form" style={estilos.icone} size={80} />
          <Text style={estilos.texto}>Modificar</Text>
        </TouchableOpacity>
      </View>
      <View style={estilos.fundo}>
        <TouchableOpacity onPress={goToColetaProjeto}>
          <Icon name="checksquareo" style={estilos.icone} size={80} />
          <Text style={estilos.texto}>Coletar Dados</Text>
        </TouchableOpacity>
      </View>
      <View style={estilos.fundo}>
        <TouchableOpacity onPress={goToRelatorioProjeto}>
          <Icon name="barschart" style={estilos.icone} size={80} />
          <Text style={estilos.texto}>Relatório</Text>
        </TouchableOpacity>
      </View>
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
  },
  fundo: {
    width: 200,
    height: 200,
    backgroundColor: '#312464',
    marginVertical: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    fontSize: 28,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'AveriaLibre-Regular',
  },
  icone: {
    height: '60%',
    color: '#FFFFFF',
    alignContent: 'center',
  },
});

export default AcoesPesquisaProjeto;
