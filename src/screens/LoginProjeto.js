import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth_mod} from '../firebase/config';
import {useDispatch} from 'react-redux';
import {reducerSetLogin} from '../redux/loginSlice';

const LoginProjeto = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');

  const dispatch = useDispatch();

  const valida = () => {
    if (!email.includes('@')) {
      setErro('Email e/ou senha inválidos');
    } else if (email.length === 0) {
      setErro('Email e/ou senha inválidos');
    } else if (!email.includes('.')) {
      setErro('Email e/ou senha inválidos');
    } else if (password.length === 0) {
      setErro('Email e/ou senha inválidos');
    } else {
      setErro('');
      autenticar();
    }
  };

  const autenticar = () => {
    signInWithEmailAndPassword(auth_mod, email, password)
      .then(userLogged => {
        dispatch(reducerSetLogin({email: email, password: password}));
        goToHome();
        console.log(
          'Usuário autenticado com sucesso: ' + JSON.stringify(userLogged),
        );
      })
      .catch(error => {
        setErro('Email e/ou senha inválidos');
        console.log('Falha ao autenticar o usuário: ' + JSON.stringify(error));
      });
  };

  const goToNovaConta = () => {
    props.navigation.navigate('NovaContaProjeto');
  };

  const goToRecuperarSenha = () => {
    props.navigation.navigate('RecuperarSenhaProjeto');
  };

  const goToHome = () => {
    props.navigation.navigate('HomeProjeto');
  };

  return (
    <View style={estilos.view}>
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          justifyContent: 'center',
        }}>
        <Text style={estilos.titulo}>Satisfying.you</Text>
        <Icon name="sentiment-satisfied-alt" size={45} color="#FFFFFF" />
      </View>
      <View>
        <Text style={estilos.texto}>E-mail</Text>
        <TextInput
          style={estilos.textInput}
          value={email}
          onChangeText={setEmail}
        />
        <Text style={estilos.texto}>Senha</Text>
        <TextInput
          style={estilos.textInput}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Text style={{color: '#FD7979', fontFamily: 'AveriaLibre-Regular'}}>
          {erro}
        </Text>
        <TouchableOpacity
          style={{backgroundColor: '#37BD6D', marginVertical: 10}}
          onPress={valida}>
          <Text style={estilos.textoBotao}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{backgroundColor: '#419ED7', marginVertical: 10}}
          onPress={goToNovaConta}>
          <Text style={estilos.textoBotao}>Criar minha conta</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{backgroundColor: '#B0CCDE', marginVertical: 10}}
          onPress={goToRecuperarSenha}>
          <Text style={estilos.textoBotao}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const estilos = StyleSheet.create({
  textoBotao: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'AveriaLibre-Regular',
  },
  titulo: {
    fontSize: 36,
    color: '#FFFFFF',
    width: 250,
    height: 50,
    fontFamily: 'AveriaLibre-Regular',
    textAlign: 'center',
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
    fontFamily: 'AveriaLibre-Regular',
  },
  textInput: {
    paddingHorizontal: 10,
    marginTop: 10,
    color: '#3F92C5',
    fontSize: 28,
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    fontFamily: 'AveriaLibre-Regular',
  },
});

export default LoginProjeto;
