import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
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
import Chip from '@mui/material/Chip';
import "./Quill.css";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";


interface Props {
  colors: any[];
}

// Quill 에디터 동적 로드
const ReactQuillBase = dynamic(() => import('react-quill'), { ssr: false });



// Custom ReactQuill wrapper to forward ref
const ReactQuillWrapper = forwardRef((props: any, ref) => {
  const quillRef = useRef<any>(null);

  // Forward the Quill instance to parent through ref
  useImperativeHandle(ref, () => ({
    getEditor() {
      return quillRef.current ? quillRef.current.getEditor() : null;
    },
  }));

  return <ReactQuillBase ref={quillRef} {...props} />;
});





const AddPrayer = ({ colors }: Props) => {
  const dispatch = useDispatch();
  const quillRef = useRef<any>(null);
  

  const [open, setOpen] = useState(false);
  const [scolor, setScolor] = useState<string>('primary');
  const id = useSelector((state) => state.prayersReducer.prayers.length + 1);
  const [editorInstance, setEditorInstance] = useState<any>(null);
  const [editor, setEditor] = useState<any>(null); // Store Quill editor instance

  const [inputValue, setInputValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  //const [selectedTags, setSelectedTags] = useState<string[]>([]);


  const hashtags = ['#nature', '#travel', '#food', '#fashion', '#art', '#music', '#믿음', '#하나님', '#기도', '#기도할게요','#기도다이어리','#기도의힘','#기도시간','#기도노트','#기도할게','#기도문','#기도손','#기도하는엄마','#찬양', '#사랑'];


  const setColor = (e: string) => {
    setScolor(e);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  // ReactQuill이 완전히 로드되었을 때 Quill 인스턴스에 접근
  const handleEditorReady = (quillInstance: any) => {
    console.log('Editor is ready', quillInstance);
    setEditor(quillInstance);
  };


  const handleInputChange = (content: string, delta: any, source: any, editor: any) => {

    setInputValue(content);

    const cursorPosition = editor.getSelection()?.index;
    if (cursorPosition !== undefined) {
      const textBeforeCursor = editor.getText(0, cursorPosition);
      const words = textBeforeCursor.split(/\s+/);
      const lastWord = words[words.length - 1];

      if (lastWord === '#') {
        setSuggestions([]);
      } else if (lastWord.startsWith('#')) {
        const query = lastWord.slice(1).toLowerCase();
        setSuggestions(
          hashtags.filter((tag) => tag.toLowerCase().includes(query))
        );
      } else {
        setSuggestions([]);
      }


    }
  };


  const handleTagSelect = (tag: string) => {
    if (editorInstance) {
   
      const range = editor.getSelection(); // 현재 커서 위치
      if (range) {
        const textBeforeCursor = editor.getText(0, range.index); // 커서 이전의 텍스트 가져오기
        const words = textBeforeCursor.split(/\s+/); // 단어로 분리
        const lastWord = words[words.length - 1]; // 마지막 단어 가져오기
  
        if (lastWord.startsWith("#")) {
          const startIndex = range.index - lastWord.length; // 마지막 단어의 시작 위치
          editor.deleteText(startIndex, lastWord.length); // 마지막 단어 삭제
          editor.insertText(startIndex, tag, 'hashtag', true); // 선택한 태그 추가
          editor.setSelection(startIndex + tag.length); // 커서를 태그 뒤로 이동
        }
      }
      setSuggestions([]); // 태그 선택 후 추천 목록 닫기
      
    } else {
      console.log('@@@')
      // setSelectedTags([...selectedTags, tag]);
      setInputValue(`${inputValue} ${tag}`);
      setSuggestions([]);
    }

  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === ' ') {
      setSuggestions([]); // 스페이스바가 눌리면 추천 리스트를 리셋
    }
  };


  // 에디터가 초기화된 후에 Quill 인스턴스를 저장
  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor(); // 에디터 초기화 후 getEditor 호출
      setEditorInstance(editor); // Quill 에디터 인스턴스 저장
      console.log("Quill editor initialized", editor);
    }
  }, [quillRef]); // quillRef가 변경될 때마다 확인

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

          <ReactQuillWrapper     
            ref={quillRef}     
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="여기에서 기도를 작성해주세요"
            formats={['hashtag']}
            onReady={() => handleEditorReady(quillRef.current.getEditor())} // 에디터가 로드되면 인스턴스를 얻음
          />
 

          {suggestions.length > 0 && ( // 에디터가 로드된 후만 suggestions 표시
            <>
              {suggestions.map((suggestion, index) => (               
                   <Chip
                    sx={{
                      cursor: 'pointer', backgroundColor: 'primary', marginRight: '3px', marginTop: '10px',
                    }}
                    key={index} onClick={() => handleTagSelect(suggestion)}
                    size="small"
                    label={suggestion} />
              ))}
           </>
          )}
     
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
            disabled={inputValue === ''}
            onClick={(e) => {
              e.preventDefault();
              dispatch(addPrayer(id, inputValue, scolor));
              setOpen(false);
              setInputValue('');
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

export default AddPrayer;