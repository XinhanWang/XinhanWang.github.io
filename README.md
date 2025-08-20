# XinhanWang.github.io

这是王心瀚（Xinhan Wang）的个人静态站点源码，使用纯静态 HTML/CSS/JS 构建并部署在 GitHub Pages（绑定自定义域名）。网站侧重于个人介绍、教育经历、技能展示、获奖情况、GitHub 统计、互动评论（基于 GitHub Issues 的 Utterances）以及若干交互式功能（微信二维码弹窗、LikeBtn等）。

主要功能
- 个人主页（中/英双语）：index.html、en.html
- 评论系统：comments.html、comments-en.html（使用 Utterances，基于 GitHub Issues）
- GitHub 统计展示（github-readme-stats + Star History）
- 交互脚本：移动端导航、复制邮箱/微信号、弹窗交互等（script.js）
- 动画与图表：Lottie 动画、LikeBtn 点赞组件
- SEO 与站点配置：sitemap.xml、robots.txt、CNAME（自定义域名）

技术栈
- 前端：HTML、CSS、Vanilla JavaScript
- 第三方服务：Utterances（评论）、github-readme-stats、LikeBtn、Lottie、Busuanzi（访客统计）、百度统计埋点
- 部署：GitHub Pages（通过仓库 `XinhanWang.github.io` 自动托管）

仓库重要文件说明
- index.html             - 中文主页
- en.html                - 英文主页
- comments.html          - 中文评论页（Utterances）
- comments-en.html       - 英文评论页（Utterances）
- styles.css             - 全站样式
- script.js              - 全站交互脚本（导航、弹窗、复制等）
- sitemap.xml            - 站点地图
- robots.txt             - robots 配置
- CNAME                  - 自定义域名（wangxinhan.cn）
- README.md              - 项目说明（本文件）

自定义与注意事项
- 修改自定义域名：编辑根目录的 CNAME 文件并在域名提供商处设置对应的 DNS（A/ALIAS 或 CNAME 指向 GitHub Pages）。
- 评论（Utterances）仓库设置：若要更改评论绑定的仓库，请修改 comments*.html 中 script 的 `repo` 字段，并在目标仓库 Issues 中允许第三方应用访问。
- 微信二维码：替换项目根目录下 `微信添加好友.png`（或相应图片），script.js 中会在弹窗打开时尝试复制微信号供用户快速添加。
- 第三方资源（如 Lottie、LikeBtn、github-readme-stats）均为外部服务，加载失败时页面会回退到备用展示（script.js 已做部分容错处理）。


