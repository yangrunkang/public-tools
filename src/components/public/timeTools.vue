<template>
  <div style="font-weight: bold;">
    <a-card>
      日期转换成时间戳<br/><br/>

      <a-input-number :min="1970" v-model="year"/>年
      <a-input-number :min="1" :max="12" v-model="month"/>月
      <a-input-number :min="1" :max="31" v-model="day"/>日
      <a-input-number :min="0" :max="24" v-model="hour"/>时
      <a-input-number :min="0" :max="60" v-model="minute"/>分
      <a-input-number :min="0" :max="60" v-model="second"/>秒   <a-button type="dashed" @click="initDate()">获取当前时间</a-button>
      <br/><br/>
      <a-button type='primary' @click="toTimeStamp()">转换成时间戳</a-button>
      <br/>
      <h2>结果:{{cotTimestamp}}</h2>
    </a-card>
    <br/><br/>
    <a-card>
      时间戳转换成日期:<br/><br/>
      <a-input-number :min="1" v-model="inputTimestamp" style="width: 200px"/>    <a-button type="dashed" @click="initTimestamp()">获取当前时间戳</a-button>
      <br/><br/>
      <a-button type='primary' @click="toDate()">转换成日期</a-button>
      <br/>
      <h2>结果:{{cotDateStr}}</h2>
    </a-card>

  </div>
</template>

<script>
  export default {
    name: "time-tools",
    data() {
      return {
        //日期转时间戳
        year: 1970,
        month: 1,
        day: 1,
        hour: 8,
        minute: 0,
        second: 1,
        cotTimestamp: '',
        //时间戳转日志
        inputTimestamp: '',
        cotDateStr: ''
      }
    },
    methods: {
      toTimeStamp() {
        //new Date("yyyy/MM/dd hh:mm:ss");
        let dateStr = this.year + '/' + this.month + '/' + this.day + ' ' + this.hour + ':' + this.minute + ':' + this.second;
        let date = new Date(dateStr);
        this.cotTimestamp = date.getTime() / 1000;
      },
      toDate() {
        let timestamp = this.inputTimestamp;
        this.cotDateStr = this.timeTrans(timestamp);
      },
      timeTrans(timestamp) {
        return this.cotUtil.formatUnixTime(timestamp);
      },
      //初始化日期
      initDate(){
        let date = new Date();
        this.year = date.getFullYear();
        this.month = date.getMonth() + 1;
        this.day = date.getDate();
        this.hour = date.getHours();
        this.minute = date.getMinutes();
        this.second = date.getSeconds();
      },
      //初始化时间戳
      initTimestamp(){
        this.inputTimestamp = parseInt(new Date().getTime() / 1000);
      }
    },
    mounted () {
      this.initDate();
    }
  }
</script>

<style scoped>

</style>
