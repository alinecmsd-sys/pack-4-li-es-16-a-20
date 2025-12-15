import { LessonData, Exercise } from './types';

export const LESSONS: Record<string, LessonData> = {
  '16': {
    id: '16',
    title: 'Lesson 16',
    subtitle: 'Know / Learn',
    vocabulary: [
      { word: 'to fly' },
      { word: 'to sing' },
      { word: 'to cook' },
      { word: 'to dance' },
      { word: 'to play an instrument' },
      { word: 'to paint' },
      { word: 'to draw' },
      { word: 'to fix a computer' },
      { word: 'to ride a bike' },
      { word: 'to read' },
      { word: 'to write' },
    ],
    phrases: [
      { text: 'I know how to cook.' },
      { text: "I don't know how to dance." },
      { text: 'Do you know how to fix a computer?' },
      { text: 'She learns how to paint.' },
      { text: "He doesn't learn how to sing." },
      { text: 'Do they learn how to fly?' },
      { text: 'What do you know how to do?' },
      { text: 'My brother knows how to ride a bike.' },
      { text: "We don't know how to play an instrument." },
    ],
  },
  '17': {
    id: '17',
    title: 'Lesson 17',
    subtitle: 'Travel / Go',
    vocabulary: [
      { word: 'car' },
      { word: 'bike' },
      { word: 'bus' },
      { word: 'plane' },
      { word: 'truck' },
      { word: 'train' },
      { word: 'helicopter' },
      { word: 'subway' },
      { word: 'motorcycle' },
      { word: 'ship' },
      { word: 'boat' },
      { word: 'on foot' },
      { word: 'school' },
      { word: 'library' },
      { word: 'work' },
      { word: 'restaurant' },
      { word: 'abroad' },
    ],
    phrases: [
      { text: 'I am going to travel by plane.' },
      { text: 'She is not going to go by car.' },
      { text: 'Are you going to go to school?' },
      { text: 'We go to work by bus.' },
      { text: 'They go to the library on foot.' },
      { text: 'Where are you going to go?' },
      { text: 'He is going to travel abroad.' },
      { text: 'I am not going to go by truck.' },
      { text: 'Are they going to go by train?' },
    ],
  },
  '18': {
    id: '18',
    title: 'Lesson 18',
    subtitle: 'Try / Begin',
    vocabulary: [
      { word: 'T-shirt' },
      { word: 'coat' },
      { word: 'shoes' },
      { word: 'again' },
      { word: 'your best' },
      { word: 'the show' },
      { word: 'to rain' },
      { word: 'the project' },
      { word: 'my day' },
    ],
    phrases: [
      { text: 'I am going to try on this T-shirt.' },
      { text: 'She is going to try on that coat.' },
      { text: 'It is beginning to rain.' },
      { text: 'The show begins at eight.' },
      { text: 'I try to do my best every day.' },
      { text: 'When does the project begin?' },
      { text: "Don't try to fix it again." },
      { text: 'Are you going to try on these shoes?' },
      { text: 'My day begins very early.' },
    ],
  },
  '19': {
    id: '19',
    title: 'Lesson 19',
    subtitle: 'Modal Should',
    vocabulary: [
      { word: 'to say' },
      { word: 'bad words' },
      { word: 'swear words' },
      { word: 'invite' },
      { word: 'think' },
      { word: 'come' },
      { word: 'hurry' },
      { word: 'give up' },
      { word: 'leave' },
      { word: 'watch out' },
      { word: 'have studied' },
      { word: 'have listened' },
      { word: 'hesitate' },
    ],
    phrases: [
      { text: 'You should say sorry.' },
      { text: "We shouldn't say bad words." },
      { text: 'Should I invite him?' },
      { text: 'He should think before he speaks.' },
      { text: 'You should come early.' },
      { text: "They shouldn't give up." },
      { text: 'What should I do?' },
      { text: 'When should we leave?' },
      { text: 'Where should they go?' },
      { text: 'Why should she hurry?' },
    ],
  },
  '20': {
    id: '20',
    title: 'Lesson 20',
    subtitle: 'Would Like',
    vocabulary: [
      { word: 'to see' },
      { word: 'to order food' },
      { word: 'to understand' },
      { word: 'to live' },
      { word: 'to stay' },
    ],
    phrases: [
      { text: "I'd like to see the menu." },
      { text: "I'd like to order now." },
      { text: "I'd like to say something." },
      { text: "I'd like to understand it." },
      { text: "I'd like to live abroad." },
      { text: "I'd like to stay for dinner." },
      { text: "Would you like to order food?" },
      { text: "She wouldn't like to live here." },
      { text: "We would like to understand the problem." },
    ],
  },
};

// Helper to shuffle array
const shuffle = (array: string[]) => {
  return [...array].sort(() => Math.random() - 0.5);
};

