/* ************************************************ */
/*File Name: Bundle.js
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年05月31日 星期一 03时02分11秒
*/
import {PureComponent} from 'react';
export default class Bundle extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mod: null
    };
  }

  componentWillMount() {
    this.load(this.props)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps)
    }
  }
  load(props) {
    this.setState({
      mod: null
    });
    //注意这里，使用Promise对象; mod.default导出默认
    props.load().then((mod) => {
      this.setState({
        mod: mod.default ? mod.default : mod
      });
    });
  }

  render() {
    return this.state.mod ? this.props.children(this.state.mod) : null;
  }
}
