import * as React from 'react';
import Box from '@mui/material/Box';
import havenLogo from '../assets/Haven.png'; // Correct the case to match the file name

export default function SitemarkIcon() {
  return (
    <Box
      component="img"
      sx={{
        height: 'auto', // Adjust the height as needed
        width: 100, // Maintain aspect ratio
        mr: 2,
        objectFit: 'cover',
        objectPosition: 'center',
      }}
      alt="Haven Logo"
      src={havenLogo}
    />
  );
}
