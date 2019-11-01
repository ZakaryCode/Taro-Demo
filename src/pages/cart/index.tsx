import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import '../../app.scss'

export default class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '购物车',
    disableScroll: this.state.moveAction
  }

  state = {
    shopCart: [],
    moveAction: false,
    windowHeight: 1920,
    windowWidth: 1080
  }

  componentWillMount () {
    Taro.getSystemInfo({
      complete: e => {
        this.setState({
          windowWidth: e.result ? e.result.windowWidth : e.windowWidth,
          windowHeight: e.result ? e.result.windowHeight : e.windowHeight
        })
      }
    })
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () {
    Taro.getStorage({ key: 'SHOP_CART' }).then(e => {
      this.setState({
        shopCart: e.data
      })
    })
  }

  componentDidHide () { }

  onPageScroll(distance) {
    // console.log(this.state.startY, distance)
    if (Math.abs(distance) > 10) {
      this.onTouchStartHandler({}, undefined)
    }
  }

  handleCartCounters = (isIncrement, good) => () => {
    const cart: any[] = this.state.shopCart
    this.setState({
      shopCart: cart.map(e => {
        if (good.id === e.id) {
          if (isIncrement) {
            e.count++
          } else if (e.count > 1) {
            e.count--
          } else {
            Taro.showToast({
              title: '已经不多了，不能再减少了 ( ﹁ ﹁ )',
              icon: 'none',
              duration: 2000
            })
          }
        }
        return e
      })
    }, () => {
      Taro.setStorage({
        key: 'SHOP_CART',
        data: this.state.shopCart
      })
    })
  }

  onTouchStartHandler = (good: any = {}, event) => {
    event && event.stopPropagation()
    try {
      const { pageX } = event.changedTouches[0] || event.touches[0]
      const target = event.currentTarget
      const children = target.children || event.touches || []
      const hideWidth = (children[children.length - 1] || {}).offsetWidth || (160 / .75)
      let _lists: any[] = this.state.shopCart
      _lists.forEach(_item => {
        if (_item.id != good.id) {
          _item.x = 0
        } else {
          _item.startX = pageX
          _item.widthRange = hideWidth
        }
      })
      this.setState({
        shopCart: _lists,
        moveAction: true
      })
    } catch (error) {
      let _lists: any[] = this.state.shopCart
      _lists.forEach(_item => {
        _item.x = 0
      })
      this.setState({
        shopCart: _lists,
        moveAction: true
      })
    }
  }

  onHandleSlideOut = (good: any = {}, event) => {
    event && event.stopPropagation()
    const { moveAction } = this.state
    if (!moveAction) {
      return
    }
    const { pageX } = event.changedTouches[0] || event.touches[0]
    const distance = pageX - good.startX
    let _lists: any[] = this.state.shopCart
    _lists.forEach(_item => {
      if (_item.id == good.id) {
        _item.x = distance < - good.widthRange / 3 ? - good.widthRange : 0
        _item.startX = 0
      }
    })
    this.setState({
      shopCart: _lists,
      moveAction: false
    })
  }

  onTouchMoveHandler = (good: any = {}, event) => {
    event && event.stopPropagation()
    const { pageX } = event.changedTouches[0] || event.touches[0]
    const distance = pageX - good.startX
    let _lists: any[] = this.state.shopCart
    _lists.forEach(_item => {
      if (_item.id == good.id) {
        let x = distance
        if (x > 0) x = 0
        if (x < - good.widthRange) x = - good.widthRange
        _item.x = x
        _item.startX = good.startX
      }
    })
    this.setState({
      shopCart: _lists,
      moveAction: true
    })
  }

  onDeleteItem = (good: any = {}, event) => {
    event && event.stopPropagation()
    Taro.showModal({
      title: "提示",
      content: `确定要从购物车移除“${good.name}”吗？`,
      success: res => {
        let _lists: any[] = this.state.shopCart
        if (res.confirm) {
          _lists.forEach((_item, index, _lists) => {
            if (_item.id == good.id) {
              _lists.splice(index, 1)
            }
          })
          this.setState(
            {
              lists: _lists
            },
            () => {
              Taro.showToast({
                title: "删除成功",
                icon: "success"
              })
            }
          )
        } else if (res.cancel) {
          _lists.forEach(_item => {
            if (_item.id == good.id) {
              _item.startX = 0
              _item.x = 0
            }
          })
          this.setState({
            lists: _lists
          })
        }
      }
    })
  }

  render () {
    const cart: any[] = this.state.shopCart || []
    return (
      <View className='index'
        onTouchStart={this.onTouchStartHandler.bind(this, {})}>
        {process.env.TARO_ENV === 'h5' ? <View className='header'>{this.config.navigationBarTitleText}</View> : ''}
        <View className='carts'>
          {cart.map((e, i) => 
            <View key={e.id} className='cart_one'
              style={process.env.TARO_ENV === 'quickapp' ? { width: this.state.windowWidth + 230 } : {}}>
              <View className='good cart_one_good'
                  onTouchStart={this.onTouchStartHandler.bind(this, e)}
                  onTouchEnd={this.onHandleSlideOut.bind(this, e)}
                  onTouchMove={this.onTouchMoveHandler.bind(this, e)}
                  style={{ left: `${e.x || 0}` }}>
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
                <View
                  className='good_delete'
                  onClick={this.onDeleteItem.bind(this, e)}
                  style={process.env.TARO_ENV === 'quickapp' ? {} : { position: 'absolute', right: Taro.pxTransform(-160), top: 0 }}>
                    <Text style={{ color: '#FFF' }}>删除</Text>
                  </View>
              </View>
            </View>)}
        </View>
        <View className={`settle-accounts-btn`} style={{ backgroundColor: '#FFF' }} onClick={() => cart.length < 1 ?
            Taro.showToast({ title: '购物车为空', icon: 'none', duration: 2000 }) :
            Taro.showModal({ title: '提示', content: '购买成功', showCancel: false }).then(() => {
              Taro.setStorage({
                key: 'SHOP_CART',
                data: []
              }).then(() => {
                Taro.switchTab({
                  url: process.env.TARO_ENV === 'weapp' ? 'pages/index/index' : '/pages/index/index'
                })
                // Taro.navigateBack()
              })
            })}>
          <Text className='total'>合计: ¥{cart.reduce((p, e) => p + e.price / 100, 0).toFixed(2)}</Text>
          <Text className='settlement' style={cart.length < 1 ? {
            color: '#AAA', backgroundColor: '#DDD'
          } : {
            color: '#FFF', backgroundColor: '#FF0000',
          }}>结算</Text>
        </View>
      </View>
    )
  }
}
