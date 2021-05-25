<template>

    <div class="overlay" @click="close"></div>
    
    <div class="login">
        <div class="login-header">
            <h1>Login</h1>

            <svg @click="close" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
            

        </div>
        <div class="login-content">
            <template v-if="auth">
                <h2>Du är inloggad [{{user.name}}]</h2>
                <h3>Välj dina trainers</h3>
                <div class="trainers">
                    <img 
                        v-for="t in trainers" 
                        :key="t.id"
                        :alt="t.name" 
                        :src="t.url"
                        :class="{'active': t.name == user.trainers}"
                        @click="changeTrainers(t.name)"
                        class="item"/>
                </div>

                <div class="buttons" style="display: flex; justify-content: space-between">
                    <button @click="signOut" class="warning" > Logout </button>
                    <button @click="close"> Stäng </button>
                </div>
                
            </template>

            <template v-else>
                <h2>Du är inte inloggad</h2>
                <label for="username">Din e-postadress</label>
                <input type="text" name="username" v-model="login.username" />
                <label for="password">Ditt lösenord</label>
                <input type="password" name="password" v-model="login.password" />
                <button @click="signIn"> Login </button>
            </template>
        </div>
    </div>
    

</template>

<script>

export default {
    
    data() {
        return {
            login: {
                username: null,
                password: 'hataaik',
            },
            trainers:[
                   {id: 1, name: 'trainers1.png', url: './src/assets/trainers/trainers1.png'},
                   {id: 2, name: 'trainers2.png', url: './src/assets/trainers/trainers2.png'},
                   {id: 3, name: 'trainers3.png', url: './src/assets/trainers/trainers3.png'},
                   {id: 4, name: 'trainers4.png', url: './src/assets/trainers/trainers4.png'},
                   {id: 5, name: 'trainers5.png', url: './src/assets/trainers/trainers5.png'},
                   {id: 6, name: 'trainers6.png', url: './src/assets/trainers/trainers6.png'},
                   {id: 7, name: 'trainers7.png', url: './src/assets/trainers/trainers7.png'},
                   {id: 8, name: 'trainers8.png', url: './src/assets/trainers/trainers8.png'},
                   {id: 9, name: 'trainers9.png', url: './src/assets/trainers/trainers9.png'},
                   {id: 10, name: 'trainers10.png', url: './src/assets/trainers/trainers10.png'},

            ]
             
            
        }
    },
    props: {
        auth: {
            requried: true,
            default: false
        },
        user: {
            required: false,
            default: null
        },
      
    },
    methods: {
        signIn() {
            this.$emit('signIn')
        },
        signOut() {
            this.$emit('signOut')
        },
        close(e) {
            e.preventDefault();
            this.$emit('closeLoginScreen')
        },
        changeTrainers(item) {
            this.$emit('changeTrainers', item)
        } 
    }  
}
</script>

<style scoped>
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        content: ' ';
        background: rgba(0,0,0,.5);
        z-index: 1000;
    }
    .login {
        position: fixed;
        top: 12px;
        left: 12px;
        right: 12px;
        
        background: var(--background);
        box-shadow: 2px 2px 12px black;
        padding: 18px;
        z-index: 1000;
    }

    h1 {margin: 0;}

    .login-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .login-content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 12px;
    }

    svg {
        fill: var(--accent-color);
    }

    svg:hover {
        fill: var(--accent-color-hover);
    }

    /* trainers */
    .trainers {
        display: flex;
        flex-wrap: wrap;
    }
    .trainers .item {
        margin: 0 12px 12px 0;
        padding: 6px;
        background: darkgray;
        border: 2px solid darkgray
    }

    .trainers .item.active {
        border: 2px solid var(--accent-color);
        background: var(--accent-color);
    }

</style>