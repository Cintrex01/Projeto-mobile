import {View, Text, StyleSheet} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Octicons';
import {useSelector} from 'react-redux';

const DrawerNavigator = props => {
  const email = useSelector(state => state.login.email);

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{flex: 1}}>
      <View>
        <Text style={styles.drawerEmail}>{email}</Text>
      </View>
      <View style={styles.line} />
      <DrawerItem
        icon={() => (
          <Icon
            style={styles.icon}
            name="checklist"
            size={20}
            color={'#ffffff'}
          />
        )}
        labelStyle={{
          color: '#ffffff',
          fontFamily: 'AveriaLibre-Regular',
          fontSize: 16,
        }}
        label="Pesquisas"
        onPress={() => {
          props.navigation.navigate('AcoesPesquisaProjeto');
        }}
      />

      <View style={styles.bottomItem}>
        <DrawerItem
          icon={() => (
            <Icon
              style={styles.icon}
              name="sign-out"
              size={20}
              color="#ffffff"
            />
          )}
          labelStyle={{
            color: '#ffffff',
            fontFamily: 'AveriaLibre-Regular',
            fontSize: 16,
          }}
          label="Sair"
          onPress={() => {
            props.navigation.popToTop();
          }}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerEmail: {
    color: '#ffffff',
    fontFamily: 'AveriaLibre-Regular',
    alignSelf: 'center',
    marginVertical: 20,
  },
  line: {
    borderBottomColor: '#ffffff',
    borderBottomWidth: 1,
    width: '90%',
    alignSelf: 'center',
  },
  bottomItem: {
    marginTop: 'auto',
  },
});

export default DrawerNavigator;
