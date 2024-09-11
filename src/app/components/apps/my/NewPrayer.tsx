'use client'

import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
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
  Box,
  Stack,
  Alert,
  Tooltip,
} from '@mui/material';

import AddPrayer from './AddPrayer';
import { useTheme } from '@mui/material/styles';
import Scrollbar from "../../custom-scroll/Scrollbar";
import { useSelector, useDispatch } from "@/store/hooks";
import {
  fetchPrayers,
  SelectPrayer,
  DeletePrayer,
  SearchPrayers,
} from "@/store/apps/prayers/PrayersSlice";
import { IconTrash } from "@tabler/icons-react";
import { PrayersType } from '../../../(DashboardLayout)/types/apps/prayers';



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

interface colorsType {
  lineColor: string;
  disp: string | any;
  id: number;
}


const PrayerListing: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const theme = useTheme();
    const colorvariation: colorsType[] = [
    {
        id: 1,
        lineColor: theme.palette.warning.main,
        disp: 'warning',
    },
    {
        id: 2,
        lineColor: theme.palette.info.main,
        disp: 'info',
    },
    {
        id: 3,
        lineColor: theme.palette.error.main,
        disp: 'error',
    },
    {
        id: 4,
        lineColor: theme.palette.success.main,
        disp: 'success',
    },
    {
        id: 5,
        lineColor: theme.palette.primary.main,
        disp: 'primary',
    },
    ];

    const dispatch = useDispatch();

    
    const filterPrayers = (prayers: PrayersType[], nSearch: string) => {
        if (nSearch !== "")
            return prayers.filter(
            (t: any) =>
                !t.deleted &&
                t.title
                .toLocaleLowerCase()
                .concat(" ")
                .includes(nSearch.toLocaleLowerCase())
            );

        return prayers.filter((t) => !t.deleted);
    };
    
    const prayers = useSelector((state) =>
        filterPrayers(state.prayersReducer.prayers, state.prayersReducer.prayerSearch)
    );
    

    useEffect(() => {
        dispatch(fetchPrayers());
    }, [dispatch]);

  
  return (

    <Grid container spacing={3}>
        <Grid item xs={12}>

          <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
            <AddPrayer  colors={colorvariation} />
          </Box>
            
          <Box>
            <Scrollbar
              sx={{
                height: { lg: "calc(100vh - 100px)", sm: "100vh" },
                maxHeight: "700px",
              }}
            >
              {prayers && prayers.length ? (
                prayers.map((prayer, index) => (
                  <Box key={prayer.id} px={2}>
                    <Box
                      p={2}
                      sx={{
                        position: "relative",
                        cursor: "pointer",
                        mb: 1,
                        transition: "0.1s ease-in",
                      /* transform:
                          activePrayer === index ? "scale(1)" : "scale(0.95)",*/
                        backgroundColor: `${prayer.color}.light`,
                      }}
                      onClick={() => dispatch(SelectPrayer(index))}
                    >
                      {/*
                      <Typography variant="h6" noWrap color={prayer.color + ".main"}>
                        {prayer.title}
                      </Typography>*/}

                      <div 
                        className="view ql-editor" 
                        dangerouslySetInnerHTML={{ __html : DOMPurify.sanitize( prayer.title || '' ) }}>
                      </div>

                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography variant="caption">
                          {new Date(prayer.datef).toLocaleDateString()}
                        </Typography>
                        <Tooltip title="Delete">
                          <IconButton
                            aria-label="delete"
                            size="small"
                            onClick={() => dispatch(DeletePrayer(prayer.id))}
                          >
                            <IconTrash width={18} />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </Box>
                  </Box>
                ))
              ) : (
                <Box m={2}>
                  <Alert severity="error" variant="filled" sx={{ color: "white" }}>
                    No Notes Found!
                  </Alert>
                </Box>
              )}
            </Scrollbar>
          </Box>


      </Grid>
    </Grid>
  );
};

export default PrayerListing;