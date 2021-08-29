/* ************************************************ */
/*File Name: pages/main/index.jsx
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年06月20日 星期日 21时53分18秒
*/

// 组件
import {Component} from 'react'
// Icon图标

// 布局
import {List, Space, Divider} from 'antd'
import Content from '../../containers/layout/Content.js'
import ContentLayout from '../../components/layout/ContentLayout.jsx'
// 监听或工具
import {GoBack} from '../../utils/eventListeners.js'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
// 配置
const options = {
  capture: false,
  passive: true,
  once: false
}
class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
      width: '100%',
      height: 500,
      data: [],
    }
    this.onResize = this.onResize.bind(this)
  }

  initData() {
    const width = document.body.clientWidth
    if (width > 768) {
      if (width < 920) {
        this.setState({width: 'var(--MaxWidthSmall)'})
      }else if (width < 1024) {
        this.setState({width: 'var(--MaxWidthMiddle)'})
      }else {
        this.setState({width: 'var(--MaxWidthLarge)'})
      }
    }
  }

  onResize(event) {
    const Width = event.srcElement.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
    const Height = event.srcElement.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
    const {width, height} = this.state
    if (Width !== width) {
      const small = 'var(--MaxWidthSmall)',
        middle = 'var(--MaxWidthMiddle)',
        large = 'var(--MaxWidthLarge)';
      if (Width > 768) {
        if (Width < 920) {
          if (width !== small) {
            this.setState({width: small})
          }
        }else if (Width < 1024) {
          if (width !== middle) {
            this.setState({width: middle})
          }
        }else {
          if (width !== large) {
            this.setState({width: large})
          }
        }
      }else{
        if (Width < 768 && width !== '100%') {
          this.setState({width: '100%'})
        }
      }
    }
  }

  componentWillMount() {
    this.initData()
  }
  componentDidMount() {
    let data1 = [], data2 = [], data = [];
    Array(5).fill().forEach((key,index)=>{
      data1.push({
        key: index+1,
        title: `测试区${index+1}`,
        content: '消灭人类暴政,世界属于三体!消消消灭人类暴政,世界属于三体!灭人类暴政,世界属于三体!灭人类暴政,世界属于三体!',
      })
      data2.push({
        key: index+1,
        title: `测试区${index+1}`,
        content: '消灭人类暴政,世界属于三体!消消消灭人类暴政,世界属于三体!灭人类暴政,世界属于三体!灭人类暴政,世界属于三体!',
      })
    })
    data.push(data1)
    data.push(data2)
    this.setState({data})
    window.addEventListener('resize', this.onResize, options)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize, options)
  }

  render() {
    const {width, height, data} = this.state

    const renderItem = (items, float, margin) => (
      items.map((item, index) => (
        <Content  overflowX="hidden" key={item['key']} margin={margin}
          width={width==='100%' ? width : '49%'} float={float}
        >
          <Divider>
            <h2 style={{fontSize: "30px"}}>{item['title']}</h2>
          </Divider>
          <Space align='center'>
            <p style={{color: '#0a0'}}>{item['content']}</p>
          </Space>
        </Content>
      ))
    )
    return (
      <ContentLayout width={width} limit={false}>
        <GoBack />
        <List
          dataSource={data}
          split={false}
          renderItem={(item)=>renderItem(item,'left', '0 5px 5px 0')}
        />
        <List
          dataSource={data}
          split={false}
          /*grid={{md: 2, lg: 2, xl: 2, xxl: 2, gutter: 2}}*/
          renderItem={(item)=>renderItem(item,'left', '0 5px 5px 0')}
        />
        <ContentLayout width={width} float="left"
          maxWidth="40%" 
        >
          <Content></Content>
          <Content></Content>
          <Content></Content>
          <Content></Content>
        </ContentLayout>
        <ContentLayout width={width} float="right"
          maxWidth="40%"
        >
          <Content></Content>
          <Content></Content>
          <Content></Content>
          <Content></Content>
        </ContentLayout>
      </ContentLayout>
    )
  }
}
export default Main
