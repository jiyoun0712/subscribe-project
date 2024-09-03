import * as React from 'react';
import { addPrayer } from '@/store/apps/prayers/PrayersSlice';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from '@/store/hooks';
import { IconCheck } from '@tabler/icons-react';



import "./Quill.css";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
const ReactQuill: any = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    // eslint-disable-next-line react/display-name
    return ({ ...props }) => <RQ {...props} />;
  },
  {
    ssr: false,
  }
);





interface Props {
  colors: any[];
}

const AddNotes = ({ colors }: Props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [scolor, setScolor] = React.useState<string>('primary');
  const id = useSelector((state) => state.prayersReducer.prayers.length + 1);
  const [title, setTitle] = React.useState('');
  
  const [text, setText] = React.useState("");


  const [inputValue, setInputValue] = React.useState<string>('');
  const [suggestions, setSuggestions] = React.useState<string[]>([]);


  const setColor = (e: string) => {
    setScolor(e);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setTitle(event.target.value);
    // 여기서 해시태그 추천 로직을 추가합니다.
  };





  return (
    <>
      <Button variant="contained" disableElevation color="primary" onClick={handleClickOpen}>
        기도 작성하기
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Typography variant="h5" mb={2} fontWeight={700}>
            새로운 기도 만들기
          </Typography>
          <DialogContentText my={2}>
          새로운 기도를 추가하려면 기도내용을 입력하고 기도 카드 색상을 선택해주세요.
          </DialogContentText>

          <ReactQuill
          
            value={title}
            onChange={(value: any) => {
                setTitle(value);
            }} 
               
            placeholder="여기에서 기도를 작성해주세요"


  

          />


    
          {suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}


          {/*
          <TextField
            multiline
            rows={5}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            id="description"
            label="여기에서 기도를 작성해주세요"
            type="text"
            fullWidth
            size="small"
            variant="outlined"
          />
          */}
          <Typography variant="h6" my={2}>
            색상 선택하기
          </Typography>
          {colors.map((color) => (
            <Fab
              color={color.disp}
              sx={{
                marginRight: '3px',
                transition: '0.1s ease-in',
                scale: scolor === color.disp ? '0.9' : '0.7',
              }}
              size="small"
              key={color.disp}
              onClick={() => setColor(color.disp)}
            >
              {scolor === color.disp ? <IconCheck /> : ''}
            </Fab>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            disabled={title === ''}
            onClick={(e) => {
              e.preventDefault();
              dispatch(addPrayer(id, title, scolor));
              setOpen(false);
              setTitle('');
            }}
            variant="contained"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddNotes;
