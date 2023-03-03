import { useState, useContext } from 'react';
import { Text, Col, Row, Spacer, Grid, Button } from '@nextui-org/react';
import Layout from '../../components/Layout';
import DocumentsList from '../../components/DocumentsList';
import { FilePicker } from '../../components/UI';
import { DirectoriesContext } from "../../components/context/directoriesContext";
import Directory from '../../Classes/Directory';
import Document from '../../Classes/Document';
import Store from '../../Classes/Store';

export default function MyDocuments () {
    const [ newDocuments, setNewDocuments ] = useState(new Directory("general", []));
    const { generalDirectory } = useContext(DirectoriesContext);

    const handleGetFile = async (event) => {
        const selectedDocuments = [...event.target.files].map((file) => {
            return new Document(file);
        });
        
        setNewDocuments(new Directory("general", selectedDocuments));
    }

    const handleSaveDocuments = () => {
        Store.save(newDocuments);
    }

    return (
        <Layout headTitle="Gestiona tus documentos">
                <Row>
                    <Col>
                        <Row>
                            <Text h1>Sube y gestiona tus Documentos</Text>
                        </Row>
                        <Row>
                            <Col>
                                <Row>
                                    <FilePicker accept="application/pdf" title={newDocuments.documents.length ? "Elegir otros documento" : "Selecciona uno o varios documento"} multiple onChange={handleGetFile} />
                                </Row>
                                <Spacer y={1} />
                                {
                                    newDocuments.documents.length > 0 && (
                                        <Row align='center' >
                                            <Button auto onPress={handleSaveDocuments} color="success" type='submit' >Guardar Documento</Button> 
                                        </Row>)
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Grid.Container gap={2}>
                    {
                        <DocumentsList defaultShowPreview={true} directory={newDocuments} />
                    }
                </Grid.Container>
                <Spacer y={1} />
                                {
                                    newDocuments.documents.length > 0 && (
                                        <Row align='center' >
                                            <Button auto onPress={handleSaveDocuments} color="success" >Guardar Documento{ (newDocuments.length > 1) ? "s" : ""}</Button> 
                                        </Row>)
                                }
                <Spacer y={1} />
                <Row css={{ jc: 'center', ai: 'center' }}>
                    {
                        (generalDirectory.documents.length === 0) ?
                        (
                            <Text size={24} b color="gray">
                                Aún no tienes documentos, sube tus documentos para poder verlos aquí...
                            </Text>
                        ) : (
                            <DocumentsList 
                            defaultShowPreview={false}
                            directory={generalDirectory} 
                            isStoredDirectories 
                            />
                        )
                    }
                </Row>
        </Layout>
    )
}