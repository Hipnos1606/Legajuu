import { Loading, Modal, Container } from '@nextui-org/react';

const LoadingScreen = ({ visible }) => {

    return (
        <Container fluid>
            <Modal open={visible} blur preventClose width="fit-content">
                <Loading />
            </Modal>
        </Container>
    )
};

export default LoadingScreen;