import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeProjeto from './HomeProjeto';
import LoginProjeto from './LoginProjeto';

const DrawerNavigator = createDrawerNavigator();

const Drawer = () => {
  return (
    <DrawerNavigator.Navigator
      screenOptions={{
        drawerActiveTintColor: '#FFFFFF',
        drawerLabelStyle: {color: '#FFFFFF', backgroundColor: '#372775'},
        drawerContentStyle: {backgroundColor: '#372775'},
        headerShown: true,
        headerTintColor: '#FFFFFF',
        headerTitle: '',
        headerStyle: {
          backgroundColor: '#2B1D62',
        },
      }}>
      <DrawerNavigator.Screen
        name="HomeProjeto"
        component={HomeProjeto}
        options={{title: 'Pesquisas'}}
      />

      <DrawerNavigator.Screen
        name="LoginProjeto"
        component={LoginProjeto}
        options={{title: 'Sair', headerShown: false}}
      />
    </DrawerNavigator.Navigator>
  );
};

export default Drawer;
