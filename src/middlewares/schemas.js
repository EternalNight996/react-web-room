// 工具
import { schema } from 'normalizr'

const history = new schema.Entity('histories', {}, {idAttribute: 'id'})
const room = new schema.Entity('rooms', {histories: new schema.Array(history)}, {idAttribute: 'id'})
const mySchema = {
  history,
  historyArray: new schema.Array(history),
  room,
  roomArray: new schema.Array(room),
}
export default mySchema
