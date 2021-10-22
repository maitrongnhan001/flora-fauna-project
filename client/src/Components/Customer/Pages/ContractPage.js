import React, { Component } from 'react';
import Contract from '../Contract/Contract';
import Notification from '../Contract/notification/notification';

class ContractPage extends Component {

    constructor (props) {
        super(props);
        this.state = {
            status_notification: 'hide'
        };
    }

    updateStatusNotification = (check) => {
        this.setState({
            status_notification: check
        });
    }

    render() {
        return (
            <>
                <Notification
                    status_notification={this.state.status_notification}
                ></Notification>
                <Contract
                    updateStatusNotification={this.updateStatusNotification}
                ></Contract>
            </>
        );
    }
}

export default ContractPage;