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
    const [name, setName] = useState(null);
    const navigate = useNavigate();
    
    const handleOpen = () =>
    {
        if(name == null || name == ""){

        }
        else{
            setOpen(!open);
            handleConfirm(name);
        }
    }

    const handleClose = () => {
        navigate(-1);
    }
 
    return (
        <Fragment>
        <Dialog open={open} className="">
            <DialogHeader >Enter your Name</DialogHeader>
            <DialogBody divider>
            <div className="w-72">
                <Input 
                label="Name"
                onChange={(e) => {
                    setName(e.target.value)
                }
            }
                />
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
            <Button 
                variant="gradient" color="green" 
                onClick={handleOpen}
            >
                <span>Confirm</span>
            </Button>
            </DialogFooter>
        </Dialog>
        </Fragment>
    );
}