import React from 'react'
import { Container, Typography, IconButton, Box, useMediaQuery, Theme } from '@mui/material'
import LanguageIcon from '@mui/icons-material/Language';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import { YMaps, Map, ZoomControl, Placemark } from '@pbe/react-yandex-maps';

export default function ContactsPage() {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: '80vw',
        flex: '1 0 auto',
      }}
    >
      <Typography variant="h5" sx={{margin: isMobile ? '20px 0' : '20px 0 0' }}>Контакты</Typography>
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '55% 45%',
        gridTemplateRows: isMobile ? '1fr 1fr' : 'auto',
        height: '100%',
        alignItems: 'center',
        paddingBottom: '36px',
        marginTop: "10px"
        // gap: '20px'
      }}>
        <Box sx={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
          <Typography variant="body1" sx={{fontWeight: 'bold'}}>Свяжитесь с нами в случае необходимости
            применения лабораторного
            оборудования в образовательном процессе или при проведении научных
            исследований</Typography>
          <Typography variant="body2">Санкт-Петербургский горный университет императрицы Екатерины II
            Научно-образовательный центр коллективного пользования высокотехнологичным оборудованием «Центр
            коллективного пользования»
          </Typography>
          <Typography variant="body2">Адрес: 199106, Санкт-Петербург, Васильевский остров, 21 линия, д.2.
          </Typography>
          <Typography variant="body2">Телефон: +7 (812) 328-84-36</Typography>
          <div>
          <IconButton 
              aria-label="Ссылка на сайт"
              title="Ссылка на сайт"
              onClick={(e) => {
                e.preventDefault();
                window.open("https://spmi.ru/node/18810", "_blank");
              }}
            >
              <LanguageIcon/>
            </IconButton>

            <IconButton 
              aria-label="Номер телефона"
              title="Номер телефона"
              onClick={(e) => {
                e.preventDefault();
                window.open("tel:+7 (812) 328-84-36", "_blank");
              }}
            >
              <LocalPhoneIcon/>
            </IconButton>
            <IconButton
              aria-label="Почта" title="Почта"               onClick={(e) => {
                e.preventDefault();
                window.open("mailto:ckp@spmi.ru?subject=Добрый день! Прошу Вас помочь с выбором оборудования", "_blank");
              }}>
              <EmailIcon/>
            </IconButton>
          </div>
        </Box>
        <Box sx={{height: isMobile ? '100%' : '80%'}}>
          <YMaps>
            <Map defaultState={{center: [59.930161, 30.268519], zoom: 16}} width={"100%"} height={"50vh"}>
              <ZoomControl />
              <Placemark geometry={[59.930161, 30.268519]}/>
            </Map>
          </YMaps>
        </Box>
      </Box>

    </Container>

  );
}
