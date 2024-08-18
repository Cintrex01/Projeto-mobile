import React, {useState, useEffect} from 'react';
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
import {updateDoc, doc, deleteDoc} from 'firebase/firestore';
import {ref, deleteObject, uploadBytes, getDownloadURL} from 'firebase/storage';
import {db, storage} from '../firebase/config';
import {useSelector} from 'react-redux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const ModificarPesquisaProjeto = props => {
  const [txtNome, setTxtNome] = useState('Carnaval 2024');
  const [txtData, setTxtData] = useState('16/02/2024');
  const [img, setImg] = useState('');
  const [txtDataError, setDataError] = useState('');
  const [txtNomeError, setNomeError] = useState('');
  const [imgError, setImgError] = useState('');
  const [modalVisivel, setModalVisivel] = useState(false);

  const id = useSelector(state => state.pesquisa.id);
  const nome = useSelector(state => state.pesquisa.nome);
  const data = useSelector(state => state.pesquisa.data);
  const imageUrl = useSelector(state => state.pesquisa.imageUrl);

  useEffect(() => {
    setTxtNome(nome);
    setTxtData(data);
    setImg(imageUrl);
  }, []);

  const nomeAntigo = nome;

  const abrirPopup = () => {
    setModalVisivel(true);
  };

  const fecharPopup = () => {
    setModalVisivel(false);
  };

  const goToHomeProjetoDrawer = () => {
    props.navigation.navigate('Drawer');
  };

  const salvarMudancas = async () => {
    if (!txtNome) {
      setNomeError('Preencha o nome da pesquisa');
    } else if (!txtData || txtData.length < 10) {
      setDataError('Preencha a data');
    } else if (!img) {
      setImgError('Preencha a imagem');
    } else {
      setDataError(null);
      setNomeError(null);
      setImgError(null);

      const cardRef = doc(db, 'pesquisas', id);

      //Apaga a imagem antiga e salva uma com o novo nome
      const imgRef = ref(storage, 'pesquisas/' + nomeAntigo + '.jpg');
      deleteObject(imgRef)
        .then(() => {
          console.log('Imagem atualizada com sucesso!');
        })
        .catch(error => {
          console.log('Erro ao apagar imagem: ' + error);
        });

      const imageRef = ref(storage, 'pesquisas/' + txtNome + '.jpg');
      const response = await fetch(img);
      const blob = await response.blob();

      uploadBytes(imageRef, blob, {contentType: 'image/jpeg'})
        .then(result => {
          getDownloadURL(imageRef).then(url => {
            const docPesquisa = {
              nome: txtNome,
              data: txtData,
              imageUrl: url,
            };

            updateDoc(cardRef, docPesquisa)
              .then(() => {
                console.log('Pesquisa alterada com sucesso!');
                props.navigation.navigate('Pesquisas');
              })
              .catch(error => {
                console.log('Erro ao modificar pesquisa: ' + error);
              });
          });
        })
        .catch(error => {
          console.log('Erro ao enviar imagem: ' + error);
        });
    }
  };

  const deletarPesquisa = () => {
    const cardRef = doc(db, 'pesquisas', id);
    const imgRef = ref(storage, 'pesquisas/' + nomeAntigo + '.jpg');

    deleteDoc(cardRef)
      .then(() => {
        console.log('Pesquisa apagada com sucesso!');
        props.navigation.navigate('Pesquisas');
      })
      .catch(error => {
        console.log('Erro ao apagar pesquisa: ' + error);
      });

    deleteObject(imgRef)
      .then(() => {
        console.log('Imagem apagada com sucesso!');
      })
      .catch(error => {
        console.log('Erro ao apagar imagem: ' + error);
      });
  };

  const selecionarFoto = () => {
    launchImageLibrary()
      .then(result => {
        setImg(result.assets[0].uri);
      })
      .catch(error => {
        console.log('Erro ao selecionar foto: ' + JSON.stringify(error));
      });
  };

  const capturarFoto = () => {
    launchCamera({
      mediaType: 'photo',
      cameraType: 'back',
      quality: 1,
    })
      .then(result => {
        setImg(result.assets[0].uri);
      })
      .catch(error => {
        console.log('Erro ao capturar foto: ' + JSON.stringify(error));
      });
  };

  return (
    <View style={estilos.view}>
      <Text style={estilos.texto}>Nome</Text>
      <TextInput
        style={estilos.textInput}
        value={txtNome}
        onChangeText={setTxtNome}
      />
      <Text style={estilos.texto}>Data</Text>
      <View style={estilos.data}>
        <TextInput
          style={estilos.textInput}
          value={txtData}
          onChangeText={setTxtData}
        />
        <Icon name="calendar-month-outline" size={45} color="#A3A3A3" />
      </View>
      <Text style={estilos.texto}>Imagem</Text>
      {img ? <Image source={{uri: img}} style={estilos.imagem} /> : null}

      <TouchableOpacity
        style={{backgroundColor: '#3F92C5', marginVertical: 10}}
        onPress={capturarFoto}>
        <Text style={estilos.textoBotao}>Capturar Imagem</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{backgroundColor: '#3F92C5', marginVertical: 10}}
        onPress={selecionarFoto}>
        <Text style={estilos.textoBotao}>Selecionar Imagem da Galeria</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{backgroundColor: '#37BD6D', marginVertical: 10}}
        onPress={salvarMudancas}>
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
              onPress={deletarPesquisa}>
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
  imagem: {
    marginVertical: 10,
    height: 150,
    width: 150,
  },
});

export default ModificarPesquisaProjeto;
