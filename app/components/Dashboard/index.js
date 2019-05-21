/**
*
* Dashboard
*
*/

import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
import SimpleLineChart from 'components/SimpleLineChart';
import SimpleTable from 'components/SimpleTable';
import SimpleListing from 'components/SimpleListing';
import ButtonList from 'components/ButtonList';
import { NotificationManager } from 'react-notifications';

import globalScope from 'globalScope';
import { dataChecking, devlog } from 'globalUtils';

import './style.scss';

class Dashboard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        data: null,
    };

    componentDidMount = () => {
        const virtualGroup = [];
        this.props.setting.forEach((config) => {
            config.virtual.forEach((virtual) => {
                virtualGroup.push(virtual);
            });
        });

        devlog('Finding dashboard data...');
        globalScope.feather.query('merchant', 'aphrodite').get(3, { query: { virtual: virtualGroup } })
            .then((response) => {
                devlog('Find dashboard data success', { response });
                this.setState({
                    data: dataChecking(response, 'result'),
                });
            })
            .catch((response) => {
                NotificationManager.error(JSON.stringify(response), 'Error!! (click to dismiss)', 5000);
                devlog('Find dashboard data failed', { response });
            });

        this.socketChannel = globalScope.feather.subscribe('merchant', 'aphrodite').onChanged((response2) => {
            devlog('on subscribe update', response2);
            this.setState({
                data: response2,
            });
        });
    }

    renderContent = (config) => {
        if (config.type === 'linegraph') {
            return (
                <SimpleLineChart
                    config={config}
                    data={this.state.data}
                />
            );
        } else if (config.type === 'table') {
            return (
                <SimpleTable
                    config={config || []}
                    data={this.state.data}
                />
            );
        } else if (config.type === 'listing') {
            return (
                <SimpleListing
                    config={config || []}
                    data={this.state.data}
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
                <CardContent>
                    <Typography variant="h4" color="textPrimary" gutterBottom={true}>
                        {config.title}
                    </Typography>
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
