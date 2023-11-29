import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../pages/loginPage.vue';
import GameLobby from '../pages/gameLobby.vue';

const routes = [
  { path: '/', component: LoginPage },
  { path: '/gameLobby', component: GameLobby },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (to.path !== '/' && !isAuthenticated) {
    alert('請登入後再繼續操作。');
    next('/');
  } else {
    next();
  }
});



export default router;
