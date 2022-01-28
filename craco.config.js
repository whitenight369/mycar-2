const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {  },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  babel: {//实现按需加载
    plugins: [
       [
           "import", 
           {
               "libraryName": "antd",
               "libraryDirectory": "es",
                "style": true //设置为true即是less     "css"是css
            }
        ]
    ]
},
};