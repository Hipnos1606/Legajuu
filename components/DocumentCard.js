import { useState } from 'react';
import { Grid, Card, Col, Text, Button, Row, Badge } from '@nextui-org/react';
import { IoIosArrowDown, IoIosArrowUp, IoIosTrash, IoIosClose } from 'react-icons/io';
import DocumentView from './DocumentView';

const DocumentCard = (props) => {

    const { gridNum, document, deleteAction, defaultShowPreview, isLegajoList } = props;

     const [showPreview, setShowPreview] = useState(defaultShowPreview);
    
    const togglePreview = () => {
        setShowPreview(!showPreview);
    }

    const toggleIcon = showPreview ?  <IoIosArrowUp size={32} /> : <IoIosArrowDown size={32} />;

    return (
        <Grid xs={gridNum} key={JSON.stringify(document)}>
            <Card css={{ h: 'fit-content' }}>
                <Card.Header css={{ bg: "#e6e8f1", w: "100%" }} >
                    <Grid.Container>
                        <Grid xs={8}>
                            <Col>
                                <Row>
                                    <Badge size="xs" color={document.local ? "primary" : "success"} >{document.hasOwnProperty('local') ? "Local" : "En Nube"}</Badge>
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
                                            <Row>
                                                <Text size={12}>
                                                    Añadido a <Text b >{ document.directory }</Text>
                                                </Text>
                                            </Row>
                                }
                            </Col>
                        </Grid>
                        <Grid xs={4} css={{ jc: 'flex-end' }}>
                            <Button 
                                auto
                                flat
                                icon={isLegajoList ? <IoIosClose size={32} /> : <IoIosTrash size={32} />}
                                onPress={() => deleteAction(document)}  
                                />
                        </Grid>
                    </Grid.Container>
                </Card.Header>
                <Row>
                    {
                        showPreview 
                            && <DocumentView src={document.url} />
                    }
                </Row>
                <Row>
                    <Button auto light css={{ w: '100%'  }} color="primary" icon={toggleIcon} onPress={togglePreview}>{showPreview ? "Ocultar" : "Vista Previa"}</Button>
                </Row>
            </Card>
        </Grid>
    )
}

export default DocumentCard;