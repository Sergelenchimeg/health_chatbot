import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';

export default function Home() {

  const [result, setResult] = useState('')

  return (
    <>
    <Box>
      <Container>
        <Box display="flex" minHeight={400} pt={8}justifyContent="center" alignItems="center" width="100%" flexDirection="column">
          <Typography variant="h2" textAlign={"center"}>Health Chatbot</Typography>
          <Box width={"100%"} maxWidth={500}>
            <Box mt={4} component="form" display="flex" justifyContent="center" width="100%">
              <TextField sx={{fontSize: 28,}} minRows={6} label="Query" fullWidth maxRows={6} multiline />
            </Box>
            <Box mx="auto" display="flex" width="100%" mt={2} justifyContent="center">
              <Button onClick={() => {
                setResult('Haniaad..')
              }} variant="contained" width="100%" sx={{
                width: '100%',
                px: 3,
                py: 2,
                borderRadius: 3,
              }}>Get Results</Button>
            </Box>
          </Box>
          <Box mt={8}>
            <Typography variant="h3">{result}</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
    </>
  )
}
