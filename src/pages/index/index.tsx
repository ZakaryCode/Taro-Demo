import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import '../../app.scss'

const goods = [{
  id: 1,
  name: '手剥巴旦木',
  images: ['https://img10.360buyimg.com/n1/jfs/t1/38715/31/15161/264235/5d634857Edf3ae15b/9a044f97f763a505.jpg'],
  price: 3200,
}, {
  id: 2,
  name: '手剥巴旦木手剥巴旦木手剥巴旦木手剥巴旦木手剥巴旦木手剥巴旦木手剥巴旦木手剥巴旦木手剥巴旦木手剥巴旦木手剥巴旦木手剥巴旦木手剥巴旦木',
  images: ['https://img10.360buyimg.com/n1/jfs/t1/38715/31/15161/264235/5d634857Edf3ae15b/9a044f97f763a505.jpg'],
  price: 3200,
}, {
  id: 3,
  name: '手剥巴旦木',
  images: ['https://img10.360buyimg.com/n1/jfs/t1/38715/31/15161/264235/5d634857Edf3ae15b/9a044f97f763a505.jpg'],
  price: 3200,
}, {
  id: 4,
  name: '手剥巴旦木',
  images: ['https://img10.360buyimg.com/n1/jfs/t1/38715/31/15161/264235/5d634857Edf3ae15b/9a044f97f763a505.jpg'],
  price: 3200,
}, {
  id: 5,
  name: '手剥巴旦木',
  images: ['https://img10.360buyimg.com/n1/jfs/t1/38715/31/15161/264235/5d634857Edf3ae15b/9a044f97f763a505.jpg'],
  price: 3200,
}, {
  id: 6,
  name: '手剥巴旦木',
  images: ['https://img10.360buyimg.com/n1/jfs/t1/38715/31/15161/264235/5d634857Edf3ae15b/9a044f97f763a505.jpg'],
  price: 3200,
}, {
  id: 7,
  name: '手剥巴旦木',
  images: ['https://img10.360buyimg.com/n1/jfs/t1/38715/31/15161/264235/5d634857Edf3ae15b/9a044f97f763a505.jpg'],
  price: 3200,
}, {
  id: 8,
  name: '手剥巴旦木',
  images: ['https://img10.360buyimg.com/n1/jfs/t1/38715/31/15161/264235/5d634857Edf3ae15b/9a044f97f763a505.jpg'],
  price: 3200,
}, {
  id: 9,
  name: '手剥巴旦木',
  images: ['https://img10.360buyimg.com/n1/jfs/t1/38715/31/15161/264235/5d634857Edf3ae15b/9a044f97f763a505.jpg'],
  price: 3200,
}];

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
    shopCart: []
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () {
    Taro.getStorage({ key: 'SHOP_CART' }).then(e => {
      this.setState({
        shopCart: e.data
      })
    });
  }

  componentDidHide () { }

  onReachBottom() {
    console.log('onReachBottom');
  }

  handleCart = (good) => () => {
    const cart: any[] = this.state.shopCart;
    this.setState({
      shopCart: cart.reduce((p, e) => {
        if (p[0].id === e.id) {
          p[0].count += e.count;
        } else {
          p.push(e);
        }
        return p;
      }, [{ count: 1, ...good }])
    }, () => {
      Taro.setStorage({
        key: 'SHOP_CART',
        data: this.state.shopCart
      }).then(() => {
        Taro.showToast({ title: '添加至购物车', icon: 'none', duration: 2000 })
      });
    });
  }

  render () {
    return (
      <View className='index'>
        {process.env.TARO_ENV === 'h5' ? <View className='header'>{this.config.navigationBarTitleText}</View> : ''}
        <View className='goods_list'>
          {goods.map((e, i) => <View key={e.id} className='good'>
            <Image className='good_image' src={e.images[0]} />
            <View className='good_info'>
              <Text className='good_info_name text_line_2'>{e.name}</Text>
              <View className='good_info_bottom'>
                <Text className='good_info_bottom_price'>¥{(e.price / 100).toFixed(2)}</Text>
                <View className='good_info_bottom_shop_car' onClick={this.handleCart(e)}>
                  <View className='bg-icon shop-car_selected' />
                </View>
              </View>
            </View>
          </View>)}
        </View>
        <View className='shop-car-btn' onClick={() => {
          Taro.navigateTo({
            url: `${process.env.TARO_ENV === 'h5' ? '/' : ''}pages/indexS/index`
          })
        }}>
          <View className='bg-icon shop-car' />
        </View>
      </View>
    )
  }
}
