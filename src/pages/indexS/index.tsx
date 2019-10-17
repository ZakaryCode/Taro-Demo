import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

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

  componentWillMount () {
    Taro.getStorage({ key: 'SHOP_CART' }).then(e => {
      this.setState({
        shopCart: e.data
      })
    });
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const cart: any[] = this.state.shopCart = [];
    console.log(this.state.shopCart)
    return (
      <View className='index'>
        <View className='goods_list'>
          {cart.map((e, i) => <View key={e.id} className='good'>
            <Image className='good_image' src={e.images[0]} />
            <View className='good_info'>
              <Text className='good_info_name text_line_2'>{e.name}</Text>
              <View className='good_info_bottom'>
                <Text className='good_info_bottom_price'>¥{(e.price / 100).toFixed(2)}</Text>
                <View className='good_info_bottom_shop_car'>
                  <View className='shop-car-icon shop-car_selected' />
                </View>
              </View>
            </View>
          </View>)}
        </View>
        <View className='shop-car-btn' onClick={() => alert('购买成功')}>
          <Text className='shop-car-icon shop-car'>结算</Text>
        </View>
      </View>
    )
  }
}
