import { defineStore } from "pinia";

interface Question {
  id: number;
  body: string;
  options: String[];
  answerKey: number;
  answer: false;
}

interface State {
  currentQuestion: number;
  questions: Question[];
}

export const useQuiz = defineStore("quiz", {
  state: (): State => ({
    currentQuestion: 0,
    questions: [],
  }),
});
