/**
*
* Dashboard
*
*/

import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import SimpleLineGraph from 'components/SimpleChart';
import SimpleTable from 'components/SimpleTable';

import './style.scss';

class Dashboard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    renderContent = (config) => {
        if (config.type === 'linegraph') {
            return (
                <SimpleLineGraph
                    data={config.data || []}
                />
            );
        } else if (config.type === 'table') {
            return (
                <SimpleTable
                    data={config.data || []}
                    config={config.config || []}
                />
            );
        }

        return (
            <Typography variant="p">
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
                    <hr />
                    {this.renderContent(config)}
                </CardContent>
            </Card>
        </div>
    )

    render() {
        return (
            <div className="dashboard-container">
                {
                    this.props.setting.map((config, index) => this.renderComponents(config, index))
                }
            </div>
        );
    }
}

Dashboard.propTypes = {

};

export default Dashboard;
