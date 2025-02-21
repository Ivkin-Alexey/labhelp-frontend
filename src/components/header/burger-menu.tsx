import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { Box, IconButton, Drawer, List, ListItem, Typography } from '@mui/material';
import { useState } from 'react';

import type { Route } from '../../models/routes';
import { Navigate, useNavigate } from 'react-router-dom';

interface IBurgerMenu {
  handleCloseNavMenu: (path: string) => void;
  handleOpenNavMenu: (event: React.MouseEvent<HTMLElement>) => void;
  anchorElNav: null | HTMLElement
  list: Route[];
}

export default function BurgerMenu(props: IBurgerMenu) {
  const { handleCloseNavMenu, handleOpenNavMenu, list } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate()

  const handleGoBack = () => {
    handleCloseMenu()
    navigate(-1)
  };

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
        <ListItem
            button
            onClick={handleGoBack}
            sx={{
              borderBottom: '1px solid #e0e0e0', 
            }}
          >
            <ArrowBackIosIcon />
            <Typography textAlign="left" variant="h5">
              Назад
            </Typography>
          </ListItem>
          {list.map((page) => (
            <ListItem
              button
              key={page.title}
              onClick={() => {
                handleCloseNavMenu(page.path)
                handleCloseMenu()
              }}
            >
              <Typography textAlign="left" variant='h5'>{page.title}</Typography>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}