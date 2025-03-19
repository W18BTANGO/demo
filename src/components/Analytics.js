import * as React from 'react';
import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppTheme from '../shared-theme/AppTheme';
import AppAppBar from './AppAppBar';
import Footer from './Footer';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const endpoints = [
  { label: "Predict", value: "/predict" },
  { label: "Average Price by Suburb", value: "/average-price-by-suburb" },
  { label: "Median Price by Suburb", value: "/median-price-by-suburb" },
  { label: "Highest Value", value: "/highest-value" },
  { label: "Lowest Value", value: "/lowest-value" },
  { label: "Median Value", value: "/median-value" },
  { label: "Predict Future Prices", value: "/predict-future-prices" },
  { label: "Price Outliers", value: "/price-outliers" },
  { label: "Total Sales per Year", value: "/total-sales-per-year" },
  { label: "Most Expensive and Cheapest Suburb", value: "/most-expensive-and-cheapest-suburb" }
];

export default function Analytics(props) {
  const [selectedEndpoint, setSelectedEndpoint] = useState('');
  const [file, setFile] = useState(null);
  const [xAttribute, setXAttribute] = useState('');
  const [yAttribute, setYAttribute] = useState('');
  const [xValues, setXValues] = useState('');
  const [attributeName, setAttributeName] = useState('');
  const [years, setYears] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) {
      setError('Please select a file.');
      return;
    }

    try {
      const fileContent = await file.text();
      const parsedData = JSON.parse(fileContent);

      let requestData;
      if (['/average-price-by-suburb', '/median-price-by-suburb', '/most-expensive-and-cheapest-suburb', '/total-sales-per-year', '/price-outliers'].includes(selectedEndpoint)) {
        requestData = parsedData; // Directly use the parsed data as the request body
      } else if (selectedEndpoint === '/predict') {
        requestData = {
          data: parsedData,
          x_attribute: xAttribute,
          y_attribute: yAttribute,
          x_values: xValues.split(',').map(value => value.trim())
        };
      } else if (selectedEndpoint === '/predict-future-prices') {
        requestData = {
          data: parsedData,
          years: years.split(',').map(year => parseInt(year.trim()))
        };
      } else {
        requestData = {
          data: parsedData,
          attribute_name: attributeName
        };
      }

      const response = await fetch(`http://alb8-2127494217.ap-southeast-2.elb.amazonaws.com${selectedEndpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) throw new Error('Error in API request');
      const result = await response.json();
      setOutput(JSON.stringify(result, null, 2));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Container maxWidth="lg" component="main" sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}>
        <Typography variant="h1" gutterBottom>
          Analytics Service
        </Typography>
        {endpoints.map((endpoint) => (
          <Button
            key={endpoint.value}
            variant="contained"
            onClick={() => setSelectedEndpoint(endpoint.value)}
          >
            {endpoint.label}
          </Button>
        ))}
        {selectedEndpoint && (
          <Box sx={{ mt: 4 }}>
            <input type="file" onChange={handleFileChange} />
            {selectedEndpoint === '/predict' && (
              <>
                <TextField
                  label="X Attribute"
                  variant="outlined"
                  fullWidth
                  value={xAttribute}
                  onChange={(e) => setXAttribute(e.target.value)}
                />
                <TextField
                  label="Y Attribute"
                  variant="outlined"
                  fullWidth
                  value={yAttribute}
                  onChange={(e) => setYAttribute(e.target.value)}
                />
                <TextField
                  label="X Values"
                  variant="outlined"
                  fullWidth
                  value={xValues}
                  onChange={(e) => setXValues(e.target.value)}
                />
              </>
            )}
            {['/highest-value', '/lowest-value', '/median-value'].includes(selectedEndpoint) && (
              <TextField
                label="Attribute Name"
                variant="outlined"
                fullWidth
                value={attributeName}
                onChange={(e) => setAttributeName(e.target.value)}
              />
            )}
            {selectedEndpoint === '/predict-future-prices' && (
              <TextField
                label="Years"
                variant="outlined"
                fullWidth
                value={years}
                onChange={(e) => setYears(e.target.value)}
              />
            )}
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        )}
        {error && <Typography color="error">Error: {error}</Typography>}
        {output && (
          <Box component="pre" sx={{ overflow: 'auto', maxHeight: 300, backgroundColor: '#f4f4f4', p: 2, borderRadius: 1 }}>
            {output}
          </Box>
        )}
      </Container>
      <Footer />
    </AppTheme>
  );
}
