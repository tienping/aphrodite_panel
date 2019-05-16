/**
*
* SimpleChart
*
*/

import React from 'react';
import Loading from 'components/Loading';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';

import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';

import './style.scss';

function SimpleChart(props) {
    if (!props.data) {
        return (
            <div className="simpleChart-loading">
                <Loading />
            </div>
        );
    }

    const data = props.data[props.config.virtual[0]];

    const max = Math.max.apply(Math, data.map((o) => o.total));
    const min = Math.min.apply(Math, data.map((o) => o.total));

    return (
        <ResponsiveContainer width="99%" height={320}>
            <LineChart data={data}>
                <XAxis dataKey={props.config.params.xAxisKey} />
                <YAxis domain={[min - (min * 0.1), max * 1.1]} />
                <CartesianGrid
                    vertical={props.config.params.vertical}
                    strokeDasharray="3 3"
                />
                <Tooltip />
                <Legend />
                {
                    props.config.params.lines.map((line, index) => (
                        <Line
                            key={index}
                            type={line.type || 'monotone'}
                            dataKey={line.dataKey}
                            stroke={line.stroke || '#000000'}
                            activeDot={line.activeDot}
                        />
                    ))
                }
            </LineChart>
        </ResponsiveContainer>
    );
}

SimpleChart.propTypes = {

};

export default SimpleChart;
