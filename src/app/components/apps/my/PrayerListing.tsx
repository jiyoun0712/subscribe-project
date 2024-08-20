'use client'

import React, { useState, useEffect } from 'react';
import { DragDropContext, DropResult, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
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
  TableHead, 
  Button,
  Grid,
  Stack,
} from '@mui/material';
//import Form from './components/Form';
//import ToDosList from './components/ToDosList';

//import Form from '@/app/components/apps/my/Form';
//import ToDosList from '@/app/components/apps/my/ToDosList';

import PrayerItem from '@/app/components/apps/my/PrayerItem'; // ToDo 컴포넌트 임포트

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;
const Text = styled.span`
  width: 80%;
  height: auto;
  font-size: 25px;
  word-break: break-all;
  line-height: 1.3;
`;

interface Team {
  name: string;
  bgcolor: string;
  textcolor: string;
}
interface Row {
  id: string;
  status: string;
  avatar: string;
  users: string;
  title: string; 
  subtitle: string;
  teams: Team[];

}
const PrayerListing: React.FC = () => {
  const [toDos, setToDos] = useState<Row[]>([
    {
      id:'1',
      status: 'active',
      avatar: "https://cnts-image.godpeople.com/wallpaper/watch/no/2024/600_gp_240604_insta4_2mCK0d.jpg",
      users: '2024.7.22',
      title: '나의 기도 5',
      subtitle: 'Successful Fellas',
      teams: [
        { name: 'wait', bgcolor: 'error.light', textcolor: 'error.main' },
        { name: 'ok', bgcolor: 'primary.light', textcolor: 'primary.main' },
      ],
    },
    {
      id:'2',
      status: 'offline',
      avatar: "https://cnts-image.godpeople.com/wallpaper/watch/no/2024/600_gp_2405_insta1_27laAz.jpg",
      users: '2024.7.12',
      title: '나의 기도 4',
      subtitle: 'Most Successful',
      teams: [{ name: 'ok', bgcolor: 'primary.light', textcolor: 'primary.main' }],
    },
    {
      id:'3',
      status: 'active',
      avatar: "https://cnts-image.godpeople.com/wallpaper/watch/no/2024/600_gp_240606_insta6_2KGvP5.jpg",
      users: '2024.7.2',
      title: '나의 기도 3',
      subtitle: 'Awesome Users',
      teams: [
        { name: 'reject', bgcolor: 'success.light', textcolor: 'success.main' },
        { name: 'wait', bgcolor: 'error.light', textcolor: 'error.main' },
      ],
    },
    {
      id:'4',
      status: 'offline',
      avatar: "https://cnts-image.godpeople.com/wallpaper/watch/no/2024/600_gp_240605_insta5_2MdYIH.jpg",
      users: '2024.7.5',
      title: '나의 기도 2',
      subtitle: 'Best Customers',
      teams: [{ name: 'ok', bgcolor: 'primary.light', textcolor: 'primary.main' }],
    },
    {
      id:'5',
      status: 'active',
      avatar: "https://cnts-image.godpeople.com/wallpaper/watch/no/2024/600_gp_2407_insta1_3SlLZx.jpg",
      users: '2024.7.2',
      title: '나의 기도 1',
      subtitle: 'Amazing Templates',
      teams: [
        { name: 'wait', bgcolor: 'error.light', textcolor: 'error.main' },
        { name: 'ok', bgcolor: 'success.light', textcolor: 'success.main' },
      ],
    },
    
  ]);
  
  const [editing, setEditing] = useState(false);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = [...toDos];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setToDos(items);
  };
  const onEdit = () => {
    setEditing(!editing);
  };

  return (

    <Grid container spacing={3}>
           
       

        <Grid item xs={12}>
            <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} justifyContent="start">
              <Button color="primary"  onClick={onEdit} >{!editing ? "편집" : "완료"}</Button>
            </Stack>

            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="toDosId">
                {(provided) => (
                <TableContainer className="toDosId" ref={provided.innerRef} {...provided.droppableProps}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        { editing &&
                        <TableCell></TableCell>
                        }
                        <TableCell>
                          <Typography variant="h6">No.</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">상태</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">날짜</Typography>
                        </TableCell>
                        { !editing &&
                        <TableCell></TableCell>
                        }
                      </TableRow>
                    </TableHead>
                    <TableBody>          
                    {toDos.map((toDo, index) => (
                      <PrayerItem key={index} index={index} id={`item-${toDo.id}`} status={toDo.status} title={toDo.title} subtitle={toDo.subtitle} avatar={toDo.avatar} users={toDo.users} teams={toDo.teams} editing={editing} />
                    ))}
                    {provided.placeholder}
                    </TableBody>
                  </Table>
                </TableContainer>
                )}
              </Droppable>
            </DragDropContext>

      </Grid>
    </Grid>
  );
};

export default PrayerListing;