/**
*
* SimpleListing
*
*/

import React from 'react';
import Loading from 'components/Loading';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import './style.scss';

function SimpleListing(props) {
    const data = props.data;
    if (!data) {
        return (
            <div className="simpleListing-loading">
                <Loading />
            </div>
        );
    }

    const objArr = Object.keys(data);

    return (
        <List className="simpleListing-list-element p-2">
            {objArr.map((key, index) => (
                <div key={index}>
                    <ListItem className="simpleListing-item px-2 py-1" style={{ displat: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h5">{key.toUpperCase()}</Typography>
                        <Typography variant="h5">{data[key]}</Typography>
                    </ListItem>
                    {objArr.length > 1 ? <Divider /> : null}
                </div>
            ))}
        </List>
    );
}

SimpleListing.propTypes = {

};

export default SimpleListing;
