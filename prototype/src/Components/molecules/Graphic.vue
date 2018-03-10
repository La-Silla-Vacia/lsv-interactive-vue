<template>
  <div :class="$style.container">
    <button
        v-for="item in items"
        :class="$style.circle"
        :key="item.name"
        :style="{width: 10, height: 10}"
        @click="handleClick(item.name)">
      {{item.name}}
    </button>
  </div>
</template>

<script>
  export default {
    name: 'Graphic',
    components: {},
    mounted () {
    },
    methods: {},
    computed: {
      items () {
        return this.$store.getters.getItems()
      }
    },
    methods: {
      handleClick (name) {
        alert(name)
      }
    }
  }
</script>

<style module lang="scss">
  @import '../../assets/styles/base';

  .container {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-bottom: 2em;
  }

  .circle {
    border-radius: 50%;
    background-color: $color__red--santander;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: .4s;
    border: 0;

    &:hover {
      background-color: $color__red--lider;
      color: #fff;
    }
  }
</style>
