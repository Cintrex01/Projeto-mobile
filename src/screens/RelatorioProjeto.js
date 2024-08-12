import {View, Image, StyleSheet} from 'react-native';

const RelatorioProjeto = props => {
  return (
    <View style={estilos.view}>
      <Image
        style={estilos.imagem}
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/3589/3589863.png',
        }}
      />
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
  imagem: {
    height: 300,
    width: 300,
  },
});

export default RelatorioProjeto;
