<template>
    <div class="container-dropdown">
        <div class="dropdown-profile" @click="toggleVisibility">
            <div class="profile-avatar">
                <avatar :user="user" />
            </div>
            <i class="fas fa-angle-down"></i>
        </div>
        <transition name="dropdown-fade">
            <div class="drodown-menu"
                v-click-outside.stop="onClickAway"
                v-if="isVisible">
                <div class="menu">
                    <div class="menu-item">
                        <span class="menu-link" @click="showModal">Настройки</span>
                    </div>
                    <div class="menu-item">
                        <router-link class="menu-link" to="/personal-quizzes">Мои&nbsp;викторины</router-link>
                    </div>
                    <div class="menu-item">
                        <span class="menu-link" @click="logout">Выйти</span>
                    </div>
                </div>
            </div>
        </transition>

        <teleport to="body">
            <transition name="modal-settings" mode="out-in">
                <ModalSettingsUser
                    v-if="visibilityModal"
                    @closeModal="closeModal"
                    :userData="user"
                >
                </ModalSettingsUser>
            </transition>
        </teleport>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import Avatar from './Avatar.vue';
import ModalSettingsUser from './ModalSettingsUser.vue';

export default {
    data: () => ({
        isVisible: false,
        visibilityModal: false
    }),
    computed: {
        showProfileMenu() {
            return { active: this.isVisible};
        },
        ...mapGetters('user', ['user'])
    },
    methods: {
        closeModal() {
            this.visibilityModal = false;
        },
        showModal() {
            this.visibilityModal = true;
        },
        toggleVisibility() {
            this.isVisible = !this.isVisible;
        },
        onClickAway() {
            this.isVisible = false;
        },
        ...mapMutations('user', ['logout'])
    },
    components: { ModalSettingsUser, Avatar }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none;
    box-sizing: border-box;
}

.container-dropdown {
    position: relative;
}

.dropdown-profile {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    position: relative;
    padding: 10px 10px;
    cursor: pointer;
}

.dropdown-profile .profile-name {
    color: #202124;
    font-weight: 700;
    font-size: 16px;
}

.dropdown-profile .profile-avatar {
    width: 40px;
    height: 40px;
    margin: 0 10px;
}


.dropdown-profile i {
    font-size: 18px;
    color: #969696;
    /* d4d3d3 */
}

.drodown-menu {
    position: absolute;
    top: 100%;
    right: 0;
    box-shadow: 0 0 5px 0 rgba(63, 66, 87, 0.2);
    background-color: rgb(255, 255, 255);
    border-radius: 4px;
    text-align: left;
    padding: 15px 20px;
    /* padding: 10px 15px; */
    z-index: 5;
    list-style: none;
}

.drodown-menu .menu {
    list-style: none;
}

.drodown-menu .menu .menu-item .menu-link {
    padding: 7px 0;
    font-size: 12px;
    color: #515365;
    display: block;
    font-weight: 700;
    cursor: pointer;
    transition: all .15s ease;
}

.drodown-menu .menu .menu-item .menu-link:hover {
    color: #ff5e3a;
    background-color: transparent;
}

.dropdown-fade-enter-active, .dropdown-fade-leave-active {
    transition: all .1s ease-in-out;
}

.dropdown-fade-enter, .dropdown-fade-leave-to {
    opacity: 0;
    transform: translateY(-12px);
}

.modal-enter-active{
    animation: show 0.15s;
}

.modal-leave-active{
    animation: hide 0.15s;
}

@keyframes show{
    from {opacity: 0;}
    to {opacity: 1;}
}

@keyframes hide{
    from {opacity: 1;}
    to {opacity: 0;}
}

.modal-settings-enter-active{
    animation: show 0.15s;
}

.modal-settings-leave-active{
    animation: hide 0.15s;
}
</style>