//Importação
import {Image, Text, StyleSheet, View, TouchableOpacity} from 'react-native';

//Definição da função do componente
const Card = props => {
  const texto = props.texto;
  const data = props.data;
  const imagem = props.imagem;

  return (
    <View style={estilos.fundo}>
      <TouchableOpacity style={estilos.card} onPress={props.funcao}>
        <Image style={estilos.imagem} source={{uri: imagem}} />
        <Text style={estilos.texto}>{texto}</Text>
        <Text style={estilos.data}>{data}</Text>
      </TouchableOpacity>
    </View>
  );
};

const estilos = StyleSheet.create({
  card: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  fundo: {
    marginTop: 30,
    width: 160,
    height: 140,
    backgroundColor: '#ffffff',
    marginRight: 15,
  },
  texto: {
    fontSize: 16,
    color: '#3F92C5',
    fontFamily: 'AveriaLibre-Regular',
    marginTop: 10,
  },
  imagem: {
    width: '90%',
    height: '70%',
  },
  data: {
    fontSize: 10,
    color: 'grey',
    fontFamily: 'AveriaLibre-Regular',
  },
});

//Exportação

export default Card;
