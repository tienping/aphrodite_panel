/**
*
* Dashboard
*
*/

import React from 'react';
import {
    Typography,
    Card,
    CardHeader,
    CardContent,
} from '@material-ui/core';
// import Divider from '@material-ui/core/Divider';
import SimpleLineChart from 'components/SimpleLineChart';
import SimpleTable from 'components/SimpleTable';
import SimpleListing from 'components/SimpleListing';
import ButtonList from 'components/ButtonList';
import { NotificationManager } from 'react-notifications';

import { dataChecking } from 'globalUtils';
import * as Feather from 'featherUtils';

import './style.scss';

class Dashboard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {};

    componentDidMount = () => {
        this.props.setting.forEach((config) => {
            Feather.action({
                dataSet: 'dashboard_data',
                service: 'merchant',
                socket: 'aphrodite',
                query: { type: config.action },
                modelId: 3,
                successCallback: (response) => {
                    this.setState({
                        [`data_${config.key}`]: dataChecking(response),
                    });
                },
                failedCallback: (response) => {
                    NotificationManager.error(JSON.stringify(response), 'Error!! (click to dismiss)', 5000);
                },
                mockData: config.mockData,
                mockDataPath: [],
            });
        });
    }

    renderContent = (config) => {
        if (config.type === 'linegraph') {
            return (
                <SimpleLineChart
                    config={config}
                    data={this.state[`data_${config.key}`]}
                />
            );
        } else if (config.type === 'table') {
            return (
                <SimpleTable
                    config={config || []}
                    data={this.state[`data_${config.key}`]}
                />
            );
        } else if (config.type === 'listing') {
            return (
                <SimpleListing
                    config={config || []}
                    data={this.state[`data_${config.key}`]}
                />
            );
        } else if (config.type === 'buttonlist') {
            return (
                <ButtonList
                    config={config.config || []}
                />
            );
        }

        return (
            <Typography variant="body1">
                {config.value}
            </Typography>
        );
    }

    renderComponents = (config, index) => (
        <div className={`dashboard-component size-${config.size || 'half'}`} key={index}>
            <Card className="dashboard-component-card" >
                <CardHeader
                    avatar={config.iconClass ? <i className={`title-icon ${config.iconClass}`} /> : null}
                    title={
                        <Typography variant="h4" color="textPrimary" gutterBottom={true}>
                            {config.title}
                        </Typography>
                    }
                />
                <CardContent>
                    {this.renderContent(config)}
                </CardContent>
            </Card>
        </div>
    )

    render() {
        return (
            <div>
                <div className="dashboard-container">
                    {
                        this.props.setting.map((config, index) => this.renderComponents(config, index))
                    }
                </div>
                <div className="dashboard-footer">
                    {/* <Divider /> */}
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {

};

export default Dashboard;
