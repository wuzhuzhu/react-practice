import React, { PureComponent } from 'react'
import axios from 'axios'
import { useAsync } from 'react-use'
import { map } from 'lodash'
import { connect } from 'dva'
import { List } from 'antd-mobile'

// 使用了react-use的hook。

const fn = async () => {
  return axios.get('http://localhost:3000/api/posts')
}

const { Item } = List
const { Brief } = Item

function PostList({ selected }) {
  const { loading, value } = useAsync(fn)
  return <div>
    <h2>{selected}</h2>
    <List renderHeader = {() => '帖子列表'}>
      {
        loading ?
          <p>载入中..</p> :
          value.data.map(item => <Item extra={item.author}>{item.title}</Item>)
      }
    </List>
  </div>
}

function mapState(state) {
  return {
    selected: state.posts.selected
  }
}


export default connect(mapState)(PostList)
