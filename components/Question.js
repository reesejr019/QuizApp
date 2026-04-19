import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ButtonGroup } from '@rneui/themed';

export default function Question({ route, navigation }) {
  const { data, index, answers } = route.params;
  const question = data[index];
  const isMultiAnswer = question.type === 'multiple-answer';

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedIndexes, setSelectedIndexes] = useState([]);

  const isLast = index === data.length - 1;

  function handleNext() {
    const answer = isMultiAnswer ? selectedIndexes : selectedIndex;
    const newAnswers = [...answers, answer];

    if (isLast) {
      navigation.replace('Summary', { data, answers: newAnswers });
    } else {
      navigation.replace('Question', { data, index: index + 1, answers: newAnswers });
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.counter}>
        Question {index + 1} of {data.length}
      </Text>
      <Text style={styles.prompt}>{question.prompt}</Text>

      <ButtonGroup
        testID="choices"
        buttons={question.choices}
        vertical
        selectedIndex={isMultiAnswer ? null : selectedIndex}
        selectedIndexes={isMultiAnswer ? selectedIndexes : []}
        selectMultiple={isMultiAnswer}
        onPress={isMultiAnswer ? setSelectedIndexes : setSelectedIndex}
        containerStyle={styles.buttonGroup}
        selectedButtonStyle={styles.selectedButton}
        textStyle={styles.buttonText}
      />

      <TouchableOpacity
        testID="next-question"
        style={styles.nextButton}
        onPress={handleNext}
      >
        <Text style={styles.nextButtonText}>
          {isLast ? 'See Results' : 'Next Question'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  counter: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  prompt: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 24,
    lineHeight: 28,
  },
  buttonGroup: {
    marginBottom: 32,
    borderRadius: 8,
  },
  selectedButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
