import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import PropTypes from 'prop-types'

interface IHistoryList {
  list: string[]
  handleDelete(value: string): void
  handleClick(value: string): void
}

export default function HistoryList(props: IHistoryList) {
  const { list, handleClick, handleDelete } = props

  return (
    <>
      <Typography gutterBottom variant="body1" component="div">
        История поиска:
      </Typography>
      <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
        {list.map(value => {
          return (
            <ListItem
              key={value}
              secondaryAction={
                <IconButton edge="end" aria-label="comments" onClick={() => handleDelete(value)}>
                  <DeleteIcon />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton onClick={() => handleClick(value)} dense>
                <ListItemText id={value} primary={value} />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </>
  )
}

HistoryList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string.isRequired),
  handleDelete: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
}
