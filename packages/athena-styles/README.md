## 建议使用强大的Tailwind CSS通用样式集合

### 业务模块通用样式引入方式

@import '~athena-styles/dist/variables.css';
@import '~athena-styles/dist/base.css';

业务工程tsconfig.json中配置
`"paths": {
    "~/*": [
    "packages/*"
    ],
    "@/*": [
    "./src/*"
    ]
}`
