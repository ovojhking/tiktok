import { StyleSheet, View, Text, Image } from 'react-native';
import Header from './Header';
import { Data } from './interFace';

export default function Panel({data}: {data: Data}) {  
  function splitTextByLength(text: string, maxLength: number): string[] {
    const words: string[] = text.split(' ');
    const result: string[] = [];
    let currentLine: string = '';
  
    for (let i = 0; i < words.length; i++) {
      const word: string = words[i];
      const testLine: string = currentLine ? `${currentLine} ${word}` : word;
  
      if (testLine.length <= maxLength) {
        currentLine = testLine;
      } else {
        if (currentLine.length > 0) {
          result.push(currentLine);
          currentLine = word;
        } else {
          const slicedWords: string[] = sliceWordByLength(word, maxLength);
          result.push(...slicedWords);
          currentLine = '';
        }
      }
    }
  
    if (currentLine.length > 0) {
      result.push(currentLine);
    }
  
    return result;
  }
  
  function sliceWordByLength(word: string, maxLength: number): string[] {
    const result: string[] = [];
    let currentSlice: string = '';
  
    for (let i = 0; i < word.length; i++) {
      const char: string = word[i];
      const testSlice: string = currentSlice + char;
  
      if (testSlice.length <= maxLength) {
        currentSlice = testSlice;
      } else {
        result.push(currentSlice);
        currentSlice = char;
      }
    }
  
    if (currentSlice.length > 0) {
      result.push(currentSlice);
    }
  
    return result;
  }

  const textLines: string[] = splitTextByLength(data.question, 21);

  const generateIcon = () => {
    const icons = [
      {value: 10, src: require('../../../assets/like.png')},
      {value: 300, src: require('../../../assets/bookmark.png')},
      {value: 53, src: require('../../../assets/comments.png')},
      {value: 777, src: require('../../../assets/share.png')},
    ]
    
    return (
      <>
        {
          icons.map((icon, index) => (
            <View key={index} style={[styles.iconContent]}>
              <Image source={icon.src} style={{width: 30, height: 30}} />
              <Text style={{color: '#fff', fontSize: 12, fontWeight: '500'}}>{icon.value}</Text>
            </View>
          ))
        }
      </>
    );
  };

  return (
    <>
      <View style={styles.header}>
        <Header />
      </View>
      
      <View style={[styles.questionWrapper]}>
        {textLines.map((line, index) => (
          <Text key={index} style={[
            styles.question,
            index === 0 && styles.firstLine,
            index === textLines.length - 1 && styles.lastLine,
          ]}>
            {line}
          </Text>
        ))}
      </View>

      <View style={[styles.sideBar]}>
        <View style={[styles.avatarWrapper]}>
          <Image
            source={{ uri: data.user.avatar }}
            style={[styles.avatar]}
          />
          <View style={[styles.avatarIcon]}>
            <Text style={{color: 'white', fontSize: 12, fontWeight: '700'}}>+</Text>
          </View>
        </View>
        {generateIcon()}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  questionWrapper: {
    position: 'absolute',
    top: 190,
    left: 16,
    zIndex: 1,
    display: 'flex',
    alignItems: 'flex-start',
  },
  question: {
    color: '#fff',
    fontFamily: 'SF Pro Rounded',
    fontSize: 22,
    fontStyle: 'normal',
    fontWeight: '500',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'flex-start',
    padding: 6,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  firstLine: {
    borderTopLeftRadius: 8,
  },
  lastLine: {
    borderBottomLeftRadius: 8,
  },
  sideBar: {
    position: 'absolute',
    bottom: 52,
    right: 8,
    width: 50,
    zIndex: 1,
  },
  avatarWrapper: {
    position: 'relative',
    alignItems: 'center',
  },
  avatar: {
    position: 'relative',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 100,
    width: 45,
    height: 45
  },
  avatarIcon: {
    position: 'absolute',
    bottom: -5.5,
    left: '50%',
    width: 15,
    height: 15,
    borderRadius: 100,
    backgroundColor: '#28B18F',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateX: -7.5 }],
  },
  iconContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
    paddingTop: 20,
  }
});
