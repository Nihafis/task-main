import { createRouter, createWebHistory } from 'vue-router';
import Management from '@/views/Management.vue';
import Login from '@/views/Login.vue';
import { Notify } from 'quasar'
import { useAuth } from '@/stores/auth';


const routes = [
  { path: '/', name: 'Management', component: Management,  },
  { path: '/login', name: 'Login', component: Login, },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuth();
  await authStore.checkAuth();

  const isAuthenticated = authStore.isAuthenticated; 

  if (!isAuthenticated && to.path !== '/login') {
    Notify.create({
      color: 'negative',
      message: `PLEASE LOGIN !!`,
      icon: 'warning',
      position: 'top',
    });
    return next({ path: '/login', query: { redirect: to.fullPath } });
  }

  if (isAuthenticated && to.path === '/login') {
    Notify.create({
      color: 'negative',
      message: `YOU HAVE ALREADY LOGGED IN`,
      icon: 'warning',
      position: 'top',
    });
    return next({ path: '/' });
    
  }
  next();
});


export default router;
