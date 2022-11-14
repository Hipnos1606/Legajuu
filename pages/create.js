import { useState, useRef, useEffect } from 'react';
import { Text, Col, Row, Input, Spacer, Button } from '@nextui-org/react';
import Layout from '../components/Layout'
import DocumentsList from '../components/DocumentsList';
import { Dropdown, FilePicker } from '../components/UI';
import auth from '../libs/auth';
import Directory from '../libs/directory';
import store from '../libs/store';

const legajoDefaultDirectories = [
    {
        key: "títulos",
        title: "Títulos",
    },
    {
        key: "documentos_personales",
        title: "Documentos Personales",
    }
];

export default function Create () {
    
    const [user, setUser] = useState(auth.currentUser);

    const [documentsToUpload, setDocumentsToUpload] = useState([]);

    const [directories, setDirectories] = useState([]);

    useEffect(() => {
        auth.instance.authStateChange().then(async (user) => {

            setUser(user);

            if (user) {

                const querySnapshot = await store.getDirectories();

                let storedDirectories = [];

                querySnapshot.forEach((doc) => {

                    const directory = {

                        name: doc.id,

                        documents: doc.data().documents,

                    }
                    
                    storedDirectories.push(directory);
                });

                setDirectories(storedDirectories);
            }
        });
    }, []);


    let directoryNameRef = useRef();
    const directoryName = () => directoryNameRef.current.value;

    const handleGetFiles = (event) => {
        let { files } = event.target;
        setDocumentsToUpload(files);
    }

    const handleSetDirectoryName = (text) => {
        directoryNameRef.current.focus();
        directoryNameRef.current.value = text;

    }

    const handleSetDirectory = () => {

        const name = directoryName().trim().toUpperCase();

        if (name === "") {

            alert("No has puesto un nombre al directorio");

            return;

        }

        const directoryExist = directories.find((directory) => directory.name === name);
        
        if (!directoryExist) {

            const newDirectory = new Directory();

            newDirectory.setDocuments(documentsToUpload);
            newDirectory.setName(name);
                newDirectory.save().then(() => {
                
                setDirectories([...directories, newDirectory.toJSON()]);

                setDocumentsToUpload([]);

                handleSetDirectoryName('');

            }).catch((err) => {
                console.log(err);
            });
        }

    }

    return (
        <Layout headTitle="Edita tu Legajo">
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
                        <Input labelPlaceholder="Nombra el directorio" ref={directoryNameRef} />
                        <Spacer x={1} />
                        <Dropdown title="O selecciona uno prestablecidos" items={legajoDefaultDirectories} onChange={handleSetDirectoryName} />
                        <Spacer x={1} />
                        {
                            documentsToUpload.length > 0 &&
                                <Button color="success" onPress={handleSetDirectory}>Guardar Directorio</Button>
                        }
                    </Row>
                    <DocumentsList documents={ [...documentsToUpload].map((document) => ({ name: document.name, url: URL.createObjectURL(document) })) } />
                    <Spacer y={2} />
                    <Button color="success" disabled={ documentsToUpload.length < 1} onPress={handleSetDirectory}>Guardar Directorio</Button>
                    <Spacer y={2} />
                </Col>
            </Row>
            <Col>
                {
                    directories.map((directory) => {
                        return (
                            <Col key={JSON.stringify(directory)}>
                                <Text h3>{directory.name}</Text>
                                <DocumentsList documents={directory.documents} />
                            </Col>
                        )
                    })
                }
            </Col>
        </Layout>
    )
}