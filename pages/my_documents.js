import { useState } from 'react';
import { Text, Col, Row, Spacer, Grid, Button } from '@nextui-org/react';
import Layout from '../components/Layout';
import DocumentsList from '../components/DocumentsList';
import http from '../libs/http';
import { FilePicker } from '../components/UI';

export default function MyDocuments ({ allDocuments }) {

    const [uploadDocuments, setUploadDocuments] = useState([]);

    const handleGetFile = (event) => {

        const selectedDocuments = [...event.target.files];

        setUploadDocuments(selectedDocuments);

    }

    return (
        <Layout headTitle="Gestiona tus documentos">
            <form action={http.instance.baseURL + "documents/upload"}  encType="multipart/form-data" method='POST'>
                <Row>
                    <Col>
                        <Row>
                            <Text h1>Sube y gestiona tus Documentos</Text>
                        </Row>
                        <Row>
                            <Col>
                                <Row>
                                    <FilePicker accept="application/pdf" title={uploadDocuments ? "Elegir otros documento" : "Selecciona un documento"} multiple onChange={handleGetFile} />
                                </Row>
                                <Spacer y={1} />
                                {
                                    uploadDocuments.length > 0 && (
                                        <Row align='center' >
                                            <Button auto color="success" type='submit' >Guardar Documento</Button> 
                                        </Row>)
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Grid.Container gap={2}>
                    {
                        <DocumentsList documents={uploadDocuments} />
                    }
                </Grid.Container>
                <Spacer y={1} />
                                {
                                    uploadDocuments.length > 0 && (
                                        <Row align='center' >
                                            <Button auto type='submit' color="success" >Guardar Documento</Button> 
                                        </Row>)
                                }
                <Spacer y={1} />
                
                    
            </form>
        </Layout>
    )
}

export async function getServerSideProps(context) {

    return {
        props: {
        }
    };
}