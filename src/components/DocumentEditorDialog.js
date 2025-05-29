import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { saveDoc } from '../Services/CommonService';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { currentContent, DocumentEditor } from './DocumentEditor';

/**
 * Uses mui Dialog with a draft-js <editor> instance inside of it. Also calls setDocuments which does a setData in DocumentTab on successful
 */

export default function DocumentEditorDialog({ link = null, title = null }) {
    const [open, setOpen] = useState(false);
    const saveButtonText = "Save";
    const closeButtonText = "Close";

    const handleClickOpen = () => {
        setOpen(true);
    };

    //Calls saveDoc REST endpoint, hen refreshes document table.
    const handleSave = () => {
        const html = currentContent;
        if (html !== '') {
            saveDoc(html, link).then((response) => {
                if (response.data?.status === 'success') {
                    console.log(response);
                }
            });

            handleClose();
        } else {
            alert("Error getting editor data. Cannot save the document.");
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <span tabIndex={'13'} className="inline-edit-btn badge bg-dark me-2" onClick={handleClickOpen}>Edit Inline</span>
            <Dialog
                fullWidth="500"
                maxWidth="500"
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">Document Editor</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">Edit the document in the text editor below, then press Save to reupload your changes.</DialogContentText>
                        <br />
                        <DocumentEditor link={link} />
                    </DialogContent>
                    <DialogActions>
                        <Button className="btn btn-success my-3" style={{ backgroundColor: '#00599c', color: 'white' }} onClick={handleSave}>{saveButtonText}</Button>
                        <Button className="btn btn-success my-3" style={{ backgroundColor: '#00599c', color: 'white' }} onClick={handleClose}>{closeButtonText}</Button>
                    </DialogActions>
                </Dialog>
        </>
    );
}