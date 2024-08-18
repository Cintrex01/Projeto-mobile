import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginProjeto from './src/screens/LoginProjeto';
import NovaContaProjeto from './src/screens/NovaContaProjeto';
import RecuperarSenhaProjeto from './src/screens/RecuperarSenhaProjeto';
import HomeProjeto from './src/screens/HomeProjeto';
import AcoesPesquisaProjeto from './src/screens/AcoesPesquisaProjeto';
import ColetaProjeto from './src/screens/ColetaProjeto';
import ModificarPesquisaProjeto from './src/screens/ModificarPesquisaProjeto';
import RelatorioProjeto from './src/screens/RelatorioProjeto';
import AgradecimentoParticipacaoProjeto from './src/screens/AdradecimentoParticipacaoProjeto';
import NovaPesquisaProjeto from './src/screens/NovaPesquisaProjeto';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="LoginProjeto"
          screenOptions={{
            headerTintColor: '#573FBA',
            headerStyle: {backgroundColor: '#2B1D62'},
            headerShown: true,
            headerTitleStyle: {
              fontFamily: 'AveriaLibre-Regular',
              color: '#FFFFFF',
            },
          }}>
          <Stack.Screen
            name="LoginProjeto"
            component={LoginProjeto}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="NovaContaProjeto"
            component={NovaContaProjeto}
            options={{title: 'Nova Conta'}}
          />
          <Stack.Screen
            name="RecuperarSenhaProjeto"
            component={RecuperarSenhaProjeto}
            options={{title: 'Recuperação de senha'}}
          />
          <Stack.Screen
            name="HomeProjeto"
            component={HomeProjeto}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AcoesPesquisaProjeto"
            component={AcoesPesquisaProjeto}
            options={{title: ''}}
          />
          <Stack.Screen
            name="ColetaProjeto"
            component={ColetaProjeto}
            options={{title: ''}}
          />
          <Stack.Screen
            name="RelatorioProjeto"
            component={RelatorioProjeto}
            options={{title: 'Relatório'}}
          />
          <Stack.Screen
            name="ModificarPesquisaProjeto"
            component={ModificarPesquisaProjeto}
            options={{title: 'Modificar pesquisa'}}
          />
          <Stack.Screen
            name="AgradecimentoParticipacaoProjeto"
            component={AgradecimentoParticipacaoProjeto}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="NovaPesquisaProjeto"
            component={NovaPesquisaProjeto}
            options={{title: 'Nova Pesquisa'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
