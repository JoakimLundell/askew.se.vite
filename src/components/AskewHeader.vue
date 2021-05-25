<template>
    <header>
        <slot></slot>
    </header>
</template>

<script>
export default {
    props: {
        open: {
            requried: true,
            default: false
        }
    },
    methods: {
        toggle() {
            this.$emit('toggle')
        }
    }  
}
</script>

<style scoped>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: var(--header);
        color: var(--white);
        padding: 0 6px;
        position: relative;
        background: var(--header-background);
    }

    header a {
        border: 1px solid pink;
        color: var(--dark-red)
    }
</style>