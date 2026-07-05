import { defineConfig } from 'astro/config';

// 部署到自定义域名根目录（如 https://www.eletoy.cc）时，用下面这样即可。
// 如果你先用 https://<用户名>.github.io/<仓库名>/ 测试（没绑域名），
// 把 site 改成 'https://<用户名>.github.io'，并加一行 base: '/<仓库名>/'。
export default defineConfig({
  site: 'https://www.eletoy.cc',
});
