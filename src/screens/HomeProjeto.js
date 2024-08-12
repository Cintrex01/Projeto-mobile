import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Card from '../components/Card';

const HomeProjeto = props => {
  const goToAcoesPesquisaProjeto = () => {
    props.navigation.navigate('AcoesPesquisaProjeto');
  };

  const goToNovaPesquisaProjeto = () => {
    props.navigation.navigate('NovaPesquisaProjeto');
  };

  return (
    <View style={estilos.view}>
      <View style={estilos.pesquisa}>
        <Icon name="search1" size={45} color="#A3A3A3" />
        <TextInput
          style={estilos.textInput}
          placeholder="Insira o termo de busca..."
        />
      </View>
      <View style={estilos.card}>
        <Card
          texto="Ubuntu 2022"
          data="09/01/2022"
          imagem="https://cdn-icons-png.flaticon.com/512/1934/1934350.png"
          funcao={goToAcoesPesquisaProjeto}
        />
        <Card
          texto="Secomp 2020"
          data="01/04/2020"
          imagem="https://assets.stickpng.com/images/588a6ab1d06f6719692a2d25.png"
          funcao={goToAcoesPesquisaProjeto}
        />
        <Card
          texto="Biblioteca UTFPR"
          data="07/08/2021"
          imagem="https://images.vexels.com/media/users/3/157233/isolated/preview/f6bf1094d2550ae80df80f6840f7d5e6-icone-de-livro-didatico-simples.png"
          funcao={goToAcoesPesquisaProjeto}
        />
        <Card
          texto="Estágio 2023"
          data="07/08/2023"
          imagem="https://cdn-icons-png.freepik.com/512/33/33308.png"
          funcao={goToAcoesPesquisaProjeto}
        />
      </View>
      <TouchableOpacity
        onPress={goToNovaPesquisaProjeto}
        style={{backgroundColor: '#37BD6D', marginVertical: 10}}>
        <Text style={estilos.textoBotao}>Nova Pesquisa</Text>
      </TouchableOpacity>
    </View>
  );
};

const estilos = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pesquisa: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  textoBotao: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'AveriaLibre-Regular',
  },
  view: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    backgroundColor: '#372775',
  },
  texto: {
    fontSize: 28,
    color: '#FFFFFF',
    fontFamily: 'Averia-Libre-Regular',
  },
  textInput: {
    paddingHorizontal: 10,
    marginTop: 10,
    color: '#3F92C5',
    fontSize: 24,
    backgroundColor: '#FFFFFF',
    fontFamily: 'AveriaLibre-Regular',
  },
  imagem: {
    height: 100,
    width: 100,
  },
});

export default HomeProjeto;
