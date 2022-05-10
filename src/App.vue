<template>
  <div id="app">
    <RequestsList />
  </div>
</template>

<script>
import RequestsList from './components/RequestsList';

export default {
  name: 'App',
  components: {
    RequestsList,
  },
};
</script>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
