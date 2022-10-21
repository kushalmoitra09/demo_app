import {CommonActions, useNavigation} from '@react-navigation/native';
import {FC, useState} from 'react';
import {
  Text,
  TextInput,
  View,
  Dimensions,
  ScrollView,
  TouchableNativeFeedback,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import Dialog from 'react-native-dialog';
import validateEmail from '../helpers/emailValidator';
import passwordValidator from '../helpers/passwordValidator';

const RegisterScreen: FC = props => {
  const navigation = useNavigation();
  //Loading Dialog
  const [loadingDialog, setLoadingDialog] = useState(false);
  //Error Dialog
  const [errorDialog, setErrorDialog] = useState(false);
  const [errorTitle, setErrorTitle] = useState('');
  const [errorDescription, setErrorDescription] = useState('');

  const size = Dimensions.get('window');
  const user = auth().currentUser;

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const register = () => {
    let ev = validateEmail(email);
    if (!ev) {
      setEmailError('Invalid Email');
    }
    let pv = passwordValidator(password);
    if (!pv) {
      setPasswordError('Invalid Password');
    }
    let cpv = passwordValidator(confirmPassword);
    let spv = true;
    if (!cpv) {
      setConfirmPasswordError('Invalid Confirm Password');
    } else {
      if (confirmPassword != password) {
        setConfirmPasswordError('Password Does Not Match');
        spv = false;
      }
    }
    if (!ev || !pv || !spv || !cpv) {
      return;
    }

    setLoadingDialog(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        console.log(user);
        setLoadingDialog(false);
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
      })
      .catch(e => {
        console.log(e.message);

        setLoadingDialog(false);
        setErrorDialog(true);
        setErrorTitle('Failed To Register');
        switch (e.code) {
          case 'auth/weak-password':
            setErrorDescription(
              'Weak Password. Password should be at least 6 characters',
            );
            break;
          case 'auth/email-already-in-use':
            setErrorDescription(
              'The Email Address Is Already In Use By Another Account',
            );
            break;
        }
      });
    console.log('Hello' + user);
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
              <Text style={styles.headingText}>Register</Text>
              <Text
                style={{
                  marginTop: 12,
                  color: '#0D47A1',
                }}>
                First Name
              </Text>
              <TextInput
                style={[styles.input, {marginTop: 4}]}
                placeholder="Ashok"
                returnKeyType="next"
              />
              <Text
                style={{
                  marginTop: 12,
                  color: '#0D47A1',
                }}>
                Last Name
              </Text>
              <TextInput
                style={[styles.input, {marginTop: 4}]}
                placeholder="Kumar"
                returnKeyType="next"
              />
              <Text
                style={{
                  marginTop: 12,
                  color: '#0D47A1',
                }}>
                Email
              </Text>
              <TextInput
                style={[styles.input, {marginTop: 4}]}
                keyboardType="email-address"
                placeholder="ashokkumar@email.com"
                onChangeText={value => {
                  setEmail(value);
                  setEmailError('');
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
                style={[styles.input, {marginTop: 4}]}
                secureTextEntry={true}
                // keyboardType='visible-password'
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
              <Text
                style={{
                  marginTop: 12,
                  color: '#0D47A1',
                }}>
                Confirm Password
              </Text>
              <TextInput
                style={[styles.input, {marginTop: 4}]}
                secureTextEntry={true}
                // keyboardType='visible-password'
                placeholder="@5H0k+Kumar"
                onChangeText={value => {
                  setConfirmPassword(value);
                  setConfirmPasswordError('');
                }}
                returnKeyType="next"
              />
              {confirmPasswordError && (
                <Text
                  style={{
                    marginTop: 4,
                    color: '#F44336',
                    fontSize: 12,
                  }}>
                  {confirmPasswordError}
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
                          name: 'LoginScreen',
                          params: {
                            user: 'jane',
                          },
                        },
                      ],
                    }),
                  );
                }}
                style={{marginTop: 16}}>
                <Text style={{textAlign: 'right', color: '#B0BEC5'}}>
                  Already Have An Account?
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#90CAF9', false)}
              onPress={register}>
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
                  Register
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
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
      </ScrollView>
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

export default RegisterScreen;
