import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input
} from "@material-tailwind/react";

import { useNavigate } from "react-router-dom";
 
export default function Popup({handleConfirm}) {
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();
    
    const handleOpen = () => {
        setOpen(!open);
        handleConfirm("dsds");

    }

    const handleClose = () => {
        navigate(-1);
    }
 
    return (
        <Fragment>
        <Dialog open={open} handler={handleOpen}>
            <DialogHeader>Enter your Name</DialogHeader>
            <DialogBody divider>
            <div className="w-72">
                <Input label="Name" />
            </div>
            </DialogBody>
            <DialogFooter>
            <Button
                variant="text"
                color="red"
                onClick={handleClose}
                className="mr-1"
            >
                <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="green" onClick={handleOpen}>
                <span>Confirm</span>
            </Button>
            </DialogFooter>
        </Dialog>
        </Fragment>
    );
}