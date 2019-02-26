// 由于时间有限，未考虑使用ts 实际生产中，参数较多的组件使用ts会更佳
// 没有webpack 和css module, codepen环境使用classname的情况和生产不太一致
// 生产是inport styles from '...less'或者直接 import 'xxx.less'

function CouponCard({
  currencySymbol = '$',
  amount = 0,
  // 示例中不止有min spend & capped还有看不懂的外文
  // 此处暂时认为卡片内容直接是text传来，业务逻辑较复杂，不在面试题范围内
  description = '暂无描述',
  // 假设已经根据时区转换好时间戳 =》 text
  validThrough,
  validUntil,
  sn,
  // 考虑到扩展性和严谨性，这里涉及了type略有冗余，可以通过有没有sn判断其实
  isTypeSN = false, // 使用了ts的话，此处会设计为type: emum的形式提高扩展性，目前场景需求明确，直接使用bool
  isSmall = true // 同上理
                }) {
  return (<div className="card-wrapper" style={{
    border: '1px solid red',
    width: isSmall ? '300px' : '500px',
    margin: '20px 20px 0',
    padding: '12px',
    color: 'white',
    backgroundColor: 'red',
  }}>
    <div className="card-upper" style={{ display: 'flex', alignItems: 'center' }}>
      <div className="card-upper-left">
        <h1><span>{currencySymbol}</span>{amount}</h1>
        <p>{description}</p>
      </div>
      {!isTypeSN && <div
        onClick={() => alert('您拿到这个优惠券了！')}
        style={{
          padding: '10px',
          backgroundColor:'white',
          color: 'red',
          borderRadius: '5px'
        }}>Get</div>}
    </div>

    {!isSmall && <hr/> }
    <p>{isTypeSN ? sn : `${validThrough} - ${validUntil}`}</p>
  </div>)
}

// 默认优惠券接口数据已经做好两种类型优惠券分组
// 如果没有 也可以用过简单的函数进行数据转换，不在此实现
const dataMulti = {
  click: [
    {
      currencySymbol: '$',
      amount: 120.00,
      description: '此处暂时认为卡片内容直接是text传来，业务逻辑较复杂，不在面试题范围内',
      // 生产中有时区情况 会根据时间戳转换
      validThrough: '2018.08.08',
      validUntil: '2019.08.08',
    }
  ],
  sn: [
    {
      currencySymbol: '$',
      amount: 1000.00,
      description: 'Min. spend $20000',
      validThrough: '2018.08.08',
      validUntil: '2019.08.08',
      sn: 'ASDFKJ31409DFS'
    },
    {
      currencySymbol: '$',
      amount: 200.00,
      description: 'Min. spend $1000',
      validThrough: '2018.08.08',
      validUntil: '2019.08.08',
      sn: 'ASDFKJ31409DFS'
    },
    {
      currencySymbol: '$',
      amount: 50.00,
      description: 'Min. spend $100',
      validThrough: '2018.08.08',
      validUntil: '2019.08.08',
      sn: 'ASDFKJ31409DFS'
    }
  ]
}

const dataSingle1 = {
  sn: [
    {
      currencySymbol: '$',
      amount: 1000.00,
      description: 'Min. spend $20000',
      validThrough: '2018.08.08',
      validUntil: '2019.08.08',
      sn: 'ASDFKJ31409DFS'
    },
  ]
}

const dataSingle2 = {
  click: [
    {
      currencySymbol: '$',
      amount: 120.00,
      description: '这是我看不懂的一段外文描述，大概就是你画多少钱能用？%的优惠券的样子。顺便测试折行文本',
      // 生产中有时区情况 会根据时间戳转换
      validThrough: '2018.08.08',
      validUntil: '2019.08.08',
    }
  ],
}

// 在api约定下，拿到的arr数据即使是空也是[]，但是网络问题等一些情况下也会出现报错，生产中会用get
function CouponCardGroup({ data }) {
  const { sn, click } = data
  // 这里一般用lodash的get取, 做题就少引库了
  const totalLength = sn ? sn.length : 0 + click ? click.length : 0
  const isSmall = totalLength > 1
  return <div>
    <div style={{display: 'flex'}}>{sn && sn.map(card => <CouponCard {...card} isTypeSN isSmall={isSmall} />)}</div>
    <div style={{display: 'flex'}}>{click && click.map(card => <CouponCard isSmall={isSmall} {...card} />)}</div>
    <div>{!(sn || click) && <p>目前您还没有优惠券</p>}</div>
  </div>
}

export default function () {
  return <div>
    <h3>多个的情况</h3>
    <CouponCardGroup data={dataMulti} />
    <h3>单个的情况</h3>
    <CouponCardGroup data={dataSingle1} />
    <h3>单个的情况2</h3>
    <CouponCardGroup data={dataSingle2} />
    <h3>空的情况</h3>
    <CouponCardGroup data={[]} />
  </div>
}
