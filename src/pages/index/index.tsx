import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

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

  static options = {
    addGlobalClass: true,
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onReachBottom() {
    console.log('onReachBottom');
  }

  render () {
    return (
      <View className='index'>
        <View className='goods_list'>
          {goods.map((e, i) => <View key={e.id} className='good'>
            <Image className='good_image' src={e.images[0]} />
            <View className='good_info'>
              <Text className='good_info_name text_line_2'>{e.name}</Text>
              <View className='good_info_bottom'>
                <Text className='good_info_bottom_price'>¥{(e.price / 100).toFixed(2)}</Text>
                <View className='shop-car' />
              </View>
            </View>
          </View>)}
        </View>
      </View>
    )
  }
}
