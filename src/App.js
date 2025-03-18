import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Home from './components/Home';
import Collect from './components/Collect';
import Retrieve from './components/Retrieve';
import Preprocess from './components/Preprocess';
import Analyse from './components/Analyse';
import './styles.css';

function App() {
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    return (
        <Router>
            <Container style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
                <Box display="flex">
                    <Paper style={{ minWidth: '200px', marginRight: '20px' }}>
                        <Tabs
                            orientation="vertical"
                            value={tabIndex}
                            onChange={handleTabChange}
                            indicatorColor="primary"
                            textColor="primary"
                        >
                            <Tab label="Home" component={Link} to="/" />
                            <Tab label="Collect" component={Link} to="/collect" />
                            <Tab label="Retrieve" component={Link} to="/retrieve" />
                            <Tab label="Preprocess" component={Link} to="/preprocess" />
                            <Tab label="Analyse" component={Link} to="/analyse" />
                        </Tabs>
                    </Paper>
                    <Box flex={1} display="flex" justifyContent="center" alignItems="center" flexDirection="column" mt={5}>
                        <Routes>
                            <Route exact path="/" element={<Home />} />
                            <Route path="/collect" element={<Collect />} />
                            <Route path="/retrieve" element={<Retrieve />} />
                            <Route path="/preprocess" element={<Preprocess />} />
                            <Route path="/analyse" element={<Analyse />} />
                        </Routes>
                    </Box>
                </Box>
                <Box position="fixed" bottom={0} width="100%" bgcolor="white" boxShadow={3}>
                    <Tabs
                        value={tabIndex}
                        onChange={handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Home" component={Link} to="/" />
                        <Tab label="Collect" component={Link} to="/collect" />
                        <Tab label="Retrieve" component={Link} to="/retrieve" />
                        <Tab label="Preprocess" component={Link} to="/preprocess" />
                        <Tab label="Analyse" component={Link} to="/analyse" />
                    </Tabs>
                </Box>
            </Container>
        </Router>
    );
}

export default App;