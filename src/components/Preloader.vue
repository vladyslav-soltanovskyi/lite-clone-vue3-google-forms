<template>
    <div class="container-spinner">
        <div class="spinner"></div>
    </div>
</template>

<style>
.container-spinner {
    background-color: #a500d3; /* d35400 */
    padding: 0;
    margin: 0;
    color: #fff;
    font-size: 14px;
    line-height: 1.5em;
    text-align: center;
    height: 100vh;
    width: 100%;
    position: fixed;
    overflow: hidden;
    z-index: 9999;
    transition: background-color 0.6s ease-in-out 0s;
}

.spinner {
    width: 40px;
    height: 40px;
    background-color: #fff;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    /* margin: 100px auto; */
    -webkit-animation: sk-rotateplane 1.2s infinite ease-in-out;
    animation: sk-rotateplane 1.2s infinite ease-in-out;
}

@-webkit-keyframes sk-rotateplane {
  0% { -webkit-transform: perspective(120px) }
  50% { -webkit-transform: perspective(120px) rotateY(180deg) }
  100% { -webkit-transform: perspective(120px) rotateY(180deg)  rotateX(180deg) }
}

@keyframes sk-rotateplane {
  0% { 
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg) 
  } 50% { 
    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg) 
  } 100% { 
    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
    -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
  }
}
</style>