import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import axios from 'axios';

export default function Home() {

  const [text, setText] = useState('')
  const [svmResultText, setSvmResultText] = useState('')
  const [svmResultPred, setSvmResultPred] = useState('')
  const [dtreeResultText, setDtreeResultText] = useState('')
  const [dtreeResultPred, setDtreeResultPred] = useState('')
  const [symptoms, setSymptoms] = useState([])
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);


  return (
    <>
    <Box>
      <Container>
        <Box display="flex" minHeight={400} pt={8}justifyContent="center" alignItems="center" width="100%" flexDirection="column">
          <Typography variant="h5" textAlign={"center"}>Текстээ энд оруулна уу ..</Typography>
          <Box width={"100%"} maxWidth={500}>
            <Box mt={4} component="form" display="flex" justifyContent="center" width="100%">
              <TextField sx={{fontSize: 28,}} minRows={8} label="Query" fullWidth maxRows={8} multiline onChange={(e) => setText(e.target.value)} />
            </Box>
            <Box mx="auto" display="flex" width="100%" mt={2} justifyContent="center">
              <Button onClick={ async () => {
                setLoading(true)
                var res = await getPredict(text);
                setSymptoms([...res.extracted_symptoms])
                setSvmResultText(res.svm.prediction[0])
                setSvmResultPred(res.svm.mean_score[0].toString().substring(0, 4))
                setDtreeResultText(res.decision_tree.prediction[0])
                setDtreeResultPred(res.decision_tree.mean_score[0].toString().substring(0, 4))
                setLoading(false)
                setLoaded(true)
              }} 
              variant="contained" width="100%" sx={{
                width: '200px',
                px: 2,
                py: 1,
                borderRadius: 15,
              }}>Үр дүн харах</Button>
            </Box>
          </Box>
          {loading ? <Typography variant="h5"> Уншиж байна ... </Typography> : <Box></Box>}
          {loaded && !loading ? 
          <Box mt={8} display="flex" flexDirection="column" width="100%" justifyContent="center" alignItems="center">
            <Typography variant="h5" >SVM алгоритмын нарийвчлал {svmResultPred} үр дүн {svmResultText} </Typography>
            <Typography variant="h5" >Decision Tree алгоритмын {dtreeResultPred} үр дүн {dtreeResultText} </Typography>
            <Typography variant="h5">Ялгаж авсан бүх шинж тэмдгүүд </Typography>
            <Typography variant="h5">{symptoms}</Typography>
          </Box> 
          : <Box></Box> }
        </Box>
      </Container>
    </Box>
    </>
  )
}

async function getPredict(text) {
  try {
    const response = await axios.get('http://127.0.0.1:8000/predict', {params: {text: text}, withCredentials: false, headers: {'Content-Type': 'application/json'}});
    console.log(response.data);
    return response.data
  } catch (error) {
    console.error(error);
  }
}