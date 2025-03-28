import * as React from 'react';
import { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppTheme from '../shared-theme/AppTheme';
import AppAppBar from './AppAppBar';
import Footer from './Footer';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import eventsData from '../assets/ex_data.json';

export default function Preprocessing(props) {
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [includedAttributes, setIncludedAttributes] = useState(eventsData.include_attributes.join(', '));
  const [eventType, setEventType] = useState(eventsData.event_type.join(', '));
  const [filterAttribute, setFilterAttribute] = useState(eventsData.filters[0].attribute);
  const [filterValues, setFilterValues] = useState(eventsData.filters[0].values.join(', '));
  const [startTimestamp, setStartTimestamp] = useState(eventsData.start_timestamp);
  const [endTimestamp, setEndTimestamp] = useState(eventsData.end_timestamp);

  const fetchData = async () => {
    try {
      const requestData = {
        json_data: eventsData.json_data,
        event_type: eventType.split(',').map(type => type.trim()), // Use the input value
        filters: [{
          attribute: filterAttribute,
          values: filterValues.split(',').map(value => value.trim())
        }], // Use the input values
        include_attributes: includedAttributes.split(',').map(attr => attr.trim()), // Use the input value
        start_timestamp: startTimestamp, // Use the input value
        end_timestamp: endTimestamp, // Use the input value
      };
      console.log('Request Data:', JSON.stringify(requestData, null, 2));
  
      // Send request with the proper body structure
      const preprocessResponse = await fetch('http://preprocessing-681292228.ap-southeast-2.elb.amazonaws.com/filter-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),  // Send the data as JSON
      });
      console.log(preprocessResponse)
      
      if (!preprocessResponse.ok) throw new Error('Error in preprocessing API');
      const result = await preprocessResponse.json();
      
      setOutput(JSON.stringify(result.filtered_data, null, 2));
      downloadFile(result.filtered_data);
    } catch (err) {
      console.log(err)
      setError(err.message);
    }
  };

  const downloadFile = (data) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'preprocessed.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Container maxWidth="lg" component="main" sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}>
        <Typography variant="h1" gutterBottom>
          Preprocessing Service
        </Typography>
        <TextField
          label="Included Attributes"
          variant="outlined"
          fullWidth
          value={includedAttributes}
          onChange={(e) => setIncludedAttributes(e.target.value)}
        />
        <TextField
          label="Event Type"
          variant="outlined"
          fullWidth
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
        />
        <TextField
          label="Filter Attribute"
          variant="outlined"
          fullWidth
          value={filterAttribute}
          onChange={(e) => setFilterAttribute(e.target.value)}
        />
        <TextField
          label="Filter Values"
          variant="outlined"
          fullWidth
          value={filterValues}
          onChange={(e) => setFilterValues(e.target.value)}
        />
        <TextField
          label="Start Timestamp"
          variant="outlined"
          fullWidth
          value={startTimestamp}
          onChange={(e) => setStartTimestamp(e.target.value)}
        />
        <TextField
          label="End Timestamp"
          variant="outlined"
          fullWidth
          value={endTimestamp}
          onChange={(e) => setEndTimestamp(e.target.value)}
        />
        <Button variant="contained" onClick={fetchData}>
          Process Events
        </Button>
        {error && <Typography color="error">Error: {error}</Typography>}
        {output && (
          <Box component="pre" sx={{ overflow: 'auto', maxHeight: 300, backgroundColor: '#f4f4f4', p: 2, borderRadius: 1 }}>
            {output.split('\n').slice(0, 50).join('\n')}
          </Box>
        )}
      </Container>
      <Footer />
    </AppTheme>
  );
}