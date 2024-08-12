//Importação
import {Image, Text, StyleSheet, View, TouchableOpacity} from 'react-native';

//Definição da função do componente
const Card = props => {
  const texto = props.texto;
  const data = props.data;
  const imagem = props.imagem;

  return (
    <View style={estilos.fundo}>
      <TouchableOpacity onPress={props.funcao}>
        <Image style={estilos.imagem} source={{uri: imagem}} />
        <Text style={estilos.texto}>{texto}</Text>
        <Text style={estilos.data}>{data}</Text>
      </TouchableOpacity>
    </View>
  );
};

const estilos = StyleSheet.create({
  fundo: {
    width: 150,
    height: 150,
    backgroundColor: '#FFFFFF',
    marginVertical: 50,
    marginRight: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  texto: {
    fontSize: 30,
    color: '#3F92C5',
    textAlign: 'center',
    fontFamily: 'AveriaLibre-Regular',
  },
  imagem: {
    height: 50,
    width: 50,
  },
  data: {
    fontSize: 15,
    color: '#A3A3A3',
    textAlign: 'center',
    fontFamily: 'AveriaLibre-Regular',
  },
});

//Exportação

export default Card;
