import { useEffect, useState } from 'react';
import { StyleSheet, ImageBackground, View, useWindowDimensions, Text } from 'react-native';
import Panel from './Panel';
import { Data } from './interFace';

export default function TikTokPage() {
  const [data, setData] = useState<Data | null>(null);
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://cross-platform.rp.devfactory.com/for_you');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result: Data = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if(!data) return null;

  return (
    <View style={[styles.wrapper]}>
      <View style={{width: screenWidth, height: screenHeight, zIndex: 1}}>
        <Panel data={data}/>
      </View>
      <View style={styles.container}> 
          <ImageBackground
            source={{ uri: data.image }}
            style={[styles.imageBackground, { width: screenWidth, height: screenHeight}]}
            resizeMode="cover"
          />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
