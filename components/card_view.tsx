import {FC} from 'react';
import {
  Text,
  TextInput,
  View,
  Dimensions,
  ScrollView,
  StyleSheet,
} from 'react-native';

const CardView: FC = (props: any) => {
  return <View style={{...styles.card, ...props.style}}>{props.children}</View>;
};

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
});

export default CardView;
