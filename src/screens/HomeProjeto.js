import {createDrawerNavigator} from '@react-navigation/drawer';
import Pesquisas from './Pesquisas';
import DrawerNavigator from './DrawerNavigator';

const Drawer = createDrawerNavigator();

const HomeProjeto = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerLabelStyle: {fontFamily: 'AveriaLibre-Regular', color: '#ffffff'},
        drawerStyle: {backgroundColor: '#372775'},
        headerTintColor: '#ffffff',
        headerStyle: {backgroundColor: '#2B1D62'},
        headerTitleStyle: {fontFamily: 'AveriaLibre-Regular'},
      }}
      drawerContent={props => <DrawerNavigator {...props} />}>
      {/* Define uma tela no drawer navigator */}
      <Drawer.Screen
        name="Pesquisas"
        component={Pesquisas}
        options={{title: ''}}
      />
    </Drawer.Navigator>
  );
};

export default HomeProjeto;
