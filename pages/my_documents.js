import { useState, useContext } from 'react';
import { Text, Col, Row, Spacer, Grid, Button } from '@nextui-org/react';
import Layout from '../components/Layout';
import DocumentsList from '../components/DocumentsList';
import { FilePicker } from '../components/UI';
import { DirectoriesContext } from "../components/context/directoriesContext";
import Directory from '../libs/directory';

export default function MyDocuments () {

    const [ directory, setDirectory ] = useState(new Directory());
    const { allDocuments, handleGetAllDocuments } = useContext(DirectoriesContext);

    const handleGetFile = (event) => {
        const selectedDocuments = [...event.target.files];
        const newDirectory = new Directory();
        newDirectory.setDocuments(selectedDocuments);
        setDirectory(newDirectory);
    }

    const handleSaveDocuments = () => {
        directory.save().finally(() => {
            setDirectory(new Directory());
            handleGetAllDocuments();
        });
    }

    const handleDeleteDocument = {

        fromStore: (document) => {
            store.deleteDoc(document).finally(async () => {
                handleGetDirectories();
            });
            
        },
        
        fromUpload: (documentToDelete) => {

            const modifiedDocuments = directory.documents.filter((selectedDocument) => {
                const documentToDelete = JSON.stringify(documentToDelete);
                const actualUploadDoc = JSON.stringify(selectedDocument);
                return documentToDelete !== actualUploadDoc;
            });

            const newDirectory = new Directory();
            newDirectory.setDocuments(modifiedDocuments);

            setDirectory(newDirectory);
        },
        
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
                                    <FilePicker accept="application/pdf" title={directory.documents.length ? "Elegir otros documento" : "Selecciona uno o varios documento"} multiple onChange={handleGetFile} />
                                </Row>
                                <Spacer y={1} />
                                {
                                    directory.documents.length > 0 && (
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
                        <DocumentsList defaultShowPreview={true} deleteAction={handleDeleteDocument.fromUpload} documents={directory.getFormattedDocuments()} />
                    }
                </Grid.Container>
                <Spacer y={1} />
                                {
                                    directory.documents.length > 0 && (
                                        <Row align='center' >
                                            <Button auto onPress={handleSaveDocuments} color="success" >Guardar Documento{ (directory.documents.length > 1) ? "s" : ""}</Button> 
                                        </Row>)
                                }
                <Spacer y={1} />
                <Row>
                    {
                        <DocumentsList 
                            defaultShowPreview={false} 
                            documents={allDocuments} 
                            isStoredDirectories 
                            deleteAction={handleDeleteDocument.fromStore}

                            />
                    }
                </Row>
        </Layout>
    )
}