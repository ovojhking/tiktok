import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function TikTokPage() {
  const initialTime = 10 * 60;
  const [timeRemaining, setTimeRemaining] = useState<number>(initialTime);
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(prevTime => {
        if (prevTime === 0) {
          clearInterval(intervalId);
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.wrapper, styles.flexStart]}>
        <Image style={styles.clockImage} source={require('../../../assets/clock.png')} />
        <Text style={styles.timerText}>
          {`${minutes < 10 ? '0' : ''}${minutes}m${seconds < 10 ? '0' : ''}${seconds}s`}
        </Text>
      </View>
      <View style={[styles.wrapper, styles.flexCenter, styles.flexDirectionColumn]}>
        <Text style={styles.title}>For You</Text>
        <View style={[styles.bottomLine]} />
      </View>
      <View style={[styles.wrapper, styles.flexEnd]}>
        <Image style={styles.clockImage} source={require('../../../assets/search.png')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 5,
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  flexStart: {
    justifyContent: 'flex-start',
  },
  flexEnd: {
    justifyContent: 'flex-end',
  },
  flexCenter: {
    justifyContent: 'center',
  },
  flexDirectionColumn: {
    flexDirection: 'column',
  },
  clockImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 5,
  },
  timerText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.60)',
    fontFamily: 'SF Pro Rounded',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  title: {
    alignItems: 'stretch',
    color: '#FFF',
    fontFamily: 'SF Pro Rounded',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 22,
    letterSpacing: -0.16,
  },
  bottomLine: {
    marginTop: 5,
    width: 30,
    height: 4,
    backgroundColor: '#FFF',
  },
  searchImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
