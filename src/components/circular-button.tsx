import { Box, Button, CircularProgress, Fab } from "@mui/material";
import { green } from "@mui/material/colors";

interface IProps {
    isLoading: boolean
    isSuccess: boolean
    children: string
    handleClick: () => void
}

function CircularButton(props: IProps) {

    const {isLoading, isSuccess, children, handleClick} = props

    const buttonSx = {
        ...(isSuccess && {
          bgcolor: green[500],
          '&:hover': {
            bgcolor: green[700],
          },
        }),
      };

    return(<Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ m: 1, position: 'relative' }}>
        <Button
          variant="contained"
          sx={buttonSx}
          disabled={isLoading}
          onClick={handleClick}
        >
          {children}
        </Button>
        {isLoading && (
          <CircularProgress
            size={24}
            sx={{
              color: green[500],
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Box>
    </Box>)
}

export default CircularButton