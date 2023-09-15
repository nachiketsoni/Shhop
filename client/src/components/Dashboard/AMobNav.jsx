import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from 'react-router-dom';
import CategoryIcon from '@mui/icons-material/Category';
import TocIcon from '@mui/icons-material/Toc';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

export default function SwipeableTemporaryDrawer() {
  const [state, setState] = React.useState({
    Menu: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['dashboard', 'products', 'orders', 'users'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <Link to={`/admin/dashboard/${(text!=='dashboard')?text:''}`}
                  className="linkStyle">
             <ListItemButton>
              <ListItemIcon>
                {text==='dashboard' 
                ?<DashboardIcon/>
                :text==='products'
                ?<CategoryIcon/>
                :text==='orders'
                ?<TocIcon/>
                :<SupervisedUserCircleIcon/>
                }
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
            </Link>
           
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div id="AdminMobNav">
      {['Menu'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <SwipeableDrawer
            anchor={'left'}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
