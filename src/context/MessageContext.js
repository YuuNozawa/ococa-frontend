import React from 'react';

export const MessageContext = React.createContext();
export class MessageProvider extends React.Component {
    constructor(props) {
        super(props);
        this.handleMsg = (id) => {
            this.setState((prevState) => {
                return ({
                    msgOpen: !prevState.msgOpen,
                    msgId: id
                });
            });
        }
        this.state= {
            msgOpen: false,
            msgId: null,
            handleMsg: this.handleMsg,
        };
    }
    render(){
        return(
            <MessageContext.Provider value={this.state}>
                {this.props.children}
            </MessageContext.Provider>
        )
    }
}