export const EXERCISES: Exercise[] = [
  // --- ORDER EXERCISES ---
  // Lesson 16
  {
    id: 'l16-o1',
    type: 'order',
    question: 'I know how to cook',
    scrambled: shuffle(['know', 'I', 'to', 'how', 'cook']),
  },
  {
    id: 'l16-o2',
    type: 'order',
    question: 'Do you know how to fix a computer',
    scrambled: shuffle(['know', 'you', 'Do', 'to', 'fix', 'how', 'computer', 'a']),
  },
  {
    id: 'l16-o3',
    type: 'order',
    question: "He doesn't learn how to sing",
    scrambled: shuffle(['He', 'how', 'learn', "doesn't", 'to', 'sing']),
  },
  // Lesson 17
  {
    id: 'l17-o1',
    type: 'order',
    question: 'Where are you going to go',
    scrambled: shuffle(['going', 'are', 'Where', 'to', 'you', 'go']),
  },
  {
    id: 'l17-o2',
    type: 'order',
    question: 'I am not going to go by truck',
    scrambled: shuffle(['truck', 'go', 'to', 'am', 'by', 'going', 'not', 'I']),
  },
  {
    id: 'l17-o3',
    type: 'order',
    question: 'She is not going to go by car',
    scrambled: shuffle(['She', 'to', 'not', 'go', 'is', 'going', 'by', 'car']),
  },
  // Lesson 18
  {
    id: 'l18-o1',
    type: 'order',
    question: 'I am going to try on this T-shirt',
    scrambled: shuffle(['try', 'going', 'to', 'am', 'on', 'I', 'T-shirt', 'this']),
  },
  {
    id: 'l18-o2',
    type: 'order',
    question: 'It is beginning to rain',
    scrambled: shuffle(['rain', 'to', 'beginning', 'is', 'It']),
  },
  {
    id: 'l18-o3',
    type: 'order',
    question: 'When does the project begin',
    scrambled: shuffle(['begin', 'project', 'the', 'does', 'When']),
  },
  // Lesson 19
  {
    id: 'l19-o1',
    type: 'order',
    question: 'You should say sorry',
    scrambled: shuffle(['should', 'sorry', 'say', 'You']),
  },
  {
    id: 'l19-o2',
    type: 'order',
    question: 'Where should they go',
    scrambled: shuffle(['should', 'go', 'Where', 'they']),
  },
  {
    id: 'l19-o3',
    type: 'order',
    question: "We shouldn't say bad words",
    scrambled: shuffle(['say', "shouldn't", 'We', 'bad', 'words']),
  },
  // Lesson 20
  {
    id: 'l20-o1',
    type: 'order',
    question: 'I would like to order now',
    scrambled: shuffle(['like', 'would', 'to', 'order', 'I', 'now']),
  },
  {
    id: 'l20-o2',
    type: 'order',
    question: "She wouldn't like to live here",
    scrambled: shuffle(['like', "wouldn't", 'She', 'to', 'live', 'here']),
  },
  {
    id: 'l20-o3',
    type: 'order',
    question: 'Would you like to order food',
    scrambled: shuffle(['like', 'Would', 'you', 'to', 'order', 'food']),
  },

  // --- SPEAKING EXERCISES ---
  // Lesson 16
  {
    id: 'l16-s1',
    type: 'speaking',
    question: "I don't know how to dance",
  },
  {
    id: 'l16-s2',
    type: 'speaking',
    question: 'She learns how to paint',
  },
  {
    id: 'l16-s3',
    type: 'speaking',
    question: 'My brother knows how to ride a bike',
  },
  // Lesson 17
  {
    id: 'l17-s1',
    type: 'speaking',
    question: 'I am going to travel by plane',
  },
  {
    id: 'l17-s2',
    type: 'speaking',
    question: 'They go to the library on foot',
  },
  {
    id: 'l17-s3',
    type: 'speaking',
    question: 'Are you going to go to school',
  },
  // Lesson 18
  {
    id: 'l18-s1',
    type: 'speaking',
    question: 'I try to do my best every day',
  },
  {
    id: 'l18-s2',
    type: 'speaking',
    question: "Don't try to fix it again",
  },
  {
    id: 'l18-s3',
    type: 'speaking',
    question: 'The show begins at eight',
  },
  // Lesson 19
  {
    id: 'l19-s1',
    type: 'speaking',
    question: 'What should I do',
  },
  {
    id: 'l19-s2',
    type: 'speaking',
    question: 'He should think before he speaks',
  },
  {
    id: 'l19-s3',
    type: 'speaking',
    question: 'You should come early',
  },
  // Lesson 20
  {
    id: 'l20-s1',
    type: 'speaking',
    question: "I'd like to see the menu",
  },
  {
    id: 'l20-s2',
    type: 'speaking',
    question: 'We would like to understand the problem',
  },
  {
    id: 'l20-s3',
    type: 'speaking',
    question: "I'd like to stay for dinner",
  },
];
