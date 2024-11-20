import { defineStore } from 'pinia';

export const useAuth = defineStore('auth', {
    state: () => ({
        token: null,
    }),
    getters: {
        isAuthenticated: (state) => !!state.token
    },
    actions: {
        login(token) {
            this.token = token
            document.cookie = `jwt=${token}; Path=/`;
        },
        logout() {
            this.token = null;
            document.cookie = `jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC;`; 

        },
        checkAuth() {            
            const cookies = document.cookie.split('; ').find(c => c.startsWith('jwt='));
            this.token = cookies ? cookies.split('=')[1] : null;
        },
    }
})