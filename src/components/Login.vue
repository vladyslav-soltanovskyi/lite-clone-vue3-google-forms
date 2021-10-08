<template>
    <section>
        <div class="container">
            <div class="user singinBx">
                <div class="formBx">
                    <form @submit.prevent="login(user)">
                        <h2>VueForms</h2>
                        <label class="description">Create your VueForms account</label>
                        <div class="form-group">
                            <InputForAuth :value="user.email"
                                            :name="'email'"
                                            :title="'Email'"
                                            @changeValue="changeValue"/>
                        </div>
                        <div class="form-group">
                            <InputForAuth :value="user.password"
                                            :name="'password'"
                                            :type="'password'"
                                            :title="'Password'"
                                            @changeValue="changeValue"/>
                        </div>
                        <div class="form-footer">
                            <p class="signup"><router-link to="/register">Create Account</router-link></p>
                            <input type="submit" value="Login">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import InputForAuth from './InputForAuth.vue';
import { mapActions } from 'vuex';

export default {
    data: () => ({
        user: {
            email: '',
            password: ''
        },
    }),
    methods: {
        changeValue({ value, name }) {
            this.user[name] = value;
        },
        ...mapActions('user', [
            'login' 
        ])
    },
    components: { InputForAuth }
}
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

section {
    position: relative;
    min-height: 100vh;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    transition: all 0.5s;
}

.container {
    position: relative;
    width: 400px;
    height: 400px;
    background: #ffffff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    overflow: hidden;
}

.container .user {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
}

.container .user .formBx {
    position: relative;
    width: 100%;
    height: 100%;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px;
    transition: all 0.5s;
}

.container .user .formBx form {
    width: 100%;
}

.container .user .formBx form .form-group {
    margin: 20px 0;
}

.container .user .formBx form .description {
    color: #808080;
    font-size: 13px;
    margin-bottom: 10px;
}

.container .user .formBx form .form_group_passwords {
    display: flex;
}

.container .user .formBx form .form_group_passwords .form_item:first-child {
    margin-right: 10px;
}

.container .user .formBx form .form_group_passwords .form_item:last-child {
    margin-left: 10px;
}

.container .user .formBx form .form-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.container .user .formBx form h2 {
    font-size: 18px;
    font-weight: 600px;
    color: #555;
}

.container .user .formBx form input {
    position: relative;
    width: 100%;
    padding: 10px;
    background: #f5f5f5;
    color: #333;
    border: none;
    outline: none;
    box-shadow: none;
    margin: 8px 0;
    font-size: 14px;
    letter-spacing: 1px;
    font-weight: 300;
}

.container .user .formBx form input[type="submit"] {
    max-width: 100px;
    background: #1877d5;
    color: #e8fcff;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 1px;
    transition: all 0.5s;
}

.container .user .formBx form .signup {
    position: relative;
    margin-top: 20px;
    font-size: 12px;
    letter-spacing: 1px;
    color: #555;
    font-weight: 300;
}

.container .user .formBx form .signup a {
    font-weight: 600;
    text-decoration: none;
    color: #677eff;
}

.container .singupBx {
    pointer-events: none;
}

.container.active .singupBx {
    pointer-events: initial;
}

.container .singupBx .formBx {
    left: 100%;
}

.container.active .singupBx .formBx {
    left: 0;
}

.container .singupBx .imgBx {
    left: -100%;
}

.container.active .singupBx .imgBx {
    left: 0;
}


/* singIn animation */

.container .singinBx .formBx {
    left: 0;
}

.container.active .singinBx .formBx {
    left: 100%;
}

.container .singinBx .imgBx {
    left: 0;
}

.container.active .singinBx .imgBx {
    left: -100%;
}

@media (max-width: 991px) {
    .container {
        max-width: 400px;
    }
    .container .imgBx {
        display: none;
    }
    .container .user .formBx {
        width: 100%;
    }
}

.container .user .formBx form label {
    position: relative;
}

.container .user .formBx form label .eye {
    position: absolute;
    top: 50%;
    font-size: 17px;
    right: 10px;
    transform: translateY(-50%);
    color: #bdbdbd;
    z-index: 5;
}

.container .user .formBx form input:hover {
    background: rgb(241, 237, 237);
}

.container .user .formBx form input:not([type="submit"]):focus {
    background: rgb(236, 233, 233);
}

.container .user .formBx form input[type="submit"]:hover {
    background: #4958af;
}
</style>