<template>
    <template v-if="user && user.avatar">
        <img
            class="avatar"
            :src="user.avatar"
            :alt="`Avatar ${user.username}`"
        />
    </template>
    <template v-else>
      <div
        :style="{
          background: `linear-gradient(135deg, ${color} 0%, ${colorLighten} 96.52%)`
        }"
        className="avatar avatar--symbol"
      >
        {{firstChar}}
      </div>
    </template>
</template>

<script>
import tinycolor from "tinycolor2";

export default {
    props: ['user'],
    data: () => ({
        color: null,
        colorLighten: null,
        firstChar: null
    }),
    mounted() {
        let hash = generateHash();
        const { color, colorLighten } = generateAvatarFromHash(hash);
        this.color = color;
        this.colorLighten = colorLighten;
        this.firstChar = this.user.username[0].toUpperCase();
    }
}

function generateHash() {
    return Math.random().toString(36).replace(/[^a-zA-z0-9]+/g, '').substr(0, 5);
}

function getCorrectIndex(number) {
    if (number > 255) {
        return 255;
    }
    if (number < 0) {
        return 0;
    }
    return number > 255 ? 255 : number < 0 ? 0 : number;
}

function generateAvatarFromHash(hash) {
    const [r, g, b] = hash
        .substr(0, 3)
        .split("")
        .map(char => getCorrectIndex(char.charCodeAt(0)));

    return {
        color: tinycolor({ r, g, b })
        .lighten(10)
        .saturate(10)
        .toHexString(),
        colorLighten: tinycolor({ r, g, b })
        .lighten(30)
        .saturate(30)
        .toHexString()
    };
}
</script>

<style scoped>
.avatar {
    border-radius: 50%;
    width: 100%;
    height: 100%;
}
.avatar--symbol {
    color: #fff;
    text-align: center;
    font-weight: 600;
    line-height: 38px;
    font-size: 18px;
}
</style>