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
    navigationBarTitleText: '购物车'
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

  handleCartCounters = (isIncrement, good) => () => {
    const cart: any[] = this.state.shopCart;
    this.setState({
      shopCart: cart.map(e => {
        if (good.id === e.id) {
          if (isIncrement) {
            e.count++;
          } else if (e.count > 1) {
            e.count--;
          } else {
            Taro.showToast({
              title: '已经不多了，不能再减少了 ( ﹁ ﹁ )',
              icon: 'none',
              duration: 2000
            });
          }
        }
        return e;
      })
    }, () => {
      Taro.setStorage({
        key: 'SHOP_CART',
        data: this.state.shopCart
      });
    });
  }

  render () {
    const cart: any[] = this.state.shopCart || [];
    console.log(this.config.navigationBarTitleText)
    return (
      <View className='index'>
        {process.env.TARO_ENV === 'h5' ? <View className='header'>{this.config.navigationBarTitleText}</View> : ''}
        <View className='carts'>
          {cart.map((e, i) => <View key={e.id} className='good'>
            <Image className='good_image' src={e.images[0]} />
            <View className='good_info'>
              <Text className='good_info_name text_line_2'>{e.name}</Text>
              <View className='good_info_bottom'>
                <Text className='good_info_bottom_price'>¥{(e.price / 100).toFixed(2)}</Text>
                <View className='good_info_bottom_counters'>
                  <View className='bg-icon good_info_bottom_counters_controller' onClick={this.handleCartCounters(false, e)}>-</View>
                  <View className='good_info_bottom_counters_amount' >{e.count}</View>
                  <View className='bg-icon good_info_bottom_counters_controller' onClick={this.handleCartCounters(true, e)}>+</View>
                </View>
              </View>
            </View>
          </View>)}
        </View>
        <View className={`settle-accounts-btn settle-accounts-btn_${cart.length < 1 ? 'empty' : 'shop'}`} onClick={() => cart.length < 1 ?
            Taro.showToast({ title: '购物车为空', icon: 'none', duration: 2000 }) :
            Taro.showModal({ title: '提示', content: '购买成功', showCancel: false }).then(() => {
              Taro.setStorage({
                key: 'SHOP_CART',
                data: []
              }).then(() => {
                Taro.navigateBack();
              });
            })}>
          <Text>结算</Text>
        </View>
      </View>
    )
  }
}
