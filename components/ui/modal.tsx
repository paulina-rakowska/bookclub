import { Box } from "@mui/material";
// import Modal from '@mui/material/Modal';
// import Fade from '@mui/material/Fade';
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import { WindowModalProps } from "./modal.types";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";

const styleModal = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const styleSheet = { minWidth: 500, borderRadius: "md", p: 3, boxShadow: "lg" };

function WindowModal(props: WindowModalProps) {
  const { className, children, open, title, description, onClose } = props;
  const handleClose = () => onClose();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className={className}
      aria-labelledby={title}
      aria-describedby={description}
      sx={styleModal}
    >
      <Sheet variant="outlined" sx={styleSheet}>
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <Typography
          component="h2"
          id="modal-title"
          level="h4"
          textColor="inherit"
          sx={{ fontWeight: "lg", mb: 1 }}
        >
          {title}
        </Typography>
        <Typography id="modal-desc" textColor="text.tertiary" sx={{ mb: 2 }}>
          {description}
        </Typography>
        {children}
      </Sheet>
    </Modal>
  );
}

export default WindowModal;
