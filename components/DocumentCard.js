import { useState, useContext } from 'react';
import { Grid, Card, Col, Text, Button, Row, Badge } from '@nextui-org/react';
import { Modal, OptionsMenu } from './UI';
import { IoIosArrowDown, IoIosArrowUp, IoIosMore, IoIosTrash, IoIosDocument, IoIosAdd } from 'react-icons/io';
import DocumentView from './DocumentView';
import Add2Legajo from './Add2Legajo';
import Move2Directory from './Move2Directory';
import Store from '../Classes/Store';
import { DirectoriesContext } from './context/directoriesContext';

const badgeColor = {
    local: "primary",
    cloud: "success",
    selected: "warning",
}

const DocumentCard = (props) => {

    const { document, deleteAction, defaultShowPreview, isLegajoList } = props;
    const { handleSetState } = useContext(DirectoriesContext);
    const [togglePreview, setTogglePreview] = useState(defaultShowPreview);
    const [toggleModal, setToggleModal] = useState(false);
    const [modalChildren, setModalChildren] = useState(null);
    const [modalTitle, setModalTitle] = useState('Opciones del documento');
        
    const handleToggleModal = {
        open: () => setToggleModal(true),
        close: () => setToggleModal(false),
        toggle: () => setToggleModal(!toggleModal),
    }

    const handleTogglePreview = {
        open:  () => setTogglePreview(true),
        close: () => setTogglePreview(false),
        toggle: () => setTogglePreview(!togglePreview),
    }
    
    const toggleIcon = togglePreview ?  <IoIosArrowUp size={32} /> : <IoIosArrowDown size={32} />;

    const handleMoveDocument = async (directory) => {
        await Store.moveToDirectory(document, directory);
        handleToggleModal.close();
    }

    const showChangeDirectoryMenu = () => {
        setModalTitle('Mover a');
        handleToggleModal.open();
        setModalChildren(<Move2Directory onPress={handleMoveDocument} />);
    }

    const menuOptions = [
        {
            text: 'Ver Documento',
            icon: <IoIosDocument fill="currentColor" />,
            onPress: () => {
                window.open(document.url);
                handleToggleModal.close();
            },
        },
        (!isLegajoList && !document.directory) && {
            text: 'Agregar al Legajo',
            icon: <IoIosAdd fill="currentColor" />,
            onPress: () => {
                setModalChildren(<Add2Legajo document={document} />);
            }
        },
        {
            text: isLegajoList ? 'Quitar del Legajo' : 'Eliminar Documento',
            icon: <IoIosTrash fill="currentColor" />,
            onPress: () => {
                !isLegajoList ? document.remove() : document.removeFromLegajo()
                handleToggleModal.close();
            },
        }
    ]
    
    const openMenuOptions = () => {
        setModalTitle('Opciones del Documento');
        handleToggleModal.open();
        setModalChildren(<OptionsMenu options={menuOptions}/>);
    }

    return (
        <Grid xs={12} md={4} lg={1} key={JSON.stringify(document)}>  
            <Card css={{ h: 'fit-content' }}>
                <Card.Header css={{ bg: "#e6e8f1", w: "100%" }} >
                    <Grid.Container>
                        <Grid xs={8}>
                            <Col>
                                <Row>
                                    <Badge size="xs" color={badgeColor[document.type]} >{document.type}</Badge>
                                </Row>
                                <Row>
                                    <Text size={12} css={{ 
                                        display: 'block', 
                                        textOverflow: 'ellipsis',
                                        fontWeight: 'bolder'
                                    }} >{ document.name }</Text>
                                </Row>
                                {
                                    (document.directory?.length > 0)
                                        && 
                                            <Col>
                                                {
                                                    !isLegajoList && (
                                                        <Text size={12}>
                                                            Añadido a <Text b >{ document.directory }</Text>
                                                        </Text>
                                                    )
                                                }
                                                <Button size="xs" onPress={showChangeDirectoryMenu}>Cambiar Directorio</Button>
                                            </Col>
                                }
                            </Col>
                        </Grid>
                        <Grid xs={4} css={{ jc: 'flex-end' }}>
                            <Button
                                auto
                                onPress={openMenuOptions}
                                light
                                icon={<IoIosMore fill='currenctColor' size={32}/>}
                            >
                            </Button>
                        </Grid>
                    </Grid.Container>
                </Card.Header>
                <Row>
                    {
                        togglePreview 
                            && <DocumentView src={document.url} />
                    }
                </Row>
                <Row>
                    <Button auto light css={{ w: '100%'  }} color="primary" icon={toggleIcon} onPress={handleTogglePreview.toggle}>{togglePreview ? "Ocultar" : "Vista Previa"}</Button>
                </Row>
            </Card>
            <Modal
                modalTitle={modalTitle}
                closeHandler={ handleToggleModal.close }
                isVisible={ toggleModal }
                >
                {
                    modalChildren 
                    ?   modalChildren 
                    :   <OptionsMenu 
                            options={menuOptions}
                        />    
                }
            </Modal>
        </Grid>
    )
}

export default DocumentCard;