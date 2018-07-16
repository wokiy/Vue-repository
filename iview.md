## iview问题集合
- table 表格的图片使用

```
  {
    title: '头像',
    key: 'avatar',
    columns: {
        'width':'50px'
    },
    render: (h, params) => {
        return h('div', [
            h('img', {
                attrs: {
                    src: params.row.avatar
                },
                style: {
                    width: '40px',
                    height: '40px'
                }
            }),
        ]);
    }
},
```
#### avatar传入图片的地址

```
  export const editInlineAndCellColumn = [
   {
        title: '商品图片',
        align: 'center',
        key: 'shopImg',
        width: 200,
         render: (h, params) => {
          return h('div', [
              h('img', {
                  attrs: {
                      src: params.row.avatar
                  },
                  style: {
                      width: '40px',
                      height: '40px'
                  }
              }),
          ]);
      }
    }
    ]
  
  export const editInlineAndCellData = [
    {
        shopName: '高科新农-高新—M23',
        shopDetail: '半对称喷洒系统大直径碳纤旋翼以及独有喷头布置，下压风场大，6米有效喷幅，提升喷洒效果',
        shopImg: 'https://a.img.s105.cn/UploadFiles/product/2017/5/201705041618487252.jpg!w640qm.jpg',
     }
     
```
