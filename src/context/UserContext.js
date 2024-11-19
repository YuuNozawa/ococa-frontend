import React from 'react';
import axiosInstance from '../axios/axiosInstance';

export const UserContext = React.createContext();
export class UserProvider extends React.Component {
    constructor(props) {
        super(props);
        this.getUsers = (userId) => {
            //User情報を取得
            return axiosInstance.get(`/api/user/${userId}/all`).then(res => {
                // ログインユーザ要素取得
                const loginIdx = res.data.findIndex(user => user.userId === userId);
                const loginUser = res.data.slice( loginIdx );
                // this.setState({targetUser: loginUser[0]});
                // ログインユーザ要素を削除、先頭に挿入
                res.data.splice( loginIdx, 1);
                res.data.unshift( loginUser[0] );
                this.setState({users: res.data});
                return res.data; // Promise チェーンを継続
            }).catch((error) => {
                console.error("ユーザ情報取得失敗");
                console.error(error);
            });
        };
        this.setTargetEmo = (emotionId) => {
            this.setState({targetEmo: emotionId});
        };
        this.state= {
            users: null,
            // targetUser: null,
            targetEmo: null,
            // handleAvatarChange: this.handleAvatarChange,
            getUsers: this.getUsers,
            setTargetEmo: this.setTargetEmo
        };
    }
    render(){
        return(
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}