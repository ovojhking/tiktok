import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Data } from './interFace';

interface AnswerResponse {
  id: number;
  correct_options: CorrectOption[];
}

interface CorrectOption {
  id: string;
  answer: string;
}

export default function Panel({data}: {data: Data}) {  
  const generateOptions = () => {
    const options = data.options;
    const defaultOptionsStatus = options.map((option, index) => 0);
    const [optionsStatus, setOptionsStatus] = useState<number[]>(
      defaultOptionsStatus
    );

    const [correctAnswer, setCorrectAnswer] = useState<AnswerResponse | null>();

    const btnRule = [
      [styles.optionButton],
      [styles.optionButton,styles.optionButtonCorrect],
      [styles.optionButton,styles.optionButtonError],
    ]

    const handleBtnClick = (index: number) => {
      const newOptionsStatus = [
        ...defaultOptionsStatus,
      ];
      newOptionsStatus[index] = data.options[index].id === correctAnswer?.correct_options[0].id ? 1 : 2;
      console.log('optionsStatus: ', optionsStatus);


      
      setOptionsStatus([...newOptionsStatus]);
    }

    const fetchData = async (id: number) => {
      try {
        const response = await fetch('https://cross-platform.rp.devfactory.com/reveal?id='+id);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result: AnswerResponse = await response.json();
        setCorrectAnswer(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    useEffect(() => {
      fetchData(data.id)
    }, []);

    return (
      <View style={[styles.optionWrapper]}>
        {
          options.map((option, index) => (
            <TouchableOpacity key={index} style={[...btnRule[optionsStatus[index]]]} onPress={()=>handleBtnClick(index)}>
             <Text style={[styles.optionText]}>{option.answer}</Text>
            </TouchableOpacity>
          ))
        }        
      </View>
    );
  }

  return (
    <>
      {generateOptions()}
    </>
  );
}

const styles = StyleSheet.create({
  optionWrapper: {
    position: 'absolute',
    bottom: 116,
    left: 16,
    width: '100%',
    height: 'auto',
    zIndex: 1,
  },
  optionButton: {
    padding: 12,
    width: 294,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.50)',
    borderRadius: 8,
    marginVertical: 8,
  },
  optionButtonCorrect: {
    backgroundColor: 'rgba(40, 177, 143, 0.70)',
  },
  optionButtonError: {
    backgroundColor: 'rgba(220, 95, 95, 0.70)',
  },
  optionText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.45)',
    textShadowOffset: { width: 1, height: 1.5 },
    textShadowRadius: 2,
  }
});
