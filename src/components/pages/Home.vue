<template>
       
    <div class="wrapper">

        <div class="content">

            <div class="links">
            
                <router-link to="map" class="link">
                    <div class="border">
                        <div class="background two">
                        </div>    
                        <div class="text">
                            <h1>Karta</h1>
                            <div class="icon">
                                <askew-icon icon="map"></askew-icon>
                            </div>
                            
                            <p class="desktop">Se vart alla befinner sig, just nu</p>
                        </div>    
                    </div>
                </router-link>
            

            <router-link to="/venue" class="link" >    
                <div class="border">
                    <div class="background one"></div>    
                    <div class="text">
                        <h1>Plats</h1>
                        <div class="icon">
                            <askew-icon icon="center"></askew-icon>
                        </div>
                        
                        <p class="desktop">Se vart du ska var och när du ska vara där.</p> 
                    </div>
                </div>
            </router-link>
            
            <router-link to="chatt" class="link">
                <div class="border">

                    <div class="background four"></div>    
                    <div class="text">
                        <h1>Skriv <span class="desktop">något</span></h1>
                        <div class="icon">
                            <askew-icon icon="shout"></askew-icon>
                        </div>
                
                       
                        <p class="desktop">Säg något, om något</p>
                    </div>
                    
                </div>    
    
            </router-link>
            
            <router-link to="about" class="link">
                <div class="border">
            
                    <div class="background three"></div>    
                    <div class="text">
                        <h1>Om <span class="desktop">oss</span></h1>      
                        
                        <div class="icon">
                            <askew-icon icon="heart"></askew-icon>
                        </div>
                        <p class="desktop">Kort beskrivning av vilka vi är och pysslar med</p>
                    </div>
                
                </div>
            </router-link>

            
            
        </div>

    
        <div class="askew-welcome">ASKEW</div>

        </div>
        
    </div>
    
  
</template>

<script setup>
    import AskewIcon from './../AskewIcon.vue'
</script>
<script>
export default {
    mounted() {
        this.entry = gsap.timeline({paused: true});
        this.entry.from(".link",{xPercent:-100, opacity: 0, stagger: .2});
        //this.entry.to("#link1", {x:0, opacity: 1, ease: "Power1.ease"}, 1);
        this.entry.play();
    },
    beforeUnmount() {
        this.entry.reverse();
    }
}
</script>

<style scoped>
    /*section {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: calc(100vh - var(--header));
        padding: var(--padding);
        overflow: hidden;
        box-sizing: border-box;
        border: 1px solid red;
    }*/
    .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: calc(100vh - var(--padding) - var(--header) - var(--menu) - var(--padding) - 1px);
        width: auto;
    }

    .content {
        width: 100%;
        max-width: 800px;
    }

    .links {
        display: flex;
        justify-content: center;
        width: 100%;
    }

    .links a {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        width: 25%;
        height: 50vh;
        border: 1px solid rgb(0, 0, 0);
        padding: 2px;
        margin: 5px;
        overflow: hidden;
    }

    
    
    /* Icon */
    .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        background: var(--black);
        width: 50px;
        height: 50px;
        border-radius: var(--border-radius);
        border: 2px solid var(--white);
    }

    .icon svg {
        fill: var(--white);
        width: 30px;
        height: 30px;
    
    }
    
    .link h1 {
        font-weight: normal;
        color: var(--black);
        text-shadow: 0px 0px 4px rgba(250,250,250,0.9);
        text-align: center;
        padding: 6px 0;
        

    }
    .link p {
        height: 70px;
        color: var(--black);
        background: rgba(255,255,255,0.3);
        margin: 12px;
        padding: 12px;
        font-family: 'Roboto Condensed', sans-serif;

        border-radius: 6px;
    }

    
    /* BIG text */
    div.askew-welcome {
        font-family: 'Roboto Condensed', sans-serif;
        font-size: 7rem;
        font-weight: bold;
        color: var(--white);
        text-shadow: 1px 10px 14px black;
        display: flex;
        justify-content: center;
        letter-spacing: 0px;
        animation: welcome 5s ease;
        width: 100%;
        
        overflow: hidden;
    }
   
   
    /* refactor */
    .border {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
    }
    .border > .background {
        position: absolute;
        width: 100%;
        height: 100%;

        transition: transform 10s ease;
        transition-delay: 0.2s;
    }

    .background.one {
        background: url('../../assets/img/home.jpg');
        background-position: top center;
        background-repeat: no-repeat;
    }
    .background.two {
        background: url('../../images/map.png');
        background-position: center;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        /*filter: url(#blue-wash) brightness(40%);*/
        /* filter: sepia(100%) hue-rotate(190deg) saturate(500%); */
        
    }
    .background.three {
        background: url('../../images/shoes.jpg');
        
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
    .background.four {
        background: url('../../assets/img/dubbelfakk.jpg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        transition: transform 10s ease;
    }
    
    .border > .text {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        z-index: 100;
    }

    .link:hover > .border > .background {
        -ms-transform: scale(1.5); /* IE 9 */
        -webkit-transform: scale(1.5); /* Safari 3-8 */
        transform: scale(1.5);
        transition: transform 10s linear; 
        transition-delay: 1s;
    }

    @keyframes welcome {
        0% { opacity: 0; text-shadow: none}
        /*50% {opacity: 1}
        100% {text-shadow: none}*/
    }

    @media only screen and (min-width: 600px) {
       div.askew-welcome {
          justify-content: flex-end;
          font-size: 9rem;
          overflow: visible;
        }
        
      }
</style>