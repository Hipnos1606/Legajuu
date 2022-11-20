import { useState, useRef, useEffect } from 'react';
import { Text, Col, Row, Input, Spacer, Button } from '@nextui-org/react';
import Layout from '../components/Layout'
import DocumentsList from '../components/DocumentsList';
import { Dropdown, FilePicker, LoadingScreen } from '../components/UI';
import auth from '../libs/auth';
import Directory from '../libs/directory';
import store from '../libs/store';

const defaultDirectories = ["TÍTULOS", "DOCUMENTOS PERSONALES", "ANTECEDENTES PENALES", "ACUERDO DE NOMBRAMIENTO"];

export default function Create () {

    const [selectedDocuments, setSelectedDocuments] = useState([]);
    
    const [files, setFiles] = useState([]);

    const [directories, setDirectories] = useState([]);

    const [loading, setLoading] = useState(true);

    const [legajoDefaultDirectories, setLegajoDefaultDirectories] = useState(defaultDirectories);

    const orderStoredDirectories = (storedDirectories) => {

        let newLegajoDefaultDirectories = new Set([...storedDirectories.map((directory) => directory.name), ...defaultDirectories]);

        setLegajoDefaultDirectories([...newLegajoDefaultDirectories]);

        const newStoredDirectories = storedDirectories.filter((directory) => directory.documents.length > 0);

        return newStoredDirectories;

    }

    const handleGetDirectories = async () => {

        let storedDirectories = await store.getDirectories();

        let orderedDirectories = orderStoredDirectories(storedDirectories);

        setDirectories(orderedDirectories);

        setFiles([]);

        handleSetDirectoryName("");

        setLoading(false);

    }

    useEffect(() => {

        auth.instance.authStateChange().then(async (user) => {

            console.log(user);

            if (user) {

                handleGetDirectories();
                
            }

                setLoading(false);
            
        });
    }, []);


    let directoryNameRef = useRef();

    const handleGetFiles = (event) => {

        let { files } = event.target;
        let directory = new Directory();
        directory.setDocuments(files);
        setFiles([...files]);
        setSelectedDocuments(directory.getFormattedDocuments());
        directory = null;
    }

    const handleSetDirectoryName = (text) => {

        directoryNameRef.current.focus();
        directoryNameRef.current.value = text;

    }

    const handleSetDirectory = () => {

        setLoading(true);

        let directory = new Directory();

        directory.setName(directoryNameRef.current.value);

        directory.setDocuments(files);

        directory.save().then(async () => {

            handleGetDirectories();

            setSelectedDocuments([]);

        });

        directory = null;
    }

    const deleteDoc = {
        fromStore: (document) => {
            setLoading(true);
            Directory.deleteDoc(document).then(async () => {

                const storedDirectories = await store.getDirectories();

                setDirectories(orderStoredDirectories(storedDirectories));

                setLoading(false);
                
            });
            
        },
        fromUpload: (document) => {

            const modifiedDocuments = selectedDocuments.filter((uploadDoc) => {

                const documentToDelete = JSON.stringify(document);
                const actualUploadDoc = JSON.stringify(uploadDoc);
                return documentToDelete !== actualUploadDoc;

            });

            setSelectedDocuments(modifiedDocuments);

        },
        
    }

    return (
        <Layout headTitle="Edita tu Legajo">
        <LoadingScreen visible={loading} />
            <Row>
                <Col>
                    <Row>
                        <Text h1>Crea tu Legajo</Text>
                    </Row>
                    <Row>
                        <FilePicker accept="application/pdf" title={"Selecciona los documentos"} multiple onChange={handleGetFiles} />
                    </Row>
                    <Spacer y={2} />
                    <Row>
                        <Dropdown title="Selecciona un directorio" items={legajoDefaultDirectories} onChange={handleSetDirectoryName} />
                        <Spacer x={1} />
                        <Input labelPlaceholder="o crea uno nuevo" ref={directoryNameRef} />
                        <Spacer x={1} />
                        {
                            selectedDocuments.length > 0 &&
                                <Button color="success" onPress={handleSetDirectory}>Guardar Directorio</Button>
                        }
                        <Spacer x={1} />
                        <Button color="primary" onPress={() => { setLoading(true); handleGetDirectories();}}>Actualizar</Button>
                    </Row>
                    <DocumentsList documents={ selectedDocuments } deleteAction={deleteDoc.fromUpload} />
                    <Spacer y={2} />
                    {
                        selectedDocuments.length > 0 && <Button color="success" disabled={ selectedDocuments.length < 1} onPress={handleSetDirectory}>Guardar Directorio</Button>
                    }
                    <Spacer y={2} />
                </Col>
            </Row>
            <Col>
                {
                    directories.map((directory) => {
                        return (
                            <Col key={JSON.stringify(directory)}>
                                <Text h3>{directory.name}</Text>
                                <DocumentsList documents={directory.documents} deleteAction={deleteDoc.fromStore} />
                            </Col>
                        )
                    })
                }
            </Col>
        </Layout>
    )
}