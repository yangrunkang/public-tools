<template>
  <a-layout>
    <a-layout-header style="background: white;font-size: xx-large;font-weight: lighter;">
      <div class="home-cot-title">公共工具</div>
    </a-layout-header>
    <a-layout-content class="cot-content">
      <a-row>
        <a-col :span="3" class="cot-col-menu">
          <a-menu
            :defaultOpenKeys="['public']"
            mode="inline"
            theme="light"
            @click="handleClick"
            class="cot-menu"
          >

            <a-sub-menu v-for="menuParent in this.menuParentList" :key="menuParent.domain" class="sub-menu">
              <span slot="title"><a-icon :type="menuParent.icon"/><span>{{menuParent.desc}}</span></span>
              <a-menu-item v-for="menu in menuList" v-show="menu.domain==menuParent.domain"
                           :key="menu.menuRoute">{{menu.desc}}</a-menu-item>
            </a-sub-menu>

          </a-menu>
        </a-col>
        <a-col :span="21">

          <div style="margin: 24px 24px 0px 24px">
            <a-breadcrumb>
              <a-breadcrumb-item>{{$route.meta.superTitle}}</a-breadcrumb-item>
              <a-breadcrumb-item><a @click="reloadPage"><span style="color: #20a0ff;">{{$route.meta.title}}</span></a></a-breadcrumb-item>
            </a-breadcrumb>
          </div>
          <a-card :hoverable="true" class="cot-content-card" :bordered="false">
            <router-view style="margin-left: 20px;margin-right: 20px;margin-top: 20px"/>
            <a-back-top />
          </a-card>



        </a-col>
      </a-row>
    </a-layout-content>
    <a-layout-footer style="background: white;font-size:large;font-weight: lighter;text-align: center">
      <div> <a class="footer-link" href="http://www.addoiles.com"  target="_blank">独立网站:加油网站</a>
        |
        <a class="footer-link" href="http://www.addoiles.com/Suggest"  target="_blank">反馈以添加工具</a></div>
    </a-layout-footer>
  </a-layout>


</template>

<script>

  export default {
    data() {

      return {
        currEnv:sessionStorage.getItem('cot_curr_env'),
        isShowEnvSelect: process.env.NODE_ENV !== 'production',
        // 一级目录
        menuParentList:[],
        // 二级目录
        menuList:[],
        activeKey: '',
        defaultActiveKey:'',
        panes:[],
        htmlStr: "",
        isRepeat:false,

      }
    },
    methods: {
      handleClick(item) {
        this.$router.push(item.key);
      },

      reloadPage(e){
        e.preventDefault();
        this.$notification.open({
          message: '提示',
          description: '别点我~~'
        });
      },
      initHomeMemu(){
        console.log('this.menuList.length:' + this.menuList.length);
        if(this.menuParentList.length <= 0 ){
          this.menuParentList.push({domain:'public', icon:'calculator', desc:'公共工具'});
        }

        if(this.menuList.length <= 0 ){
          this.menuList.push({domain:'public',menuRoute:'timeTools',desc:'时间工具类'});
          this.menuList.push({domain:'public',menuRoute:'jsonParse',desc:'json转换'});
          this.menuList.push({domain:'public',menuRoute:'columnDeal',desc:'列信息处理'});
        }
      },

    },
    mounted(){
      console.log('home mounted');
      //初始化菜单
      this.initHomeMemu();
    }
  }
</script>
<style>
  .cot-menu {
    margin-top: 6px;
  }

  .cot-content-card {
    margin-top: 6px;
    margin-left: 2px;
    margin-right: 5px;
    background-color: white;
  }

  .cot-content {
    background-color: white;
  }

  .home-cot-title {
    font-weight: bolder;
    width: 100%;
    /* float: left; */
    /* padding-left: 0px; */
    margin-left: 17px;
    position: absolute;
    left: 1px;
  }

  .footer-link {
    color: rgba(0, 0, 0, 0.65);
    font-size:15px;
    font-weight: lighter;
    text-align: center
  }

</style>
