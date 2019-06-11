<template>
  <div style="font-weight: bold;">
    <a-textarea placeholder='列信息处理' :rows="10" v-model="content"/><br /><br />
    <a-input placeholder='行转列分隔符,默认 "," 示例: a,b,c' v-model="split"/><br /><br />
    <a-input placeholder="行数据包裹符号 默认'' 示例:'test'" v-model="include"/>
    <a-button type="primary" @click="toLine()" style="margin-top: 10px">转成行</a-button>
    <a-button type="primary" v-clipboard="result" @success="copySuccess">复制结果</a-button><br /><br />
    <a-card title="生成结果">
      <div v-html="result"></div>
    </a-card>
  </div>
</template>

<script>
  export default {
    name: "column-deal",
    data() {
      return {
        //待处理内容
        content:"",
        // 分隔符
        split:"",
        // 行数据包裹符号
        include:"",
        // 结果
        result:""
      }
    },
    methods: {
      toLine() {
        this.clearData();

        let _split = this.split;
        if(_split === ""){
          _split = ",";
        }

        let _include = this.include;
        if(_include === ""){
          _include = "'";
        }

        let _content = this.content;
        if(_content === "") {
          this.$notification.error({
            message: '提示',
            description: '没有输入任何内容',
          });
          return;
        }

        let lines = _content.split("\n");
        let _result = "";
        for(let index in lines){
          _result = _result + _include + lines[index].trim() + _include + _split;
        }
        this.result = _result.substring(0,_result.length - 1);
      },
      clearData(){
        this.result = "";
      },
      copySuccess() {
        this.$notification.info({
          message: '提示',
          description: '复制成功',
        });
      },
    },
  }
</script>

<style scoped>

</style>
