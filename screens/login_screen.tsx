import {CommonActions, useNavigation} from '@react-navigation/native';
import {FC, useRef, useState} from 'react';
import {
  Text,
  TextInput,
  View,
  Dimensions,
  ScrollView,
  TouchableNativeFeedback,
  StyleSheet,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Dialog from 'react-native-dialog';
import auth from '@react-native-firebase/auth';
import validateEmail from '../helpers/emailValidator';
import passwordValidator from '../helpers/passwordValidator';

const LoginScreen: FC = props => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  let passwordRef: any;
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [loadingDialog, setLoadingDialog] = useState(false);
  //Error Dialog
  const [errorDialog, setErrorDialog] = useState(false);
  const [errorTitle, setErrorTitle] = useState('');
  const [errorDescription, setErrorDescription] = useState('');

  const login = () => {
    let ev = validateEmail(email);
    if (!ev) {
      setEmailError('Invalid Email');
    }
    let pv = passwordValidator(password);
    if (!pv) {
      setPasswordError('Invalid Password');
    }
    if (!ev || !pv) {
      return;
    }
    setLoadingDialog(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        setLoadingDialog(false);
        console.log(user);
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              {
                name: 'HomeScreen',
              },
            ],
          }),
        );
      })
      .catch(e => {
        console.log(e.code);

        setLoadingDialog(false);
        setErrorDialog(true);
        setErrorTitle('Failed To Register');

        switch (e.code) {
          case 'auth/wrong-password':
            setErrorDescription('Wrong User Password');
            break;
          case 'auth/user-not-found':
            setErrorDescription('User Not Found');
            break;
        }
      });
  };
  return (
    <>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
          flexDirection: 'column',
        }}
        style={{
          backgroundColor: '#ECEFF1',
          // padding: 16,
          // justifyContent: 'center',
        }}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View style={styles.card}>
            {/* <Text>Hello {size.width}</Text> */}
            <View style={{padding: 16}}>
              <Text style={styles.headingText}>Login</Text>
              <Text
                style={{
                  marginTop: 16,
                  color: '#0D47A1',
                }}>
                Email
              </Text>
              <TextInput
                style={[styles.input, {marginTop: 4}]}
                placeholderTextColor="#B0BEC5"
                keyboardType="email-address"
                placeholder="ashokkumar@email.com"
                onChangeText={value => {
                  setEmail(value);
                  setEmailError('');
                }}
                onSubmitEditing={() => {
                  passwordRef.focus();
                }}
                returnKeyType="next"
              />
              {emailError && (
                <Text
                  style={{
                    marginTop: 4,
                    color: '#F44336',
                    fontSize: 12,
                  }}>
                  {emailError}
                </Text>
              )}
              <Text
                style={{
                  marginTop: 12,
                  color: '#0D47A1',
                }}>
                Password
              </Text>
              <TextInput
                ref={ref => (passwordRef = ref)}
                style={[styles.input, {marginTop: 4}]}
                placeholderTextColor="#B0BEC5"
                secureTextEntry={true}
                placeholder="@5H0k+Kumar"
                onChangeText={value => {
                  setPassword(value);
                  setPasswordError('');
                }}
                returnKeyType="next"
              />
              {passwordError && (
                <Text
                  style={{
                    marginTop: 4,
                    color: '#F44336',
                    fontSize: 12,
                  }}>
                  {passwordError}
                </Text>
              )}
              <TouchableOpacity
                onPress={() => {
                  // navigation.navigate('RegisterScreen')
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 1,
                      routes: [
                        {
                          name: 'RegisterScreen',
                        },
                      ],
                    }),
                  );
                }}
                style={{marginTop: 16}}>
                <Text style={{textAlign: 'right', color: '#B0BEC5'}}>
                  Do Not have An Account?
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#90CAF9', false)}
              onPress={login}>
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
                  LOGIN
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </ScrollView>
      <Dialog.Container
        visible={loadingDialog}
        contentStyle={{padding: 8, borderRadius: 8}}>
        <Dialog.Title>Loading</Dialog.Title>
      </Dialog.Container>
      <Dialog.Container
        visible={errorDialog}
        onRequestClose={() => setErrorDialog(false)}
        onBackdropPress={() => setErrorDialog(false)}
        contentStyle={{
          padding: 4,
          borderRadius: 8,
          backgroundColor: '#FFEBEE',
        }}>
        <Dialog.Title style={{color: '#D32F2F'}}>{errorTitle}</Dialog.Title>
        <Dialog.Description style={{color: '#D32F2F'}}>
          {errorDescription}
        </Dialog.Description>
      </Dialog.Container>
    </>
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

export default LoginScreen;
