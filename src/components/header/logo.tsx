import { Box, Stack, Typography } from '@mui/material'
import './style.css'

import ckpLogo from '../../images/ckp-logo.png'
import companyLogo from '../../images/company-logo.png'

export default function Logo() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
        height: 70,
        bgcolor: "white",
        // bgcolor: 'primary.main',
        // '&:hover': {
        //   bgcolor: 'primary.dark',
        // },
      }}
    >
      <img src={ckpLogo} alt="#" className='logo_ckp'/>
      <Stack direction="row" spacing={2} className='logo_company'>
        <Typography className="title">САНКТ-ПЕТЕРБУРГСКИЙ ГОРНЫЙ УНИВЕРСИТЕТ</Typography>
        <img src={companyLogo} alt="#" className='logo'/>
        <Typography className="title">SAINT-PETERSBURG MINING UNIVERSITY</Typography>
      </Stack>
      <div className='logo_ckp'></div>
    </Box>
  )
}
