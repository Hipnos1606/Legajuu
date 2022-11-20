import { Grid, Card, Text, Button, Row } from '@nextui-org/react';
import { IoIosTrash } from 'react-icons/io';
import DocumentView from './DocumentView';

const DocumentCard = (props) => {

    const { gridNum, document, deleteAction } = props;

    return (
        <Grid xs={gridNum} key={JSON.stringify(document)}>
            <Card>
                <Card.Header css={{ bg: "#e6e8f1", position: "absolute", top: 0, w: "100%" }} >
                    <Row css={{ jc: "space-between" }}>
                        <Text b css={{ w: '80%', overflow: "hidden"}} >{document.name}</Text>
                        <Button 
                            auto
                            flat
                            icon={<IoIosTrash size={32} />}
                            onPress={() => deleteAction(document)} 
                            />
                    </Row>
                </Card.Header>
                <DocumentView src={document.url} />
            </Card>
        </Grid>
    )
}

export default DocumentCard;