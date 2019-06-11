import Vue from 'vue';
import Router from 'vue-router';

// 独立页面
import CotHome from '@/components/home';

//公共页面
import timeTools from '@/components/public/timeTools';
import jsonParse from '@/components/public/jsonParse';
import columnDeal from '@/components/public/columnDeal';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Public Tools-home',
      component: CotHome,
      children: [
        /*公共工具*/
        {path: '/timeTools', meta: {superTitle: '公共工具', title: '时间'}, component: timeTools},
        {path: '/jsonParse', meta: {superTitle: '公共工具', title: 'Json'}, component: jsonParse},
        {path: '/columnDeal', meta: {superTitle: '公共工具', title: '列信息处理'}, component: columnDeal}
      ]
    }
  ]
})
