# 公共工具

# 技术栈
- 前端框架 [ant-design-vue](https://vue.ant.design/docs/vue/introduce-cn/)
- js框架 [vue](https://cn.vuejs.org/)
- [NodeJs](https://nodejs.org/zh-cn/)
- [webpack](https://webpack.js.org/)
- [router](https://router.vuejs.org/zh/)
- 第三方组件:   
  - 剪贴板复制 [vue-clipboards](https://www.npmjs.com/package/vue-clipboards)
  - json格式化工具 [vue-json-pretty](https://www.npmjs.com/package/vue-json-pretty)



## 项目构建
``` bash
# 进入order-cart-tools文件夹,package.json所在目录
npm install

# 本地开发构建(支持热更新) http://localhost:8080
npm run dev

# 构建生产包
npm run build
```

## 注意事项
``` 
 因为npm包管理 版本锁定 做得不好,且第三方npm版本锁定插件配置较为繁琐,不要运行 npm audit fix 命令
```

### nginx 上跨域配置
``` 
     upstream mytomcats {  
       # 后端服务提供者服务地址
       server 10.40.2.62:2087;  
     }
 
     server {
         # 本地端口
         listen       4006;
         
         # 前端请求url
         location /gateway {  
             # 代理到真正的服务
             proxy_pass http://mytomcats/gateway;  
             proxy_redirect off;  
             proxy_set_header Host $host;  
             proxy_set_header X-Real-IP $remote_addr;  
             proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;  
             # Content-Type 配置
             proxy_set_header Content-Type application/json;
             client_max_body_size 10m;  
             client_body_buffer_size 128k;  
             proxy_connect_timeout 90;  
             proxy_send_timeout 90;  
             proxy_read_timeout 90;  
             proxy_buffer_size 4k;  
             proxy_buffers 4 32k;  
             proxy_busy_buffers_size 64k;  
             proxy_temp_file_write_size 64k;  
             
             # 跨域配置
             add_header 'Access-Control-Allow-Origin' '*';
             add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
         }
         
     }
```
