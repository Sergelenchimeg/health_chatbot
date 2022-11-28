import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import axios from 'axios';

export default function Home() {

  const [text, setText] = useState('')
  const [svmResult, setSvmResult] = useState([])
  const [dtreeResult, setDtreeResult] = useState([])
  const [symptoms, setSymptoms] = useState([])


  return (
    <>
    <Box>
      <Container>
        <Box display="flex" minHeight={400} pt={8}justifyContent="center" alignItems="center" width="100%" flexDirection="column">
          <Typography variant="h5" textAlign={"center"}>Please write your text here ..</Typography>
          <Box width={"100%"} maxWidth={500}>
            <Box mt={4} component="form" display="flex" justifyContent="center" width="100%">
              <TextField sx={{fontSize: 28,}} minRows={6} label="Query" fullWidth maxRows={6} multiline onChange={(e) => setText(e.target.value)} />
            </Box>
            <Box mx="auto" display="flex" width="100%" mt={2} justifyContent="center">
              <Button onClick={ async () => {
                var res = await getPredict(text);
              setSymptoms([...res.extracted_symptoms])
              setSvmResult([...res.svm.prediction[0], res.svm.mean_score[0].toString().substring(0, 4)])
              setDtreeResult([res.decision_tree.prediction[0], res.decision_tree.mean_score[0].toString().substring(0, 4)])}} 
              variant="contained" width="100%" sx={{
                width: '80%',
                px: 3,
                py: 2,
                borderRadius: 3,
              }}>Get Results</Button>
            </Box>
          </Box>
          <Box mt={8} width="100%" justifyContent="center" alignItems="center">
            <Typography variant="h5">SVM result - {svmResult }</Typography>
            <Typography variant="h5">Decision Tree result - {dtreeResult }</Typography>
            <Typography variant="h5">All symptoms - {symptoms}</Typography>
          </Box>
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