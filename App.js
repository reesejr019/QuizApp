import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Question from './components/Question';
import Summary from './components/Summary';

export { Question, Summary };

// Correct answers: Q1→0 (JavaScript), Q2→[0,2] (JavaScript, HTML), Q3→0 (True), Q4→1 (Paris), Q5→[1,3] (C++, Rust)
const QUESTIONS = [
  {
    prompt: 'Which language is React built with?',
    type: 'multiple-choice',
    choices: ['JavaScript', 'Python', 'Java', 'C++'],
    correct: 0,
  },
  {
    prompt: 'Which of these are web technologies?',
    type: 'multiple-answer',
    choices: ['JavaScript', 'Swift', 'HTML', 'Kotlin'],
    correct: [0, 2],
  },
  {
    prompt: 'React Native can be used to build iOS apps.',
    type: 'true-false',
    choices: ['True', 'False'],
    correct: 0,
  },
  {
    prompt: 'What is the capital of France?',
    type: 'multiple-choice',
    choices: ['London', 'Paris', 'Berlin', 'Madrid'],
    correct: 1,
  },
  {
    prompt: 'Which of these are systems programming languages?',
    type: 'multiple-answer',
    choices: ['Python', 'C++', 'JavaScript', 'Rust'],
    correct: [1, 3],
  },
];

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerLeft: () => null,
          gestureEnabled: false,
        }}
      >
        <Stack.Screen
          name="Question"
          component={Question}
          initialParams={{ data: QUESTIONS, index: 0, answers: [] }}
          options={{ title: 'Quiz' }}
        />
        <Stack.Screen
          name="Summary"
          component={Summary}
          options={{ title: 'Results' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
