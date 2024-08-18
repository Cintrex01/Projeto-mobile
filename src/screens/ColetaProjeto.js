import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {db} from '../firebase/config';
import {updateDoc, doc, getDoc} from 'firebase/firestore';

const ColetaProjeto = props => {
  const id = useSelector(state => state.pesquisa.id);
  const pesquisaRef = doc(db, 'pesquisas', id);

  const updateVote = async voteType => {
    try {
      const docPesquisa = await getDoc(pesquisaRef);

      if (docPesquisa.exists()) {
        const votosAtuais = docPesquisa.data().votos;
        votosAtuais[voteType] += 1;

        await updateDoc(pesquisaRef, {votos: votosAtuais});

        console.log(`Voto ${voteType} computado com sucesso!`);
        goToAgradecimentoParticipacaoProjeto();
      } else {
        console.log('Documento não encontrado!');
      }
    } catch (error) {
      console.log('Erro ao computar o voto:', error);
    }
  };

  const goToAgradecimentoParticipacaoProjeto = () => {
    props.navigation.navigate('AgradecimentoParticipacaoProjeto');
  };

  return (
    <View style={estilos.view}>
      <Text style={estilos.texto}>O que você achou?</Text>
      <View style={estilos.icones}>
        <TouchableOpacity onPress={() => updateVote('pessimo')}>
          <View style={estilos.elemento}>
            <Icon name="emoticon-dead-outline" size={45} color="#D71616" />
            <Text style={estilos.texto}>Péssimo</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => updateVote('ruim')}>
          <View style={estilos.elemento}>
            <Icon name="emoticon-sad-outline" size={45} color="#FF360A" />
            <Text style={estilos.texto}>Ruim</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => updateVote('neutro')}>
          <View style={estilos.elemento}>
            <Icon name="emoticon-neutral-outline" size={45} color="#FFC632" />
            <Text style={estilos.texto}>Neutro</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => updateVote('bom')}>
          <View style={estilos.elemento}>
            <Icon name="emoticon-happy-outline" size={45} color="#37BD6D" />
            <Text style={estilos.texto}>Bom</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => updateVote('excelente')}>
          <View style={estilos.elemento}>
            <Icon name="emoticon-excited-outline" size={45} color="#25BC22" />
            <Text style={estilos.texto}>Excelente</Text>
          </View>
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
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'AveriaLibre-Regular',
  },
  icones: {
    marginTop: 20,
    flexDirection: 'row',
    color: '#FFFFFF',
    alignContent: 'center',
  },
  elemento: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
});

export default ColetaProjeto;
