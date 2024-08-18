import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {db, storage} from '../firebase/config';
import {
  collection,
  initializeFirestore,
  addDoc,
  query,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {uploadBytes, ref, getDownloadURL} from 'firebase/storage';

const NovaPesquisaProjeto = props => {
  const [txtNome, setTxtNome] = useState('');
  const [txtData, setTxtData] = useState('');
  const [txtDataError, setTxtDataError] = useState('');
  const [txtNomeError, setTxtNomeError] = useState('');
  const [fotoError, setFotoError] = useState('');
  const [urlFoto, setUrlFoto] = useState('');
  const [foto, setFoto] = useState();

  const pesquisaCollection = collection(db, 'pesquisas');

  const addPesquisa = async () => {
    if (!txtNome) {
      setTxtNomeError('Preencha o nome da pesquisa');
    } else if (!txtData || txtData.length < 10) {
      setTxtDataError('Preencha a data');
    } else if (!foto) {
      setFotoError('Selecione uma imagem');
    } else {
      setTxtDataError(null);
      setTxtNomeError(null);
      setFotoError(null);

      const imageRef = ref(storage, 'pesquisas/' + txtNome + '.jpg');
      const file = await fetch(urlFoto);
      const blob = await file.blob();

      uploadBytes(imageRef, blob, {contentType: 'image/jpeg'})
        .then(result => {
          console.log('Imagem enviada com sucesso!');
          getDownloadURL(imageRef).then(url => {
            const docPesquisa = {
              nome: txtNome,
              data: txtData,
              imageUrl: url,
              votos: {
                pessimo: 0,
                ruim: 0,
                neutro: 0,
                bom: 0,
                excelente: 0,
              },
            };

            addDoc(pesquisaCollection, docPesquisa)
              .then(docRef => {
                console.log('Pesquisa adicionada com sucesso!' + docRef.id);
                props.navigation.navigate('Pesquisas');
              })
              .catch(error => {
                console.log('Erro ao adicionar pesquisa: ' + error);
              });
          });
        })
        .catch(error => {
          console.log('Erro ao enviar imagem: ' + error);
        });
    }
  };

  const selecionarFoto = () => {
    launchImageLibrary()
      .then(result => {
        setUrlFoto(result.assets[0].uri);
        setFoto(result.assets[0]);
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
        setUrlFoto(result.assets[0].uri);
        setFoto(result.assets[0]);
      })
      .catch(error => {
        console.log('Erro ao capturar foto: ' + JSON.stringify(error));
      });
  };

  const goToHomeProjetoDrawer = () => {
    props.navigation.navigate('HomeProjeto');
  };

  const validar = async () => {
    if (txtNome.length === 0 && txtData.length === 0) {
      setTxtNomeError('Nome esta vazio.');
      setTxtDataError('Data esta vazia.');
    } else if (txtData.length === 0) {
      setTxtDataError('Data esta vazia.');
      setTxtNomeError('');
    } else if (txtNome.length === 0) {
      setTxtNomeError('Nome esta vazio.');
      setTxtDataError('');
    } else {
      addPesquisa();
      goToHomeProjetoDrawer();
    }
  };

  return (
    <View style={estilos.view}>
      <Text style={estilos.texto}>Nome</Text>
      <TextInput
        style={estilos.textInput}
        value={txtNome}
        onChangeText={setTxtNome}
      />
      <Text style={{color: '#FD7979', fontFamily: 'AveriaLibre-Regular'}}>
        {txtNomeError}
      </Text>
      <Text style={estilos.texto}>Data</Text>
      <View style={estilos.data}>
        <TextInput
          style={estilos.textInput}
          value={txtData}
          onChangeText={setTxtData}
        />
        <Icon name="calendar-month-outline" size={45} color="#A3A3A3" />
      </View>
      <Text style={{color: '#FD7979', fontFamily: 'AveriaLibre-Regular'}}>
        {txtDataError}
      </Text>
      <Text style={estilos.texto}>Imagem</Text>
      {urlFoto ? null : (
        <TextInput
          style={estilos.textInputImagem}
          value="Câmera/Galeria"
          editable={false}
        />
      )}
      {urlFoto ? (
        <Image source={{uri: urlFoto}} style={estilos.imagem} />
      ) : null}
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
      {fotoError ? <Text style={styles.errorText}>{fotoError}</Text> : null}
      <TouchableOpacity
        style={{backgroundColor: '#37BD6D', marginVertical: 10}}
        onPress={validar}>
        <Text style={estilos.textoBotao}>Cadastrar</Text>
      </TouchableOpacity>
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
  textInputImagem: {
    padding: 10,
    fontSize: 20,
    borderWidth: 1,
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
    color: 'gray',
    width: '60%',
    height: 50,
  },
  imagem: {
    marginVertical: 10,
    height: 150,
    width: 150,
  },
});

export default NovaPesquisaProjeto;
