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
    <>
    <img src={ckpLogo} alt="#" className="logo_ckp" />
      <Stack direction="row" spacing={2} className="logo_company">
        <Typography className="title" sx={{display: {xs: 'none', sm: 'block' }}}>САНКТ-ПЕТЕРБУРГСКИЙ ГОРНЫЙ УНИВЕРСИТЕТ</Typography>
        <img src={companyLogo} alt="#" className="logo" />
        <Typography className="title" sx={{display: { xs: 'none', sm: 'block' }}}>SAINT-PETERSBURG MINING UNIVERSITY</Typography>
      </Stack>
      <div className="logo_ckp"></div>
      </>
      )
  } else {
    return (
      <Stack direction="row" spacing={2} className="logo_company" sx={{alignItems: "baseline"}}>
        <img src={companyLogo} alt="#" className="logo" />
        <img src={ckpLogo} alt="#" className="logo_ckp" />
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
