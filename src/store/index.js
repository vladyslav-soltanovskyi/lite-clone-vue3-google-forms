import { createStore } from 'vuex'

import questions from './modules/questions';
import user from './modules/user';
import quiz from './modules/quiz';
import quizzes from './modules//quizzes';
import responses from './modules/responses';
import response from './modules/response';
import currentBlock from './modules/currentBlock';

export default createStore({
	modules: {
		questions, user, quiz, quizzes, currentBlock, responses, response
	},
	strict: process.env.NODE_ENV !== 'production'
})
