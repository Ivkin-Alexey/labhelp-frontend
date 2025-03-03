import { Box, Stack, Theme, Typography, useMediaQuery } from '@mui/material'
import './style.css'

import ckpLogo from '../../images/ckp-logo.png'
import companyLogo from '../../images/company-logo.png'
import React from 'react'

export default function Logo() {

const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

function renderLogoGroup() {
  if(!isMobile) {
    return (
      <Stack 
      direction="row" 
      alignItems="center" 
      justifyContent="space-between"
      sx={{ width: '100%' }}
    >
  <Box className="logo_ckp" >
  <img 
  src={ckpLogo} 
  alt="#" 
  onClick={(e) => {
    e.preventDefault();
    window.open("https://spmi.ru/node/18810", "_blank");
  }}
  style={{ 
    width: 'auto',
    height: '45px',
    cursor: "pointer"
  }}
/></Box>
      
      <Stack 
        direction="row" 
        spacing={2} 
        className="logo_company"
        sx={{
          flex: 4, // Основное пространство для центрального блока
          alignItems: 'center',
          mx: 2 // Отступы по бокам
        }}
      >
  <Typography 
    className="title" 
    sx={{
      display: { xs: 'none', sm: 'block' },
      flex: 1, // Занимает равное пространство
      textAlign: 'right', // Выравнивание текста по правому краю
      pr: 2 // Отступ справа для визуального разделения
    }}
  >
    САНКТ-ПЕТЕРБУРГСКИЙ ГОРНЫЙ УНИВЕРСИТЕТ
  </Typography>

  <img 
    src={companyLogo} 
    alt="#" 
    className="logo" 
    style={{ flexShrink: 0 }} // Запрет на сжатие изображения
  />

  <Typography 
    className="title" 
    sx={{
      display: { xs: 'none', sm: 'block' },
      flex: 1, // Занимает равное пространство
      textAlign: 'left', // Выравнивание текста по левому краю
      pl: 2 // Отступ слева для визуального разделения
    }}
  >
    SAINT-PETERSBURG MINING UNIVERSITY
  </Typography>
  </Stack>

<div 
  className="logo_ckp" 
  style={{ flex: 1, maxWidth: '100%' }}
/>
</Stack>
      )
  } else {
    return (
      <Stack direction="row" spacing={2} className="logo_company" sx={{alignItems: "baseline"}}>
        <img src={companyLogo} alt="#" className="logo" style={{height: "40px"}}/>
        <img src={ckpLogo} alt="#" className="logo_ckp" style={{height: "35px", width: "auto"}}/>
  </Stack>)
  }
}

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        bgcolor: 'white',
        // bgcolor: 'primary.main',
        // '&:hover': {
        //   bgcolor: 'primary.dark',
        // },
      }}
    >
      {renderLogoGroup()}
    </Box>
  )
}
