<template>
    <div class="app">{{ message }}</div>
</template>
<script lang="ts">
export default {
    name: "App",
    data() {
        return {
            message: 888911,
        };
    },
};
</script>
<style lang="sass" scoped>
$color: red
.app
  background: $color
</style>
