import { Box, CircularProgress } from '@mui/material'

export default function Circular() {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <CircularProgress size="60px" />
    </Box>
  )
}
