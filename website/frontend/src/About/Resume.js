import React from 'react';
import { Document, Page, pdfjs} from 'react-pdf';
import {
    Grid,
} from '@mui/material';
import file from './resume.pdf'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function Resume(){

    return(
        <Grid container alignItems="center">
            <Grid item xs={12} alignItems="center">
                <Document 
                    file={file} 
                    onLoadError={console.error}
                > 
                    <Page pageNumber={1} /> 
                </Document>
                
            </Grid>
        </Grid>
    );
}

export default Resume;