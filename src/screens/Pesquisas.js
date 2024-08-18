import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  getDoc,
} from 'firebase/firestore';
import {useEffect, useState} from 'react';
import {db} from '../firebase/config';
import Icon from 'react-native-vector-icons/FontAwesome';
import Card from '../components/Card';
import {reducerSetPesquisa} from '../redux/pesquisaSlice';
import {useDispatch} from 'react-redux';

const Pesquisas = props => {
  const [listaPesquisas, setListaPesquisas] = useState();

  const pesquisaCollection = collection(db, 'pesquisas');

  const dispatch = useDispatch();

  useEffect(() => {
    const q = query(pesquisaCollection, orderBy('nome', 'asc'));

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

  const itemPesquisa = ({item}) => {
    return (
      <Card
        texto={item.nome}
        data={item.data}
        imagem={item.imageUrl}
        funcao={() => goToAcoesPesquisa(item.id)}
      />
    );
  };

  const goToNovaPesquisa = () => {
    props.navigation.navigate('NovaPesquisaProjeto');
  };

  const goToAcoesPesquisa = async id => {
    const cardRef = doc(db, 'pesquisas', id);

    try {
      const docSnapshot = await getDoc(cardRef);
      if (docSnapshot.exists()) {
        const cardData = docSnapshot.data();

        dispatch(
          reducerSetPesquisa({
            id: id,
            nome: cardData.nome,
            data: cardData.data,
            imageUrl: cardData.imageUrl,
          }),
        );

        props.navigation.navigate('AcoesPesquisaProjeto');
      } else {
        console.log('O documento não existe!');
      }
    } catch (error) {
      console.error('Erro ao obter dados do documento:', error);
    }
  };

  return (
    <View style={estilos.view}>
      <View style={estilos.container}>
        <Icon style={estilos.icon} name="search" size={20} color="#ffffff" />
        <TextInput
          style={estilos.textInput}
          placeholder="Insira o termo de busca..."
        />
      </View>

      <View style={{height: 180}}>
        <FlatList
          horizontal={true}
          data={listaPesquisas}
          renderItem={itemPesquisa}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <TouchableOpacity
        style={{backgroundColor: '#37BD6D', marginVertical: 10}}
        onPress={goToNovaPesquisa}>
        <Text style={estilos.buttonText}>Nova Pesquisa</Text>
      </TouchableOpacity>
    </View>
  );
};

const estilos = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#372775',
    padding: 20,
  },
  textInput: {
    fontSize: 16,
    borderWidth: 1,
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
    fontFamily: 'AveriaLibre-Regular',
    color: '#3F92C5',
    padding: 3,
    width: '90%',
  },
  container: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    width: '100%',
  },
  icon: {
    marginLeft: 10,
    alignSelf: 'center',
    width: '10%',
    color: '#8B8B8B',
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'AveriaLibre-Regular',
  },
});

export default Pesquisas;
