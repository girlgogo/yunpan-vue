<template>
  <ul class="breadcrumb">
    <li v-for="(item, index) in parentList" :key="item.id">
      <Icon class="icon-break-next" type="ios-arrow-right" size=20 color="#777" v-if="index !== 0"></Icon>
      <a href="#" @click="changeId(item.id)">{{item.name}}</a>
    </li>
  </ul>
</template>

<script>
import { Icon } from 'iview'
export default {
  name: 'breadcrumb',
  components: {
    Icon
  },
  computed: {
    parentList () {
      let type = this.$store.state.type
      if (type === 'folder') {
        return this.$store.getters.breakcrumb
      } else {
        return [{ type, id: type, name: type }]
      }
    }
  },
  methods: {
    changeId (id) {
      this.$store.commit('changeCurrentListId', {id})
      this.$store.commit('changeCheckedAll', {checkAll: false})
      this.$store.commit('changeCurrentListBuffer')
    }
  }
}
</script>

<style>
  .breadcrumb {
    height: 40px;
    line-height: 40px;
    margin: 10px;
    text-align: center;
  }
  .breadcrumb li {
    display: inline-block;
    font-family: -apple-system;
    font-weight: 700;
  }
  .breadcrumb li a {
    color: #777;
  }
  .breadcrumb li:last-child a {
    color: #000;
    pointer-events: none;
  }
  .icon-break-next {
    margin: 0 10px;
    vertical-align: text-top;
    /* width: 8px;
    height: 17px;
    line-height: 15px; */
  }
</style>
