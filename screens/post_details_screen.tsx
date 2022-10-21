import {CommonActions, useNavigation} from '@react-navigation/native';
import {FC, useEffect, useState} from 'react';
import {Text, View, ScrollView, TouchableNativeFeedback} from 'react-native';
import auth from '@react-native-firebase/auth';

const PostDetailsScreen: FC = props => {
  const [post, setPost] = useState();
  const {route}: any = props;
  console.log(route.params.postId);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/' + route.params.postId, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        console.log(new Date());

        const temp = result;
        setPost(temp);
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
        {post != null && (
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 16,
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
                <Text style={{fontSize: 16, fontWeight: '600', color: 'black'}}>
                  {post['title']}
                </Text>
                <Text style={{fontSize: 14, color: 'black'}}>
                  {post['body']}
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default PostDetailsScreen;
