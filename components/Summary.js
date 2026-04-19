import { View, Text, ScrollView, StyleSheet } from 'react-native';

function isCorrectAnswer(userAnswer, correct) {
  if (Array.isArray(correct)) {
    const sorted = (arr) => [...arr].sort((a, b) => a - b);
    return JSON.stringify(sorted(userAnswer)) === JSON.stringify(sorted(correct));
  }
  return userAnswer === correct;
}

function wasChosen(userAnswer, choiceIndex) {
  if (Array.isArray(userAnswer)) return userAnswer.includes(choiceIndex);
  return userAnswer === choiceIndex;
}

function isCorrectChoice(correct, choiceIndex) {
  if (Array.isArray(correct)) return correct.includes(choiceIndex);
  return correct === choiceIndex;
}

export default function Summary({ route }) {
  const { data, answers } = route.params;

  const score = data.reduce((total, question, i) => {
    return total + (isCorrectAnswer(answers[i], question.correct) ? 1 : 0);
  }, 0);

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
      <Text testID="total" style={styles.score}>
        Score: {score} / {data.length}
      </Text>

      {data.map((question, qi) => {
        const userAnswer = answers[qi];
        const questionCorrect = isCorrectAnswer(userAnswer, question.correct);

        return (
          <View key={qi} style={styles.questionBlock}>
            <Text style={styles.questionNumber}>Question {qi + 1}</Text>
            <Text style={styles.prompt}>{question.prompt}</Text>
            <Text style={[styles.result, questionCorrect ? styles.correct : styles.incorrect]}>
              {questionCorrect ? 'Correct' : 'Incorrect'}
            </Text>

            {question.choices.map((choice, ci) => {
              const chosen = wasChosen(userAnswer, ci);
              const rightAnswer = isCorrectChoice(question.correct, ci);

              let textStyle = styles.choiceText;
              if (chosen && rightAnswer) textStyle = [styles.choiceText, styles.bold];
              else if (chosen && !rightAnswer) textStyle = [styles.choiceText, styles.strikethrough];
              else if (!chosen && rightAnswer) textStyle = [styles.choiceText, styles.italic];

              return (
                <Text key={ci} style={textStyle}>
                  {chosen ? '● ' : '○ '}{choice}
                </Text>
              );
            })}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  score: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#333',
  },
  questionBlock: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  questionNumber: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  prompt: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  result: {
    fontSize: 13,
    marginBottom: 8,
    fontWeight: '600',
  },
  correct: {
    color: '#4CAF50',
  },
  incorrect: {
    color: '#f44336',
  },
  choiceText: {
    fontSize: 15,
    marginVertical: 2,
    color: '#555',
  },
  bold: {
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  strikethrough: {
    textDecorationLine: 'line-through',
    color: '#f44336',
  },
  italic: {
    fontStyle: 'italic',
    color: '#888',
  },
});
