import withRouter from 'umi/withRouter'
import { connect } from 'dva'

function Layout({ children }) {
  return (<div>
    {children}
  </div>)
}

export default withRouter(connect()(Layout));
