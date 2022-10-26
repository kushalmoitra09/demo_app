import {CommonActions, useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableNativeFeedback,
  StyleSheet,
} from 'react-native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const user = auth().currentUser;
  return (
    <ScrollView
      contentContainerStyle={
        {
          // flex: 1,
          // flexGrow: 1,
          // justifyContent: 'space-between',
          // flexDirection: 'column',
        }
      }
      style={{
        backgroundColor: 'white',
        // padding: 16,
        // justifyContent: 'center',
      }}>
      <View style={styles.card}>
        <View style={{padding: 16, flexDirection: 'row'}}>
          <View
            style={{
              width: 48,
              height: 48,
              backgroundColor: 'gray',
              borderRadius: 24,
            }}
          />
          <Text
            style={{
              marginLeft: 16,
              alignSelf: 'center',
              color: '#0D47A1',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            {user?.email}
          </Text>
        </View>

        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('#90CAF9', false)}
          onPress={() => {
            auth().signOut();
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [
                  {
                    name: 'LoginScreen',
                  },
                ],
              }),
            );
          }}>
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 12,
              backgroundColor: '#E3F2FD',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                fontWeight: 'bold',
                color: 'darkblue',
              }}>
              LOGOUT
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  card: {
    margin: 16,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: 'white',
    // padding: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0D47A1',
  },
  input: {
    marginTop: 16,
    borderColor: '#B0BEC5',
    borderRadius: 4,
    borderWidth: 2,
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: '#0D47A1',
  },
  button: {},
});
export default ProfileScreen;
