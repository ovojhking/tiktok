import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TikTokPage from './src/Page/TikTokPage';

export default function App() {
  return (
    <View style={styles.container}>
      <TikTokPage />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#000',
  },
});
