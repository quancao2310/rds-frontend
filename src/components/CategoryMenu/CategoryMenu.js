import React, { useEffect, useState } from 'react'
import styles from './CategoryMenu.styles'
import { Link } from 'react-router-dom';
import { Typography, MenuList, MenuItem, Popper, Paper, Grow, ClickAwayListener, Box } from '@mui/material';
import { icons } from '../../constant';
import { getCategoriesAPI } from '../../api/categoryApi'

const leftCategory = ["Đồ ăn, nguyên liệu", "Gia vị"];
const rightCategory = ["Đồ uống", "Cao và Tinh dầu"];
const CategoryMenu = ({ anchorRef, clickRef, isDrawer, onClick }) => {
    const [open, setOpen] = useState(false);
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        getCategoriesAPI().then((response) =>{
            setCategoryList(response.data);
        });
    }, []);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    clickRef.current = handleToggle // assign button onclick of parent component to handleToggle function

    const renderCategory = (list) => {
        console.log('list: ', list);
        let res = list.map(element => {
            let urlName = element.name;
            //let urlName = element.replace(" ", "");

            return (
                <Link to={`/category/${urlName}`} style={styles.menuLink} onClick={onClick}>
                    <MenuItem onClick={handleClose} sx={isDrawer ? styles.menuItemDrawer : styles.menuItem}>
                        <Typography sx={styles.menuText}>{element.name}</Typography>
                    </MenuItem>
                </Link>
            )
        });

        return res;
    }
    return (
        <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
            style={styles.wrapper}
        >
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{
                        transformOrigin:
                            placement === 'bottom-start' ? 'left top' : 'left bottom',
                    }}
                >
                    <Paper sx={styles.menu}>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList
                                autoFocusItem={open}
                                id="composition-menu"
                                aria-labelledby="composition-button"
                            >
                                <Box sx={{ display: isDrawer ? 'block' : 'flex' }}>
                                    <div sx={{ mr: isDrawer ? 0 : 5 }}>
                                        {renderCategory(categoryList)}
                                    </div>
                                </Box>
                            </MenuList>

                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
    )
}

export default CategoryMenu
