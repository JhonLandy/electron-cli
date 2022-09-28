<template>
  <div class="app">{{ message }}</div>
</template>
<script lang="ts">
interface Av {
  a: string
}
const o: Av = {a : 1}
export default {
  name: "App",
  data() {
    return {
      message: 8889
    }
  }
}
</script>
<style lang="sass" scoped>
$color: red
.app
  background: $color

</style>
