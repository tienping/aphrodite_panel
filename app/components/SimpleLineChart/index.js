/**
*
* SimpleLineChart
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

function SimpleLineChart(props) {
    const data = props.data[props.config.virtual[0]];
    if (!data) {
        return (
            <div className="SimpleLineChart-loading">
                <Loading />
            </div>
        );
    }

    let max = Math.max(...data.map((o) => o.total));
    let min = Math.min(...data.map((o) => o.total));
    const roundOffBase = 10 ** Math.ceil(max.toString().split('.')[0].length / 2, 10);
    max = Math.ceil(max / roundOffBase) * roundOffBase;
    min = Math.floor(min / roundOffBase) * roundOffBase;

    return (
        <ResponsiveContainer width="99%" height={320}>
            <LineChart data={data}>
                <XAxis dataKey={props.config.params.xAxisKey} />
                <YAxis domain={[min - (3 * roundOffBase), max + (3 * roundOffBase)]} />
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

SimpleLineChart.propTypes = {

};

export default SimpleLineChart;
