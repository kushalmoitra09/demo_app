import {CommonActions, useNavigation} from '@react-navigation/native';
import {FC, useEffect, useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableNativeFeedback,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const LandingScreen: FC = props => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts', {method: 'GET'})
      .then(response => response.json())
      .then(result => {
        console.log(result);
        console.log(new Date());

        const temp = result;
        setPosts(temp);
      })
      .catch(error => console.log('error', error));
  }, []);

  return (
    <>
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
        {posts.map(post => {
          return (
            <TouchableNativeFeedback
              key={post['id']}
              background={TouchableNativeFeedback.Ripple('#90CAF9', false)}
              onPress={() => {
                navigation.dispatch(
                  CommonActions.navigate({
                    name: 'PostDetailsScreen',
                    params: {
                      postId: post['id'],
                    },
                  }),
                );
              }}>
              <View
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 16,
                  borderBottomColor: 'lightgrey',
                  borderBottomWidth: 1,
                }}
                key={post['id']}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      width: 48,
                      height: 48,
                      backgroundColor: 'gray',
                      borderRadius: 24,
                    }}></View>

                  <View style={{flex: 1, marginLeft: 16}}>
                    <Text
                      style={{fontSize: 16, fontWeight: '600', color: 'black'}}>
                      {post['title']}
                    </Text>
                    <Text style={{fontSize: 14, color: 'black'}}>
                      {post['body']}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableNativeFeedback>
          );
        })}

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
          <View style={{padding: 16, backgroundColor: '#E3F2FD'}}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#0D47A1',
                textAlign: 'center',
              }}>
              Logout
            </Text>
          </View>
        </TouchableNativeFeedback>
      </ScrollView>
    </>
  );
};

export default LandingScreen;
