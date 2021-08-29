/* ************************************************ */
/*File Name: Messages.jsx
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年07月07日 星期三 22时48分09秒
*/

// 其他组件
import * as React from 'react'
import {
  List, message, Avatar, Spin, Space, Button,
  Drawer, Menu,
} from 'antd'
// 监听
import {Controls} from '../../utils/eventListeners.js'
// 工具与中间件
import reqwest from 'reqwest'
import {getMoment} from '../../utils/timer.js'
//icon 图标
import {
  LeftOutlined, RightOutlined, UserOutlined
} from '@ant-design/icons'
// 虚拟组件
import InfiniteScroll from 'react-infinite-scroller'
// 布局
import Content from '../../containers/layout/Content.js'
// CSS样式
import '../../css/chat/UserItem.css';
const styles = {
  loadingContainer: "loading-container-message",
  idContent: 'content-message-id',
  siderContainer: 'sider-menu-user-chat',
  menuItem: 'sider-menu-item-chat',
}

const fakeDataUrl = 'https://randomuser.me/api/?results=10&inc=name,gender,email,nat&noinfo'
export default class UserItem extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
      loading: false,
      hasMore: true,
      initState: true,
      visible: false
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
  showDrawer = () => {
    this.setState({visible: true})
  }
  onClose = () => {
    this.setState({visible: false})
  }

  render() {
    const {data, loading, hasMore} = this.state
    const {language, height, width, theme} = this.props

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
		      renderItem={renderItem}
		    >

		      {loading && hasMore && (
		        <div className={styles.loadingContainer}>
		          <Spin spinning={true} delay={500} size="large"/>
		        </div>
		      )}
		    </List>
		  </InfiniteScroll>
		)

		const renderItem = (item, index) =>(
      <List.Item key={index} style={{padding: '0'}}
         className={styles.menuItem}
      >
        <Button
          key={index}
          style={{
            width: '100%',
            minHeight: '40px',
            background: 'none',
            color: theme==='light' ? 'var(--colorLightDark)' : 'var(--colorLightDark)',
            borderColor: theme==='dark' ? 'var(--colorDarkBlue)' : 'var(--colorGrey)',
            textAlign: 'center',
          }}
          onClick={(e)=>{console.log(e)}}
        >
          <List.Item.Meta
            avatar={<Avatar icon={<UserOutlined />}/>}
            title={<span>{item.name['first']}</span>}
          />
        </Button>
      </List.Item>

		)

    return (
      (width !== '100%')
        ?
      <div>
        <Content centered margin="0 0 1px 0"
          height="60px" lineHeight="20px" overflowY="hidden"
        >
          <h2><b>房间信息</b></h2>
          <div style={{float: 'right'}}>
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
          <Content Ref={this.scrollRef}
            height="75%"
            id='content-message-id'
            padding='0'
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
      </div>
        :
      <div>
        <Button onClick={this.state.visible ? this.onClose
            : this.showDrawer
          } icon={!this.state.visible
            ? <LeftOutlined />
            : <RightOutlined />}
          style={{position: 'fixed',top: '40%',
              right:!this.state.visible ? '0' : '50%',
              zIndex:'1005', width:'15px', height:'120px',
          }}
          type='primary'
        />
        <Drawer
          width="50%"
          height="100%"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          key="right"
          getContainer={false}
          mask={false}
        >
          <Content position='absolute' padding='0'
              top='0' left='0' width='100%'>
            <Content centered margin="0 0 1px 0"
              height="60px" lineHeight="20px" overflowY="hidden"
            >
              <h2><b>房间信息</b></h2>
              <div style={{float: 'right'}}>
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
              <Content Ref={this.scrollRef}
                height="75%"
                padding='0'
                id={styles.idContent}
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
          </Content>
        </Drawer>
      </div>
    )
  }
}
