import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {useState} from 'react';
import {sendPasswordResetEmail} from 'firebase/auth';
import {auth_mod} from '../firebase/config';

const RecuperarSenhaProjeto = props => {
  const [email, setEmail] = useState('');
  const [erro, setErro] = useState('');

  const valida = () => {
    if (!email.includes('@')) {
      setErro('Email e/ou senha inválidos');
    } else if (email.length === 0) {
      setErro('Email e/ou senha inválidos');
    } else if (!email.includes('.')) {
      setErro('Email e/ou senha inválidos');
    } else {
      setErro('');
      recoverPassword();
      voltar();
    }
  };

  const voltar = () => {
    props.navigation.goBack();
  };

  const recoverPassword = () => {
    sendPasswordResetEmail(auth_mod, email)
      .then(() => {
        console.log(
          'Email de redefinição enviado com sucesso. Verifique sua caixa de entrada',
        );
      })
      .catch(error => {
        console.log(
          'Falha ao enviar e-mail de redefinição: ' + JSON.stringify(error),
        );
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
      <Text style={{color: '#FD7979'}}>{erro}</Text>
      <TouchableOpacity
        style={{backgroundColor: '#37BD6D', marginVertical: 10}}
        onPress={valida}>
        <Text style={estilos.textoBotao}>Recuperar</Text>
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

export default RecuperarSenhaProjeto;
