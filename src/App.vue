<template>
  <div id="app">
    <component :is="comp" />
  </div>
</template>

<script>
export default {
  name: 'App',
  props: {},
  data() {
    return {
      comp: resolve => require(['../compiled/dev/login.shell.vue'], resolve)
    }
  },
}
</script>

<style>
#app {
  overflow-y: scroll;
  width: 100vw;
  height: 100%;
  position: fixed;
}

* {
  margin: 0;
  padding: 0;
}
</style>
