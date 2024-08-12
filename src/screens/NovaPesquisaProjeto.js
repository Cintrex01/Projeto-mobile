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
import {app, storage} from '../firebase/config';
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
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [nomeErro, setNomeErro] = useState('');
  const [dataErro, setDataErro] = useState('');
  const [listaPesquisas, setListaPesquisas] = useState('');
  const [urlFoto, setUrlFoto] = useState('');
  const [foto, setFoto] = useState();

  const goToHomeProjetoDrawer = () => {
    props.navigation.navigate('Drawer');
  };

  const validar = async () => {
    if (nome.length === 0 && data.length === 0) {
      setNomeErro('Nome esta vazio.');
      setDataErro('Data esta vazia.');
    } else if (data.length === 0) {
      setDataErro('Data esta vazia.');
      setNomeErro('');
    } else if (nome.length === 0) {
      setNomeErro('Nome esta vazio.');
      setDataErro('');
    } else {
      const imageRef = ref(storage, 'minhaImagem.png');
      const file = await fetch(urlFoto);
      const blob = await file.blob();
      uploadBytes(imageRef, blob, {contentType: 'image/jpeg'})
        .then(() => {
          console.log('Arquivo enviado com sucesso.');
          getDownloadURL(imageRef)
          .then(
            (url) => {
              
            }
          )
          .catch(
            (error) => {
              console.log('Erro ao pegar URL: ' + JSON.stringify(error))
            }
          )
        })
        .catch(error => {
          console.log('Erro ao enviar o arquivo: ' + JSON.stringify(error));
        });
      addPesquisa();
      goToHomeProjetoDrawer();
    }
  };

  useEffect(() => {
    const q = query(pesquisaCollection);

    const unsubscribe = onSnapshot(q, snapshot => {
      const pesquisas = [];
      snapshot.forEach(doc => {
        pesquisas.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setListaPesquisas(pesquisas);
    });
  }, []);

  const addPesquisa = () => {
    const docPesquisa = {
      nome: nome,
      data: data,
    };

    addDoc(pesquisaCollection, docPesquisa)
      .then(docRef => {
        console.log('Novo documento inserido com sucesso: ' + docRef.id);
      })
      .catch(erro => {
        console.log('Erro: ' + erro);
      });
  };

  const itemPesquisa = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          changePesquisa(item.id); //So mudar para changePesquisa p deletePesquisa para deletar
        }}>
        <Text>
          Id: {item.id} Nome: {item.nome} Data: {item.data}
        </Text>
      </TouchableOpacity>
    );
  };

  const changePesquisa = id => {
    const pesquisaRef = doc(db, 'pesquisas', id);

    updateDoc(pesquisaRef, {
      nome: 'Zapzap',
      data: '21/02/2024',
    });
  };

  const deletePesquisa = id => {
    deleteDoc(doc(db, 'pesquisas', id));
  };

  const capturarImagem = () => {
    launchCamera({mediaType: 'photo', cameraType: 'back', quality: 1})
      .then(result => {
        setUrlFoto(result.assets[0].uri);
        setFoto(result.assets[0]);
      })

      .catch(error => {
        console.log('Erro ao capturar imagem: ' + JSON.stringify(error));
      });
  };

  const selecionarImagemGaleria = () => {
    launchImageLibrary()
      .then(result => {
        setUrlFoto(result.assets[0].uri);
        setFoto(result.assets[0]);
      })

      .catch(error => {
        console.log('Erro ao capturar imagem: ' + JSON.stringify(error));
      });
  };

  const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
  });
  const pesquisaCollection = collection(db, 'pesquisas');

  return (
    <View style={estilos.view}>
      <View>
        <FlatList
          data={listaPesquisas}
          renderItem={itemPesquisa}
          keyExtractor={pesquisa => pesquisa.id}
        />
      </View>
      <Text style={estilos.texto}>Nome</Text>
      <TextInput
        style={estilos.textInput}
        value={nome}
        onChangeText={setNome}
      />
      <Text style={{color: '#FD7979', fontFamily: 'AveriaLibre-Regular'}}>
        {nomeErro}
      </Text>
      <Text style={estilos.texto}>Data</Text>
      <View style={estilos.data}>
        <TextInput
          style={estilos.textInput}
          value={data}
          onChangeText={setData}
        />
        <Icon name="calendar-month-outline" size={45} color="#A3A3A3" />
      </View>
      <Text style={{color: '#FD7979', fontFamily: 'AveriaLibre-Regular'}}>
        {dataErro}
      </Text>
      <Text style={estilos.texto}>Imagem</Text>
      <TouchableOpacity
        style={{backgroundColor: '#3F92C5', marginVertical: 10}}
        onPress={capturarImagem}>
        <Text style={estilos.textoBotao}>Capturar Imagem</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{backgroundColor: '#3F92C5', marginVertical: 10}}
        onPress={selecionarImagemGaleria}>
        <Text style={estilos.textoBotao}>Selecionar Imagem da Galeria</Text>
      </TouchableOpacity>
      {urlFoto ? (
        <Image
          style={estilos.imagem}
          source={{
            uri: urlFoto,
          }}
        />
      ) : null}
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
});

export default NovaPesquisaProjeto;
