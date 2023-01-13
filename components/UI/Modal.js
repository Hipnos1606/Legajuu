import { Modal as NextModal, Button, Text } from '@nextui-org/react';

const Modal = (props) => {
    const { isVisible, closeHandler, modalTitle } = props;

    return (
        <NextModal 
            open={isVisible}
            blur
            width="fit-content"
            closeButton
            aria-labelledby={`Ventana flotante, ${modalTitle}`}
            onClose={closeHandler}
            >
            <NextModal.Header>
                <Text id="modal-title" b size={12}>
                    { modalTitle }
                </Text>
            </NextModal.Header>
            <NextModal.Body>
                {
                    props.children
                }
            </NextModal.Body>
            <NextModal.Footer>
                <Button
                    auto
                    color="error"
                    onClick={closeHandler}
                >Cancelar</Button>
            </NextModal.Footer>
        </NextModal>
    );
}

export default Modal;