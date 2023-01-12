import { Modal as NextModal, Button, Text } from '@nextui-org/react';
import { useEffect } from 'react';

const Modal = (props) => {
    const { isVisible, closeHandler, modalTitle } = props;

    const close = closeHandler;
    
    useEffect(() => {
        document.addEventListener('click', close);

        return document.removeEventListener('click', close);
    },[]);

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