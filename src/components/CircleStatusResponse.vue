<template>
    <div class="circle-container">
        <div class="circle" :class="showResultInColor"></div>
        <div class="tooltip-info">
            <ul>
                <li><span class="square red"></span>    - плохо</li>
                <li><span class="square orange"></span> - пойдет</li>
                <li><span class="square yellow"></span> - нормально</li>
                <li><span class="square green"></span>  - хорошо</li>
                <li><span class="square purple"></span> - прекрасно</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: ['score', 'totalScore'],
   computed: {
       showResultInColor() {
           let scoreOfPercent = +(this.score / this.totalScore).toFixed(2) * 100;
           if (scoreOfPercent < 30) {
               return 'red';
           }
           else if (scoreOfPercent < 50) {
               return 'orange'
           }
           else if (scoreOfPercent < 70) {
               return 'yellow';
           }
           else if (scoreOfPercent < 90) {
               return 'green';
           }
           return 'purple';
       }
   },
}
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
}

.circle-container {
    margin-left: 10px;
    position: relative;
}

.circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    cursor: pointer;
    border: 1px solid rgba(0, 0, 0, 0.3);
}

.square {
    width: 10px;
    height: 10px;
    display: inline-block;
}

.red {
    background-color: rgb(253, 63, 63);
}

.green {
    background-color: rgb(18, 192, 18);
}

.yellow {
    background-color: rgb(252, 252, 67);
}

.orange {
    background-color: rgb(255, 187, 60);
}

.purple {
    background-color: rgb(224, 67, 255);
}

.tooltip-info {
    position: absolute;
    right: 0;
    bottom: 100%;
    text-align: left;
    width: 130px;
    padding: 10px 15px;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    visibility: hidden;
    z-index: 2000;
    transition: opacity 0.2s;
    border-radius: 5px;
}

.tooltip-info ul {
    list-style: none;
    color: 0;
    color: white;
}

.circle-container:hover .tooltip-info {
    opacity: 1;
    visibility: visible;
}
</style>