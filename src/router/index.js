import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home';
import Register from '@/components/Register.vue';
import Login from '@/components/Login.vue';
import E404 from '@/components/E404.vue';
import QuizEditPage from '@/views/QuizEditPage.vue';
import PersonalQuizzes from '@/views/PersonalQuizzes.vue';
import ResponsePage from '@/views/ResponsePage.vue';
import QuizResponseView from '@/components/QuizResponseView.vue';
import Quiz from '@/views/Quiz.vue';
import store from '@/store';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { requiresAuth: true, layout: 'main' },
      beforeEnter(from, to, next){
        store.dispatch('quizzes/getAll');
        next();
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: { requiresAuth: false, layout: 'auth' }
    },
    {
      path: '/login',
      name: 'Login',
      meta: { requiresAuth: false, layout: 'auth' },
      component: Login
    },
    {
      path: '/quiz/:id',
      name: 'Quiz',
      meta: { requiresAuth: true, layout: 'main' },
      component: Quiz,
      beforeEnter(from, to, next){
        store.dispatch('quiz/getForSelect', from.params.id);
        next();
      }
    },
    {
      path: '/quiz/:id/response',
      name: 'QuizResponse',
      meta: { requiresAuth: true, layout: 'main' },
      component: QuizResponseView,
      beforeEnter(to, from, next){
        let responseData = store.getters['response/response'];
        if (from.name === 'Quiz' && from.params.id === to.params.id && responseData) {
          next();
        }
        else {
          next({ name: 'Quiz', params: { id: to.params.id }});
        }
      }
    },
    {
      path: '/response/:id',
      name: 'Response',
      meta: { requiresAuth: true, layout: 'main' },
      component: ResponsePage,
      beforeEnter(from, to, next) {
        store.dispatch('response/get', from.params.id);
        next();
      }
    },
    {
      path: '/quiz/:id/edit',
      name: 'QuizEditPage',
      meta: { requiresAuth: true, layout: 'quiz-edit' },
      component: QuizEditPage,
      async beforeEnter(from, to, next){
        await store.dispatch('quiz/get', from.params.id);
        let idAuthor= store.getters['quiz/quiz'].user_id;
        let idUser = store.getters['user/user'].id;
        store.dispatch('responses/getAll', from.params.id);
        if (idUser !== idAuthor) {
          next({ name: 'Home'});
        }
        next();
      }
    },
    {
      path: '/personal-quizzes',
      name: 'Quizzes',
      meta: { requiresAuth: true, layout: 'main' },
      component: PersonalQuizzes,
      beforeEnter(from, to, next) {
        store.dispatch('quizzes/getPersonalQuizzes');
        next();
      }
    },
    {
      path: '/:pathMatch(.*)*',
      component: E404
    }
  ]
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('auth_token');
  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/login')
  }

  if (!(to.matched.some(record => record.meta.requiresAuth)) && loggedIn) {
    next('/')
  }
  
  next()
})



export default router
