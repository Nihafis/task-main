<template>
  <q-layout view="hHh lpR fFf">
    <!-- Header -->
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" alt="Logo" />
          </q-avatar>
          TASK MANAGEMENT
        </q-toolbar-title>
        <q-tabs align="left">
          <q-route-tab to="/" label="Tasks" />
          <q-route-tab v-if="!authStore.isAuthenticated" to="/login" label="login" />
        </q-tabs>
        <!-- Drawer Toggle Button -->
        <q-btn dense flat round icon="menu" aria-label="Toggle Drawer" @click="rightDrawerOpen = !rightDrawerOpen" />
      </q-toolbar>
    </q-header>

    <!-- Right Drawer -->
    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <div class="q-pa-md">
        <q-list>
          <q-item v-if="authStore.isAuthenticated" clickable v-ripple>
            <q-item-section>
              <q-btn flat icon="logout" label="LOGOUT" @click="handleLogout">

              </q-btn>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section class="flex">
              <q-btn icon="arrow_back" label="BACK" flat @click="rightDrawerOpen = !rightDrawerOpen"
                aria-label="Toggle Drawer">
              </q-btn>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-drawer>

    <!-- Main Content -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Footer -->
    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
       
          <div class="text-center">TASK MANAGEMENT COPY RIGHT 2024</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import  axios from './axios.js'
import { useAuth } from '@/stores/auth';

 

export default {
  setup() {
    const authStore = useAuth();
    authStore.checkAuth();
    const router = useRouter()
    const rightDrawerOpen = ref(false)

    const toggleRightDrawer = () => {
      rightDrawerOpen.value = !rightDrawerOpen.value
    }
    const handleLogout = async () => {
      const res = await axios.post("http://localhost:3000/api/logout")
      router.push('/login')
    }
    



    return {
      rightDrawerOpen,
      toggleRightDrawer,
      handleLogout,
      authStore

    }
  }
}
</script>
