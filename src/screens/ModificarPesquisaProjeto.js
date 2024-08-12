import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ModificarPesquisaProjeto = props => {
  const [nome, setNome] = useState('Carnaval 2024');
  const [data, setData] = useState('16/02/2024');
  const [modalVisivel, setModalVisivel] = useState(false);

  const abrirPopup = () => {
    setModalVisivel(true);
  };

  const fecharPopup = () => {
    setModalVisivel(false);
  };

  const goToHomeProjetoDrawer = () => {
    props.navigation.navigate('Drawer');
  };

  return (
    <View style={estilos.view}>
      <Text style={estilos.texto}>Nome</Text>
      <TextInput
        style={estilos.textInput}
        value={nome}
        onChangeText={setNome}
      />
      <Text style={estilos.texto}>Data</Text>
      <View style={estilos.data}>
        <TextInput
          style={estilos.textInput}
          value={data}
          onChangeText={setData}
        />
        <Icon name="calendar-month-outline" size={45} color="#A3A3A3" />
      </View>
      <Text style={estilos.texto}>Imagem</Text>
      <Image
        style={estilos.imagem}
        source={{
          uri: 'https://www.limelightonline.co.nz/uploads/Limlight_choosing%20the%20right%20image.png?resize=1&w=NaN&h=229',
        }}
      />

      <TouchableOpacity
        style={{backgroundColor: '#37BD6D', marginVertical: 10}}
        onPress={goToHomeProjetoDrawer}>
        <Text style={estilos.textoBotao}>Salvar</Text>
      </TouchableOpacity>

      <View style={estilos.lixeira}>
        <TouchableOpacity onPress={abrirPopup}>
          <Icon name="trash-can-outline" size={45} color="#FFFFFF" />
          <Text style={estilos.textoLixeira}>Apagar</Text>
        </TouchableOpacity>
      </View>

      {/* Popup */}
      <Modal
        visible={modalVisivel}
        animationType="slide"
        transparent={true}
        onRequestClose={fecharPopup}>
        <View style={estilos.popup}>
          <Text style={estilos.texto}>
            Tem certeza que deseja apagar essa pesquisa?
          </Text>
          <View styles={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{
                backgroundColor: '#FF8383',
                margin: 10,
                padding: 5,
                borderRadius: 5,
              }}
              onPress={goToHomeProjetoDrawer}>
              <Text style={estilos.texto}>Sim</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#3F92C5',
                margin: 10,
                padding: 5,
                borderRadius: 5,
              }}
              onPress={fecharPopup}>
              <Text style={estilos.texto}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const estilos = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    backgroundColor: '#372775',
  },
  texto: {
    marginTop: 10,
    fontSize: 28,
    color: '#FFFFFF',
    fontFamily: 'AveriaLibre-Regular',
  },
  textInput: {
    paddingHorizontal: 10,
    marginTop: 10,
    color: '#3F92C5',
    fontSize: 28,
    backgroundColor: '#FFFFFF',
    fontFamily: 'AveriaLibre-Regular',
  },
  textoBotao: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'AveriaLibre-Regular',
  },
  imagem: {
    marginVertical: 10,
    height: 150,
    width: 150,
  },
  data: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
  lixeira: {
    margin: 30,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  textoLixeira: {
    fontSize: 15,
    marginTop: 10,
    color: '#FFFFFF',
    fontFamily: 'AveriaLibre-Regular',
  },
  popup: {
    backgroundColor: '#372775',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
});

export default ModificarPesquisaProjeto;
