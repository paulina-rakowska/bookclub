import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { WindowModalProps } from './modal.types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function WindowModal(props: WindowModalProps) {
    const { className, children, open, onClose } = props;
    const handleClose = () => onClose();

    return (<Modal open={open} onClose={handleClose} className={className} sx={style} aria-labelledby="modal-title" aria-describedby="modal-description">
        <Fade in={open}>
        <Box>
         {children}
        </Box>
        </Fade>
    </Modal>);
}

export default WindowModal;