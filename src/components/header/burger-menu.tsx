import MenuIcon from '@mui/icons-material/Menu';
import { Box, IconButton, Drawer, List, ListItem, Typography } from '@mui/material';
import { useState } from 'react';

import type { Route } from '../../models/routes';

interface IBurgerMenu {
  handleCloseNavMenu: (path: string) => void;
  handleOpenNavMenu: (event: React.MouseEvent<HTMLElement>) => void;
  anchorElNav: null | HTMLElement
  list: Route[];
}

export default function BurgerMenu(props: IBurgerMenu) {
  const { handleCloseNavMenu, handleOpenNavMenu, list } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    handleOpenNavMenu(event)
    setIsMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenMenu}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor="left"
        open={isMenuOpen}
        onClose={handleCloseMenu}
        sx={{
          width: '100%',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: '100%',
            boxSizing: 'border-box',
          },
        }}
      >
        <List>
          {list.map((page) => (
            <ListItem
              button
              key={page.title}
              onClick={() => {
                handleCloseNavMenu(page.path)
                handleCloseMenu()
              }}
            >
              <Typography textAlign="center">{page.title}</Typography>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}