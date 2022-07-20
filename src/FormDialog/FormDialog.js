import React, {useState} from "react";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog({item}) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
    setOpen(true);
    // console.log(item)
    };

    const handleClose = () => {
    setOpen(false);
    };

    return (
    <div>
        {/* <Button variant="outlined" onClick={handleClickOpen}>
            Open form dialog
        </Button> */}
        <button className="info-btn" onClick={handleClickOpen}>MODAL</button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
            <DialogContentText>
                To subscribe to this website, please enter your email address here. We
                will send updates occasionally.
            </DialogContentText>
            <h2>{item.content.task}</h2>
            <h2>Próba mikrofonu</h2>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Subscribe</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}