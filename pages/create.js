import { useState } from 'react';
import { Text, Col, Row, Input, Spacer, Button } from '@nextui-org/react';
import Layout from '../components/Layout'
import DocumentsList from '../components/DocumentsList';
import { Dropdown, FilePicker } from '../components/UI';

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

export default function Create ({ legajoDirectories = legajoDefaultDirectories }) {

    const [myLegajo, setMyLegajo] = useState({});

    const [directoryName, setDirectoryName] = useState("");

    const [filesURL, setFilesURL] = useState([]);

    const handleGetFilesURL = (event) => {

        const files = [...event.target.files];

        const filesURL = files.map((file) => URL.createObjectURL(file));

        setFilesURL(filesURL);

    }

    const handleSetDirectoryName = (event) => {

        if (typeof event === "string") {
            setDirectoryName(event);
            return;
        }
        const value = event.target.value;
        setDirectoryName(value);
    }

    const handleSaveDirectory = () => {
        if (directoryName.trim() === '') {
            alert("No has puesto un nombre al directorio");
            return;
        }

        const myNewLegajo = {
            ...myLegajo,
            [directoryName]: filesURL,
        };

        setMyLegajo(myNewLegajo);
        setFilesURL([]);
        setDirectoryName("");
    }

    return (
        <Layout headTitle="Edita tu Legajo">
            <Row>
                <Col>
                    <Row>
                        <Text h1>Crea tu Legajo</Text>
                    </Row>
                    <Row>
                        <FilePicker accept="application/pdf" multiple onChange={handleGetFilesURL} />
                    </Row>
                    <Spacer y={2} />
                    <Row>
                        <Input labelPlaceholder="Nombra el directorio" value={directoryName} onChange={handleSetDirectoryName} />
                        <Spacer x={1} />
                        <Dropdown title="O selecciona uno prestablecidos" items={legajoDirectories} onChange={handleSetDirectoryName} />
                    </Row>
                    <DocumentsList documentsURL={filesURL} />
                    <Spacer y={2} />
                    <Button color="success" disabled={ filesURL.length < 1 || directoryName.trim() === "" } onPress={handleSaveDirectory}>Guardar Directorio</Button>
                    <Spacer y={2} />
                </Col>
            </Row>
            <Col>
                {
                    Object.keys(myLegajo).map((directory) => {
                        const directoryFilesURL = myLegajo[directory] || [];
                        return (
                            <Col>
                                <Text h3>{directory.toUpperCase()}</Text>
                                <DocumentsPreview documentsURL={directoryFilesURL} />
                            </Col>
                        )
                    })
                }
                <Spacer y={2} />
                {
                    Object.keys(myLegajo).length > 0 && (
                        <Row>
                            <Button color="secondary">
                                Guardar Legajo
                            </Button>
                            <Spacer y={2} />
                            <Button flat auto>
                                Descargar Legajo como PDF
                            </Button>
                        </Row>
                    )
                }
                <Spacer y={2} />
            </Col>
        </Layout>
    )
}