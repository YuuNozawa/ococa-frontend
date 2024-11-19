import React from 'react';
import { withRouter, withAppData } from '../../context/props'; 
import AppConst from './AppConst';
import AppLoading  from './AppLoading';
import { signinRedirectCallback } from '../../service/AuthService';

class Callback extends React.Component {
  constructor(props) {
    super(props);
    // React.StrictModeによって複数回signinRedirectCallbackが呼ばれるエラーを回避するため
    this.callbackProcessed = false;
}

  async componentDidMount() {
    // 既にコールバックが処理されている場合は早期リターン(React.StrictMode対策)
    if (this.callbackProcessed) { return; }
    try {
      this.callbackProcessed = true;
      const user = await signinRedirectCallback();
      this.props.appdata.auth.setUser(user.profile.sub);
      await this.props.appdata.user.getUsers(user.profile.sub);
      await this.props.appdata.mood.getMood(user.profile.sub);
      await this.props.appdata.mood.getMoodStatus();

      let from = this.props.router.location?.state?.from.pathname || "/" + AppConst.HOME.getLabel();
      this.props.router.navigate(from, { replace: true });

    } catch(error) {
      console.error('認証エラー:', error);
    }
  }

  render() {
    return (
      <AppLoading />
    );
  }
}

const ComponentWithAppData = withAppData(Callback);
export default withRouter(ComponentWithAppData);
