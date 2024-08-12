import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {useState} from 'react';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth_mod} from '../firebase/config';

const NovaContaProjeto = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [erro, setErro] = useState('');

  const valida = () => {
    if (!email.includes('@')) {
      setErro('Email e/ou senha inválidos');
    } else if (email.length === 0) {
      setErro('Email e/ou senha inválidos');
    } else if (!email.includes('.')) {
      setErro('Email e/ou senha inválidos');
    } else if (password.length === 0) {
      setErro('Email e/ou senha inválidos');
    } else if (password !== password2) {
      setErro('O campo repetir senha difere da senha');
    } else {
      setErro('');
      cadastrarUsuario();
      voltar();
    }
  };

  const voltar = () => {
    props.navigation.goBack();
  };

  const cadastrarUsuario = () => {
    createUserWithEmailAndPassword(auth_mod, email, password)
      .then(userCredential => {
        console.log(
          'Usuário criado com sucesso: ' + JSON.stringify(userCredential),
        );
      })
      .catch(error => {
        console.log('Erro ao criar usuário: ' + JSON.stringify(error));
      });
  };

  return (
    <View style={estilos.view}>
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
      <Text style={estilos.texto}>Repetir senha</Text>
      <TextInput
        style={estilos.textInput}
        value={password2}
        onChangeText={setPassword2}
        secureTextEntry
      />
      <Text style={{color: '#FD7979', fontFamily: 'AveriaLibre-Regular'}}>
        {erro}
      </Text>

      <TouchableOpacity
        style={{backgroundColor: '#37BD6D', marginVertical: 10}}
        onPress={valida}>
        <Text style={estilos.textoBotao}>Cadastrar</Text>
      </TouchableOpacity>
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

export default NovaContaProjeto;
