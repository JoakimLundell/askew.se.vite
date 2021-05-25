<template>
        
    <div @click="openLoginScreen" :title="getTitle">
        <svg v-if="!auth" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"/></g><g><path d="M11,7L9.6,8.4l2.6,2.6H2v2h10.2l-2.6,2.6L11,17l5-5L11,7z M20,19h-8v2h8c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2h-8v2h8V19z"/></g></svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
    </div>

</template>

<script>
export default {
    data() {
        return {
            login: {
                email: null,
                password: null
            }
        }
    },
    props: {
        loading: {
            required: false,
            default: false
        },
        auth: {
            requried: true,
            default: false
        }
    },
    methods: {
        
        openLoginScreen() {
            this.$emit('openLoginScreen')
        }
        
    },
    computed: {
        getTitle: function() {
            return (this.auth) ? 'Logout' : 'Login'
        }
    }
}
</script>

<style scoped>
div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--header);
    height: var(--header);
    /*background: rgba(123,123,123,0.2);*/
}
svg {
    fill: var(--white);
    transition: fill .5s ease;
}
svg:hover {
    fill: var(--accent-color);
    transition: fill .5s ease;
}
</style>