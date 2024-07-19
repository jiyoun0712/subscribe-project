import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled, { css } from 'styled-components';
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Typography,
  Chip,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,

} from '@mui/material';
import { Box, Stack } from '@mui/system';
import { IconDots, IconEdit, IconPlus, IconTrash, IconMenu } from '@tabler/icons-react';

interface ItemProps {
  $isDragging: boolean;
}

const Item = styled.li<ItemProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 5px;
  margin-bottom: 5px;
  background-color: white;
  border-bottom: 2px solid red;
  ${(props) =>
    props.$isDragging &&
    css`
      background-color: lightgreen;
    `}
`;


interface Team {
  name: string;
  bgcolor: string;
  textcolor: string;
}
interface ToDoProps {
  id: string;
  status: string;
  avatar: string;
  users: string;
  title: string; 
  subtitle: string;
  teams: Team[];
  index: number;
  editing: boolean;
}



const ToDo: React.FC<ToDoProps> = ({ id, title, status, subtitle, avatar, teams, users, index, editing }) => {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);



  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



  const rowContent = (
    <>
          { editing &&                     
              <TableCell>
                <IconButton
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <IconMenu width={18} />
                  
                </IconButton>
              </TableCell>
          }
          <TableCell>
            <Stack direction="row" spacing={2}>
              <Avatar
                src={avatar}
                alt={avatar}
                variant="rounded"
                sx={{ width: 42, height: 42 }}
              />
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  {title}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  {subtitle}
                </Typography>
              </Box>
            </Stack>
          </TableCell>
          <TableCell>
            <Stack direction="row" spacing={1}>
              {teams.map((team, i) => (
                <Chip
                  label={team.name}
                  sx={{
                    backgroundColor: team.bgcolor,
                    color: team.textcolor,
                    fontSize: '11px',
                  }}
                  key={i}
                  size="small"
                />
              ))}
            </Stack>
          </TableCell>
          <TableCell>
            <Typography variant="subtitle1" color="textSecondary">
              {users}
            </Typography>
          </TableCell>

          { !editing &&   
              <TableCell>
                <IconButton
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  <IconDots width={18} />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <IconPlus width={18} />
                    </ListItemIcon>
                    Add
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <IconEdit width={18} />
                    </ListItemIcon>
                    Edit
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <IconTrash width={18} />
                    </ListItemIcon>
                    Delete
                  </MenuItem>
                </Menu>
              </TableCell>
            }
    </>
  );


  return !editing ? (
    <TableRow>
      {rowContent}
    </TableRow>
  ) : (


    <Draggable draggableId={id} index={index} key={id}>
      {(provided, snapshot) => (
       
        <TableRow ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    boxShadow: snapshot.isDragging ? 'rgba(145, 158, 171, 0.3) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;' : 'inherit',
                    backgroundColor: snapshot.isDragging ? '#fff' : 'inherit',
                  }}
                  
                  >

          {rowContent}
        </TableRow>

      )}
    </Draggable>
  );
};

export default ToDo;
