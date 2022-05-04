<script setup lang="ts">

import { onMounted, ref } from "vue";
import { renderMap } from "@/map/map";

const canvas = ref<HTMLCanvasElement>()

onMounted(() => {
    renderMap(canvas.value!!)
})

</script>
<template>
    <canvas ref="canvas"/>
</template>
<style scoped lang="scss">

</style>