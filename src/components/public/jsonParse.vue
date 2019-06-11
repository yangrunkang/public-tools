<template>
  <div>
    <a-textarea placeholder="请输入json串" :rows="10" v-model="jsonStr"/>
    <br/>
    <br/>
    <a-button type="primary" @click="beginParse()">格式化</a-button>
    <br/>
    <br/>
    <vue-json-pretty
      :data="result"
      :deep="3"
    >
    </vue-json-pretty>
  </div>
</template>

<script>
  import VueJsonPretty from 'vue-json-pretty'
  import Vue from 'vue'
  Vue.use(VueJsonPretty);
  export default {
    components: {
      VueJsonPretty
    },
    name: "json-parse",
    data() {
      return {
        jsonStr: '',
        result: ''
      }
    },
    methods: {
      beginParse() {
        let jsonStr = this.jsonStr;
        if (jsonStr === '') {
          this.$notification.info({
            message: '提示',
            description: '请输入json串,please~~',
          });
          return;
        }
        this.result = this.cotUtil.getRealJsonData(jsonStr);
      }
    }
  }
</script>

<style scoped>

</style>
