<template>
    <q-page class="row justify-center">
        <div class="self-center col-lg-4 col-xs-10">
            <q-card class="my-card" filled bordered>
                <q-card-section>
                    <div class="text-h6 text-center" style="font-weight: bold;">WELCOME TO TASK <br> MANAGEMENT SYSTEM !
                    </div>
                </q-card-section>

                <q-tabs v-model="tab" class="text-teal">
                    <q-tab label="LOGIN" name="one" />
                    <q-tab label="REGISTER" name="two" />
                </q-tabs>
                <q-separator />
                <q-tab-panels v-model="tab" animated>
                    <q-tab-panel name="one" class="q-px-lg">
                        <q-input label="USERNAME" dense v-model="usernameLogin" class="q-mt-md" />
                        <q-input label="PASSWORD" type="password" dense v-model="passwordLogin" class="q-mt-md" />
                        <q-btn flat label="LOGIN" color="white bg-primary" class="q-mt-md full-width"
                            style="font-weight: bold;" @click="handleLogin" />
                        <div>
                            <button @click="googleLogin" class="q-mt-md q-mx-auto" style="display: block; background-color: white; border: 1px solid #ccc; border-radius: 5px; padding: 10px; cursor: pointer;">
                                <img src="src/assets/google.svg" alt="Google" style="width: 32px; height: 32px;" />

                            </button>
                        </div>


                    </q-tab-panel>
                    <q-tab-panel name="two" class="q-px-lg">
                        <q-input label="USERNAME" dense v-model="usernameRegister" class="q-mt-md" />
                        <q-input label="PASSWORD" type="password" dense v-model="passwordRegister" class="q-mt-md" />
                        <q-input label="CONFIRM-PASSWORD" type="password" dense v-model="confirmPasswordRegister"
                            class="q-mt-md" />
                        <q-btn flat label="REGISTER" color="white bg-primary" class=" q-mt-md full-width"
                            style="font-weight: bold;" @click="handleRegister" />

                    </q-tab-panel>
                </q-tab-panels>
            </q-card>
        </div>
    </q-page>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { Notify } from 'quasar'
import { useRouter } from 'vue-router';
import { auth, provider, signInWithPopup } from "../firebase";

const usernameLogin = ref('');
const passwordLogin = ref('');

const usernameRegister = ref('');
const passwordRegister = ref('');
const confirmPasswordRegister = ref('');

const tab = ref('one');

export default {
    setup() {
        const router = useRouter()
        axios.defaults.withCredentials = true;
        const handleLogin = async () => {
            try {
                const res = await axios.post("http://localhost:3000/api/login", {
                    username: usernameLogin.value,
                    password: passwordLogin.value
                });
                router.push('/')
                Notify.create({ color: 'positive', message: `LOGIN SUCCESSFULLY `, icon: 'done', position: 'top' },)

                usernameLogin.value = '';
                passwordLogin.value = '';

            } catch (err) {
                Notify.create({ color: 'negative', message: err.response.data, icon: 'error', position: 'top' },)
                console.error("Error adding task:", err);
            }

        }

        const googleLogin = async () => {
            try {
                const result = await signInWithPopup(auth, provider);
                const username = result.user.email;

                const res = await axios.post("http://localhost:3000/api/loginwithgoogle", {
                    username: username,
                })
                router.push('/')
                Notify.create({ color: 'positive', message: `LOGIN SUCCESSFULLY `, icon: 'done', position: 'top' },)

            } catch (err) {
                Notify.create({ color: 'negative', message: err.response.data, icon: 'done', position: 'top' },)
                console.error("Error adding task:", err);
            }
        }

        const handleRegister = async () => {
            try {
                const res = await axios.post("http://localhost:3000/api/signup", {
                    username: usernameRegister.value,
                    password: passwordRegister.value,
                    confirmPassword: confirmPasswordRegister.value
                });

                tab.value = 'one'
                Notify.create({ color: 'positive', message: `REGISTER SUCCESSFULLY `, icon: 'done', position: 'top' },)
                usernameRegister.value = '';
                passwordRegister.value = '';
                confirmPasswordRegister.value = '';
            } catch (err) {
                Notify.create({ color: 'negative', message: err.response.data, icon: 'done', position: 'top' },)
                console.error("Error adding task:", err);
            }

        }

        return {
            tab,
            usernameLogin,
            passwordLogin,
            usernameRegister,
            passwordRegister,
            confirmPasswordRegister,
            handleLogin,
            handleRegister,
            googleLogin
        }
    }
}
</script>

<style lang="sass" scoped>

</style>