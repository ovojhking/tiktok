import { StyleSheet, Text, View } from 'react-native';
import Content from '../Component/TikTok/Content';

export default function TikTokPage() {
  return (
    <View style={styles.container}>
      <Content />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#000',
  },
});
