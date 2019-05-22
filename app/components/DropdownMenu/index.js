/**
*
* DropdownMenu
*
*/

import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';

import './style.scss';

class DropdownMenu extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        open: false,
    };

    handleToggle = () => {
        this.setState((state) => ({ open: !state.open }));
    };

    handleClose = (event) => {
        if (this.anchorEl.contains(event.target)) {
            return;
        }

        this.setState({ open: false });
    };

    render() {
        const { data, className } = this.props;
        return (
            <div>
                <Button
                    buttonRef={(node) => {
                        this.anchorEl = node;
                    }}
                    aria-owns={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    className={className}
                    onClick={this.handleToggle}
                >
                    {data.label}
                </Button>
                <Popper open={this.state.open} anchorEl={this.anchorEl} transition={true} disablePortal={true}>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            id="menu-list-grow"
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={this.handleClose}>
                                    <MenuList>
                                        {
                                            data.children.map((child, index) => (
                                                <MenuItem
                                                    key={index}
                                                    onClick={({ ...params }) => {
                                                        this.handleClose({ ...params });
                                                        child.onClick({ ...params });
                                                    }}
                                                >{child.label}</MenuItem>
                                            ))
                                        }
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        );
    }
}

DropdownMenu.propTypes = {

};

export default DropdownMenu;
