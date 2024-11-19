import React from 'react';
import { withRouter, withAppData } from '../../context/props'; 
import AppConst from './AppConst';
import { signoutRedirectCallback } from '../../service/AuthService';

class LogoutCallback extends React.Component {
    constructor(props) {
      super(props);
      // React.StrictModeによって複数回signoutRedirectCallbackが呼ばれるエラーを回避するため
      this.callbackProcessed = false;
  }
  
    async componentDidMount() {
      // 既にコールバックが処理されている場合は早期リターン(React.StrictMode対策)
      if (this.callbackProcessed) { return; }
      try {
        this.callbackProcessed = true;
        await signoutRedirectCallback();
        this.props.router.navigate(`/${AppConst.LOGIN.getLabel()}`);
  
      } catch(error) {
        console.error('認証エラー:', error);
      }
    }
  
    render() {
        return <div>Logging out...</div>;
    }
  }
  
  const ComponentWithAppData = withAppData(LogoutCallback);
  export default withRouter(ComponentWithAppData);
