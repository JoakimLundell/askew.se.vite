<template>
    <div class="wrapper">
        <div class="heading">
            <h1>Om oss</h1>
        </div>
        <div class="content">
            <p>Vi är gänget som går på matcher. Dricker öl, åker snett, kommer i tid, klär oss snyggt, eldar, ramlar och sjunger högt. Vi håller ihop, bjuder upp, hatar, hånar, skrattar och gråter. Det har vi alltid gjort och så tänker vi fortsätta.</p>
            <div class="square"></div>
            <div class="dot"></div>
        </div>
    </div>
</template>

<script>
</script>

<style scoped>
    .wrapper {
        display: flex;
        justify-content: space-between;
          height: calc(100vh - var(--padding) - var(--header) - var(--menu) - var(--padding) - 1px);
    }

    .heading,
    .content {
        display: flex;
        width: 50%;
        padding: var(--padding)
    }

    .content p {
        text-align: justify;
    }

    .heading {
        background: var(--dark-red);
        background: url('../../images/shoes.jpg');
        
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;

      
    }

    .heading > h1 {
        font-size: 3rem;
        color:rgba(255,255,255,0.9);
    }

    .content {
        align-items: center;
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .square,
    .dot {
        margin-top: 5vh;
        background: var(--dark-red);
        
    }
    .square {
        width: 5vh;
        height: 30vh;
    }

    .dot {
        width: 6vh;
        height: 6vh;
        border-radius: 50%;
    }
</style>