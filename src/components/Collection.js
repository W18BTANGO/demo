import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppTheme from '../shared-theme/AppTheme';
import AppAppBar from './AppAppBar';
import Footer from './Footer';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import ApiIcon from '@mui/icons-material/Api';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

export default function Collection(props) {
return (
    <AppTheme {...props}>
        <CssBaseline enableColorScheme />
        <AppAppBar />
        <Container
            maxWidth="lg"
            component="main"
            sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
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
            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                <Button variant="contained" color="primary">Button 1</Button>
                <Button variant="contained" color="secondary">Button 2</Button>
                <Button variant="contained" color="success">Button 3</Button>
            </Box>
            <Paper elevation={3} sx={{ p: 2, minHeight: '200px' }}>
                <Typography variant="body1">
                    Output will be displayed here.
                </Typography>
            </Paper>
        </Container>
    </AppTheme>
);
}
