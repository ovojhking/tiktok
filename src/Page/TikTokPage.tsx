import { StyleSheet, Text, View } from 'react-native';
import Header from '../Component/TikTok/Header';

export default function TikTokPage() {
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.text}>TikTok</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#000',
  },
  text: {
    color: 'yellow',
  }
});
