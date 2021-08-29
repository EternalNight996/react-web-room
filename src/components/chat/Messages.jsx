/* ************************************************ */
/*File Name: Messages.jsx
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年07月07日 星期三 22时48分09秒
*/

// 其他组件
import * as React from 'react'
import { List, message, Avatar, Spin, Space, Button} from 'antd'
// 监听
import {Controls} from '../../utils/eventListeners.js'
// 工具与中间件
import reqwest from 'reqwest'
import {getMoment} from '../../utils/timer.js'
// 虚拟组件
import InfiniteScroll from 'react-infinite-scroller'
// 布局
import Content from '../../containers/layout/Content.js'
// CSS样式
import '../../css/chat/Messages.css';

const fakeDataUrl = 'https://randomuser.me/api/?results=10&inc=name,gender,email,nat&noinfo'
export default class Messages extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
      loading: false,
      hasMore: true,
      initState: true,
    }
    this.scrollRef = React.createRef()
  }

  async initState() {
    while (this.state.initState) {
      await new Promise((resolve) => {
        window.setTimeout(()=>{
          resolve()
        }, Math.round(300*Math.random()))
      })
      if (this.state.data.length >0) {
        var current = this.scrollRef.current
        if (current && typeof current.scrollTop === 'number') {
          current.scrollTop = 9999
        }
        this.clearInitState()
      }
    }
  }clearInitState(){this.setState({initState: false})}

  componentDidMount() {
    this.fetchData(res => {
      this.setState({
        data: res.results,
      })
    })
    this.initState()
  }
  componentWillUnmount() {
    this.clearInitState()
  }

  fetchData = callback => {
    reqwest({
      url: fakeDataUrl,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: res => {
        callback(res)
      },
    })
  }

  handleInfiniteOnLoad = () => {
    let { data } = this.state
    this.setState({loading: true})
    if (data.length > 100) {
      message.warning('Infinite List loaded all')
      this.setState({
        hasMore: false,
        loading: false,
      })
      return
    }
    this.fetchData(res => {
      data = data.concat(res.results)
      this.setState({
        data,
        loading: false,
      })
    })
  }

  render() {
    const {data, loading, hasMore} = this.state
    const {language, height, width} = this.props

    const infiniteScroll = () => (
		  <InfiniteScroll
		    initialLoad={false}
		    pageStart={0}
		    loadMore={this.handleInfiniteOnLoad}
		    hasMore={!loading && hasMore}
		    useWindow={false}
		    isReverse={true}
		    threshold={300}
		    useCapture={false}
		  >
		    <List
		      dataSource={data}
          itemLayout="vertical"/*"horizontal"*/
          split={false}
          /*grid={{column:0, gutter:0, md:2, lg:2, xl:2, xxl:2}}*/
          footer={
            <div>
              <b></b> footer part
            </div>
          }
          pagination={{
            onChange: page=>{
              console.log(page)
            },
            pageSize: 10,
          }}
		      renderItem={renderItem}
		    >
		      {loading && hasMore && (
		        <div className="loading-container-message">
		          <Spin spinning={true} delay={500} size="large"/>
		        </div>
		      )}
		    </List>
		  </InfiniteScroll>
		)

		const renderItem = (item) =>(
		  <List.Item
        key={item.id}
        actions={[
          <span>{item.id}</span>,
          <span>{item.id}</span>,
          <span>{item.id}</span>,
        ]}
        extra={
          <img
            width={272}
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        }
      >
		    <List.Item.Meta
		      avatar={
		        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
		      }
		      title={
            <Space>
              <a href="https://ant.design">
		            <label><b>{item.name.last}</b></label>
		          </a>
    		      <span style={{color:'var(--colorOpacityGrey)'}}>
		            {getMoment(new Date().getTime()+1000*10,
                  language['Date'])}
		          </span>
            </Space>
		      }
		      description={<span>{item.email}</span>}

		    />
      <p>123213213u219832u1938u2193821u3921321983u21983u21321i3j12oi3j21ij3219
		      Contentj2oi13j21oij3213ijo21j3o21ij321oij321oi3j21o3ij213oi21j312oij31oi23j1o3j12o3i
          Content</p>
		  </List.Item>
		)

    return (
      <>
        <Content centered margin="0 0 1px 0"
          height="60px" lineHeight="20px" overflowY="hidden"
        >
          <h2><b>消息窗口</b></h2>
          <div style={{float: 'right', userSelect: 'text'}}>
            <span style={{fontSize: '10px'
              }}>已加载消息-{data.length}
            </span>
            <span> | </span>
            <span style={{fontSize:'10px'}}>
              历史消息-{2000}
            </span>
          </div>
        </Content>
        <div style={{height: height ? height :'400px'}}>
          <Content Ref={this.scrollRef} onClick={()=>console.log(1)}
            height="75%"
            id='content-message-id'
          >
            {infiniteScroll()}
          </Content>
            <Content
              height="25%"
              padding="0 15px 0 15px"
              overflowX="hidden"
              margin="1px 0 0 0"
            >
          </Content>
        </div>
      </>
    )
  }
}
