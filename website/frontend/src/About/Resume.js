import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import {
    Button,
    Grid,
} from '@mui/material';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import resume from '../assets/resume.pdf'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
//const pdfUrl = './resume.pdf';

function Resume(){

    return(
        <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={12} align="center">
                <Button 
                    color='info' 
                    variant='contained'
                    href={resume}
                    target="_blank" 
                    rel="noopener noreferrer"
                    download
                >
                    Download Resume PDF
                </Button>
            </Grid>
 

            <Grid item xs={6} justifyContent="center">

                <Document 
                    file={resume} 
                    onLoadError={console.error}
                > 
                    <Page pageNumber={1} width={800} /> 
                </Document>
                
            </Grid>
         </Grid>
    );
}

export default Resume;