import { Loading, Modal, Card } from '@nextui-org/react';

const LoadingScreen = ({ visible }) => {


    return (
        <Modal open={visible} blur preventClose width="fit-content">
            <Loading />
        </Modal>
    )
};

export default LoadingScreen;