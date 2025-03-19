import * as React from 'react';
import { useState, useRef } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppTheme from '../shared-theme/AppTheme';
import AppAppBar from './AppAppBar';
import Footer from './Footer';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import ApiIcon from '@mui/icons-material/Api';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Menu from '@mui/material/Menu';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

export default function Collection(props) {
  const [year, setYear] = useState(2024);
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [output, setOutput] = useState('');
  const fileInputRef = useRef(null);
  const years = [];
  for (let y = new Date().getFullYear(); y >= 2001; y--) {
    years.push(y);
  }

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const url = `https://www.valuergeneral.nsw.gov.au/__psi/yearly/${year}.zip`;

  const handleGoClick = async () => {
    try {
      const response = await axios.post('http://collections-1861510594.ap-southeast-2.elb.amazonaws.com/collection/parse/dat/directory', {
        url: url
      });
      console.log('Response:', response.data);
      await new Promise(resolve => setTimeout(resolve, 15000)); // Wait for 15 seconds
      const jsonResponse = JSON.stringify(response.data, null, 2);
      const blob = new Blob([jsonResponse], { type: 'application/json' });
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', `data_${year}.json`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      setOutput(jsonResponse.substring(0, 5000)); // Display the first 1000 characters
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFileUpload = async () => {
    const file = fileInputRef.current.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);

    try {
      const response = await axios.post('http://collections-1861510594.ap-southeast-2.elb.amazonaws.com/collection/parse/dat/directory', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Response:', response.data);
      await new Promise(resolve => setTimeout(resolve, 15000)); // Wait for 15 seconds
      const jsonResponse = JSON.stringify(response.data, null, 2);
      const blob = new Blob([jsonResponse], { type: 'application/json' });
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', `data_uploaded.json`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      setFileName(file.name);
      setOutput(jsonResponse.substring(0, 5000)); // Display the first 1000 characters
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setUploading(false);
    }
  };

  React.useEffect(() => {
    // This effect will run whenever the output state changes
    console.log('Output updated:', output);
  }, [output]);

return (
    <AppTheme {...props}>
        <CssBaseline enableColorScheme />
        <AppAppBar />
        <Box
            component="img"
            sx={{
                width: '100%',
                height: 'auto',
                mb: 4,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
            }}
            alt="Top Banner"
            src={require('../assets/farm.jpg')}
        />
        <Container
            maxWidth="lg"
            component="main"
            sx={{ display: 'flex', flexDirection: 'column', my: 0, gap: 4, bgcolor: '#f5f5f5' }}
        >
            <Typography variant="h1" gutterBottom>
                Collection Service
            </Typography>
            <Box sx={{ border: '1px solid', borderColor: 'grey.500', p: 2, borderRadius: 1 }}>
                <Typography variant="body1">
                    The Collection Service provides tools to gather large scale data from the NSW Valuer Generals Office, 
                    parsing and returning it as a JSONied object. You can then use this data to build your own applications.
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <IconButton color="primary">
                    <ApiIcon />
                </IconButton>
                <Link href="#" variant="body1" sx={{ ml: 1 }}>
                    Swagger Link
                </Link>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 4, justifyContent: 'center', gap: 2 }}>
                <img src={require('../assets/1.png')} alt="Data Source" style={{ maxWidth: '30%', aspectRatio: '16/12', border: '1px solid black' }} />
                <ArrowForwardIcon />
                <img src={require('../assets/2.png')} alt="Raw Data" style={{ maxWidth: '30%', aspectRatio: '16/12', border: '1px solid black' }} />
                <ArrowForwardIcon />
                <img src={require('../assets/3.png')} alt="Parsed Output" style={{ maxWidth: '30%', aspectRatio: '16/12', border: '1px solid black' }} />
            </Box>
            <Typography variant="h2" gutterBottom sx={{ mt: 4 }}>
                Collect your data:
            </Typography>
            <Box sx={{ border: '1px solid', borderColor: 'grey.500', p: 2, borderRadius: 1, display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 2 }}>
                    <Typography variant="body1" sx={{ fontSize: '1.2rem', mb: 0.5 }}>
                        Get housing data for:
                    </Typography>
                    <FormControl variant="outlined" sx={{ minWidth: 120, bgcolor: 'green.100', borderRadius: 1 }}>
                        <InputLabel id="year-select-label">Year</InputLabel>
                        <Select
                            labelId="year-select-label"
                            id="year-select"
                            label="Year"
                            value={year}
                            onChange={handleYearChange}
                            sx={{ bgcolor: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'green' } }}
                            MenuProps={{ dense: "true" }}
                        >
                            {years.map((year) => (
                                <MenuItem key={year} value={year}>{year}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Button variant="contained" color="primary" sx={{ alignSelf: 'center', mt: 1 }} onClick={handleGoClick}>
                    Go
                </Button>
            </Box>
            <Box sx={{ border: '1px solid', borderColor: 'grey.500', p: 2, borderRadius: 1, display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
                <Typography variant="body1" sx={{ fontSize: '1.2rem', mb: 0.5 }}>
                    Or upload a zip file to parse:
                </Typography>
                <input
                    type="file"
                    accept=".zip"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    id="file-upload"
                    onChange={(e) => setFileName(e.target.files[0]?.name || '')}
                />
                <Button variant="contained" color="secondary" sx={{ alignSelf: 'center', mt: 1 }} onClick={() => fileInputRef.current.click()}>
                    Choose File
                </Button>
                {fileName && (
                    <Typography variant="body2" sx={{ alignSelf: 'center', mt: 1 }}>
                        {fileName}
                    </Typography>
                )}
                <Button variant="contained" color="primary" sx={{ alignSelf: 'center', mt: 1 }} onClick={handleFileUpload} disabled={uploading}>
                    {uploading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <CircularProgress size={24} />
                        </Box>
                    ) : 'Upload and Parse'}
                </Button>
            </Box>
            <Paper elevation={3} sx={{ p: 2, minHeight: '200px' }}>
                <Typography variant="body1">
                    If you have already collected your data, you can preview it here:
                </Typography>
                <pre>{output}</pre>
            </Paper>
        </Container>
    </AppTheme>
);
}
