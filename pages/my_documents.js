import { useState } from 'react';
import { Text, Col, Row, Input, Spacer, Button, Card } from '@nextui-org/react';
import Layout from '../components/Layout'
import { FilePicker } from '../components/UI';

export default function MyDocuments () {

    const [files, setFiles] = useState([]);
    const [file, setFile] = useState({ data: null, name: "" });

    const handleGetFile = (event) => {
        const fileToProcess = event.target.files[0];

        const newFile = {
            ...file,
            data: fileToProcess,
        }

        setFile(newFile);
    }

    return (
        <Layout headTitle="Edita tu Legajo">
            <Row>
                <Col>
                    <Row>
                        <Text h1>Sube tus Documentos</Text>
                    </Row>
                    <Row>
                        <Col>
                            <FilePicker accept="application/pdf" title={file.data ? "Elegir otro documento" : "Selecciona un documento"} multiple onChange={handleGetFile} />
                            <Spacer y={2} />
                            {
                                file.data && <Input labelPlaceholder="Nombre del documento" value={file.name} />
                            }
                            <Spacer y={1} />
                            {
                                file.data && (
                                    <Card>
                                        <iframe src={URL.createObjectURL(file.data)} width="100%" frameBorder={0} height="400px" />
                                    </Card>
                                )
                            }
                        </Col>
                    </Row>
                    <Spacer y={2} />
                    {
                        file.data && <Button color="success" onPress={() => {}}>Guardar Documento</Button>
                    }
                    <Spacer y={2} />
                </Col>
            </Row>
        </Layout>
    )
}