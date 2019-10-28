import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import '../../app.scss'

const goods = [{
  id: 1,
  name: '芒果攀枝花凯特芒果钻石果',
  images: ['https://img12.360buyimg.com/n1/jfs/t7993/295/1598127238/84096/f9085c5c/599e2d1fN3dc18223.jpg'],
  price: 3800,
}, {
  id: 2,
  name: '青岛鲜活冷冻小章鱼大爆头 1000g 袋装 迷你小八爪鱼海鲜水产麻辣烧烤火锅食材',
  images: ['https://img10.360buyimg.com/n1/jfs/t1/40082/32/13747/169951/5d4b8b77Eb3d21c5a/39ee2ad5e4869202.jpg'],
  price: 6880,
}, {
  id: 3,
  name: '金枕头榴莲',
  images: ['https://img11.360buyimg.com/n1/jfs/t5851/56/9123571032/303833/d234e010/5982cb1fNc0786acb.jpg'],
  price: 19800,
}, {
  id: 4,
  name: '手剥巴旦木',
  images: ['https://img10.360buyimg.com/n1/jfs/t1/38715/31/15161/264235/5d634857Edf3ae15b/9a044f97f763a505.jpg'],
  price: 3200,
}, {
  id: 5,
  name: '橘子不知火丑橘四川丑八怪橘子粑粑柑新鲜水果',
  images: ['https://img10.360buyimg.com/n1/jfs/t12556/321/1397708530/366838/2509efd5/5a1f9f9cN09028b1e.jpg'],
  price: 5800,
}, {
  id: 6,
  name: '紫薯沂蒙山地瓜紫红薯番薯蜜薯沙地现挖香糯紫薯中大薯',
  images: ['https://img11.360buyimg.com/n1/jfs/t9229/341/1348042040/327017/7c99fc5c/59b8e9c3N402808e7.jpg'],
  price: 3990,
}, {
  id: 7,
  name: '【京东JOY联名款】天湖（tianhu）啤酒 24听10度精品易拉罐 爽口怡人 天湖 “独道” 330ml*24 整箱装',
  images: ['https://img12.360buyimg.com/n1/jfs/t16666/313/2243852165/219419/44418f11/5aebed61N06342067.jpg'],
  price: 3790,
}, {
  id: 8,
  name: '智利进口冷冻三文鱼刺身中段 400g 生鱼片刺身 盒装',
  images: ['https://img14.360buyimg.com/n0/jfs/t2662/209/3021439272/211442/70be3c38/577e7c2cNfddb5a0f.jpg'],
  price: 5080,
}, {
  id: 9,
  name: '冷冻进口阿根廷红虾 烧烤大虾 海鲜年货 L2级 2kg 40-60尾 盒装',
  images: ['https://img13.360buyimg.com/n1/jfs/t13006/184/2451709459/147285/ede36bd4/5a41f941N3b987f20.jpg'],
  price: 15800,
}]

export default class Index extends Component {
  static options = {
    addGlobalClass: true,
  }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  state = {
    pageNumber: 0,
    list: [],
    shopCart: [],
    isLoading: false
  }

  componentWillMount () {
    this.handlePageData()
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () {
    Taro.getStorage({ key: 'SHOP_CART' }).then(e => {
      this.setState({
        shopCart: e.data || []
      })
    })
  }

  componentDidHide () { }

  onReachBottom() {
    console.log('onReachBottom')
    this.handlePageData()
  }

  handlePageData = (pageSize = 10, _maxPage = 10) => {
    if (this.state.isLoading) return
    this.setState({
      isLoading: true
    }, () => {
      const index = this.state.pageNumber || 0
      const list: any[] = this.state.list
      list[index] = randerDate(pageSize)
      // const i = list.length - maxPage
      this.setState({
        list: [...list], // [...list.slice(i > 0 ? i : 0)],
        pageNumber: index + 1,
        isLoading: false
      })
    })
    
    function randerDate(size) {
      return new Array(size).fill('').map(() => goods[Math.floor(Math.random() * goods.length)])
    }
  }

  handleCart = (good, _event) => {
    const cart: any[] = this.state.shopCart || []
    this.setState({
      shopCart: cart.reduce((p, e) => {
        if (p[0].id === e.id) {
          p[0].count += e.count
        } else {
          p.push(e)
        }
        return p
      }, [{ count: 1, ...good }])
    }, () => {
      Taro.setStorage({
        key: 'SHOP_CART',
        data: this.state.shopCart
      }).then(() => {
        Taro.showToast({ title: '添加至购物车', icon: 'none', duration: 2000 })
      })
    })
  }

  render () {
    const list: any[] = this.state.list

    return (
      <View className='index'>
        {process.env.TARO_ENV === 'h5' ? <View className='header'>{this.config.navigationBarTitleText}</View> : ''}
        {list.map((p, i) => 
          p && p.length > 0 ? <View key={`page_${i}`} className='goods_list'>
            {p.map(e => <View key={e.id} className='good'>
              <Image className='good_image' src={e.images[0]} />
              <View className='good_info'>
                <Text className='good_info_name text_line_2'>{e.name}</Text>
                <View className='good_info_bottom'>
                  <Text className='good_info_bottom_price'>¥{(e.price / 100).toFixed(2)}</Text>
                  <View className='good_info_bottom_shop_car' onClick={this.handleCart.bind(this, e)}>
                    <View className='bg-icon shop-car_selected' />
                  </View>
                </View>
              </View>
            </View>)}
          </View>
          : <View key={`page_${i}`} className='goods_list' />)
        }
        <View className='shop-car-btn' onClick={() => {
          Taro.navigateTo({
            url: `${process.env.TARO_ENV === 'quickapp' ? '' : '/'}pages/cart/index`
          })
        }}>
          <View className='bg-icon shop-car' />
        </View>
      </View>
    )
  }
}
