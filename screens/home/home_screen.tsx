import {CommonActions, useNavigation} from '@react-navigation/native';
import {FC, useEffect, useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableNativeFeedback,
} from 'react-native';

const HomeScreen: FC = props => {
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
    <ScrollView
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
    </ScrollView>
  );
};

export default HomeScreen;
