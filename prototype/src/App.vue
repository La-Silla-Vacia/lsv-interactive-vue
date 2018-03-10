<template>
  <div :class="[$style.container, {[$style.loading]: loading}]">
    <LoadScreen v-if="loading" />
    <div v-else :class="$style.inner">
      <h2 :class="$style.title">Hello <%= interactive_id %>!</h2>
      <Graphic />
    </div>
  </div>
</template>

<script>
  import debounce from 'lodash.debounce'
  import EventBus from './util/EventBus'
  import * as types from './store/mutation-types'

  import LoadScreen from './Components/atoms/LoadScreen'
  import Graphic from './Components/molecules/Graphic'

  export default {
    name: 'app',
    components: {
      LoadScreen,
      Graphic
    },
    data () {
      return {
      }
    },
    beforeCreate () {
      this.$store.commit(types.RECEIVE_SITE, {site: window.<%= interactive_id %>__data})
      this.$store.dispatch('fetchContent')
    },
    created () {
      window.addEventListener('resize', this.onResizeDebounced, true)
      window.addEventListener('orientationchange', this.onOrientationChange, false)
      window.addEventListener('scroll', this.onScrollDebounced)

      this.onResize()
    },
    destroyed () {
      window.removeEventListener('resize', this.onResizeDebounced, true)
      window.removeEventListener('orientationchange', this.onOrientationChange, false)
      window.removeEventListener('scroll', this.onScrollDebounced)
    },
    computed: {
      loading () {
        return !this.$store.getters.isLoaded()
      }
    },
    methods: {
      onResize (event) {
        let windowWidth = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth
        this.$store.commit(types.UPDATE_APP, {field: 'tablet', value: windowWidth <= 992})
        this.$store.commit(types.UPDATE_APP, {field: 'phone', value: windowWidth <= 480})

        EventBus.$emit('app.resize', event)
      },
      onResizeDebounced: debounce(function (event) {
        this.onResize(event)
      }, 16),
      onScroll (event) {
        EventBus.$emit('app.scroll', event)
      },
      onScrollDebounced: debounce(function (event) {
        this.onScroll(event)
      }, 16),
      onOrientationChange (event) {
        EventBus.$emit('app.orientationchange', event)
      }
    }
  }
</script>

<style lang="scss">
  @import './assets/styles/base';

  /* Hide the sidebar in historias */
  .article-sidebar.col-md-4.col-lg-3 {
    display: none;
  }

  .field-item > p,
  .img-container {
    max-width: 713px;
  }

  @media (min-width: 1200px) {
    .article-content.col-sm-12.col-md-8 {
      width: 85%;
    }
  }

  @media (min-width: 992px) and (max-width: 1200px) {
    .article-content.col-md-8 {
      width: calc(100% - 20px) !important;
    }
  }

  .lsv-interactive {
    width: 100%;
    font-family: "Roboto", Helvetica, Arial, sans-serif;
    font-size: 16px;
    font-weight: 400;

    & svg {
      overflow: visible;
    }
  }

  #app {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    width: 100%;
  }
</style>

<style module lang="scss">
  @import './assets/styles/base';
  .container {
    font-family: $font__family--sans;
    font-size: 16px;
    background-color: $color__neutral--lightest;
    transition: .2s;
    display: block;
  }

  .title {
    margin: 1em;
  }

  .loading {
    background-color: #fff;
  }
</style>