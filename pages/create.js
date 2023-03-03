import { useRef, useState, useContext} from 'react';
import { DirectoriesContext } from '../components/context/directoriesContext';
import { UserContext } from '../components/context/userContext';
import { Text, Col, Row, Input, Spacer, Button } from '@nextui-org/react';
import Layout from '../components/Layout';
import DocumentsList from '../components/DocumentsList';
import { Dropdown, FilePicker } from '../components/UI';
import JSZip from "jszip";
import { saveAs } from 'file-saver';
import { IoIosAlbums } from 'react-icons/io';
import Directory from '../Classes/Directory';
import StoreMan from '../Classes/StoreMan';

export default function Create () {

    const { 
        legajoDirectories,
        setLegajoDirectories,
    } = useContext(DirectoriesContext);
    const { user } = useContext(UserContext);
    const [newLegajoDocuments, setNewLegajoDocuments] = useState(new Directory("" , []));
    const [directoryName, setDirectoryName] = useState("GENERAL");
    let directoryNameRef = useRef();

    const getDirName = () => {
        const inputDirName = directoryNameRef.current.value;
        return inputDirName.trim() !== "" ? inputDirName : directoryName;
    }

    const handleGetFiles = async (event) => {
        let { files } = event.target;
        files = [...files];
        const newLegajoDirectory = new Directory(getDirName(), files, "files");
        setNewLegajoDocuments(newLegajoDirectory);
    }

    const handleDownloadLegajo = async () => {
        const zip = new JSZip();
        const documentsBuffers = legajoDirectories.map(async (directory, dirIndex) => {
            const fetchDocuments = directory.documents.map(async (document, docIndex) => {
                const response = await fetch(document.url);
                const arrayBuffer = await response.arrayBuffer();
                let docName = `${dirIndex + 1}. ${directory.name}${docIndex > 0 ? `_${docIndex + 1}` : ""}.pdf`
                zip.file(docName, arrayBuffer, {
                    compression: "DEFLATE",
                    compressionOptions: {
                        level: 5,
                    }
                });
            });

            await Promise.all(fetchDocuments);
        });

        await Promise.all(documentsBuffers);

        const blob = await zip.generateAsync({ type:"blob" })
        saveAs(blob, `Mi Legajuu! - ${user.displayName}`);
        
    }

    const handleSaveDirectory = async function () {
        const isLogged = user ? true : false;
        newLegajoDocuments.name = getDirName();
        StoreMan.saveDirectory(newLegajoDocuments, isLogged);
        setNewLegajoDocuments(new Directory("" , []));
        const legajo = legajoDirectories;
        let directoryExist = false;
        const newLegajoDirectories = legajo.map((dir) => {
            if (dir.name === newLegajoDocuments.name) {
                dir.addDocuments(newLegajoDocuments.documents);
                directoryExist = true;
            }
            return dir;
        });

        if (!directoryExist) {
            newLegajoDirectories.push(newLegajoDocuments);
        }

        setLegajoDirectories(newLegajoDirectories);
    }

    return (
        <Layout headTitle="Edita tu Legajo">
            <Row>
                <Col>
                    <Row>
                        <Text h1>Crea tu Legajo</Text>
                    </Row>
                    <Row>
                        <Dropdown 
                            title="Selecciona un directorio" 
                            items={legajoDirectories.map(dir => dir.name)} 
                            onChange={setDirectoryName} 
                            />
                        <Spacer x={1} />
                        <Input 
                            placeholder="o crea uno nuevo" 
                            ref={directoryNameRef} 
                            />
                        <Spacer x={1} />
                        <FilePicker 
                            accept="application/pdf" 
                            title={"Sube los documentos"} 
                            multiple 
                            onChange={handleGetFiles} 
                            />
                        <Spacer x={1} />
                        {
                            newLegajoDocuments.documents.length > 0 &&
                                <Button 
                                    color="success" 
                                    onPress={handleSaveDirectory}
                                    >
                                    Guardar Directorio
                                </Button>
                        }
                    </Row>
                    {
                        <DocumentsList 
                                isLegajoList
                                isCloudDirectory={false}
                                directory={ newLegajoDocuments } 
                                defaultShowPreview 
                                />
                    }
                    <Spacer y={2} />
                    {
                        newLegajoDocuments.documents.length > 0 && (
                            <Button 
                                color="success" 
                            
                                disabled={ newLegajoDocuments.documents.length < 1} 
                                onPress={handleSaveDirectory}>
                                Guardar Directorio
                            </Button>
                            )
                    }
                    <Spacer y={2} />
                </Col>
            </Row>
            <Row>
                <Col>
                    {
                        legajoDirectories.filter(dir => dir.documents.length > 0).map((directory) => {
                            return (
                                <Row key={JSON.stringify(directory)}>
                                    <Col>
                                        <Text h3>{directory.name}</Text>
                                        <DocumentsList 
                                            isLegajoList
                                            isCloudDirectory={true}
                                            directory={directory} 
                                            isUploadedDirectories
                                            utilityCard={{
                                                onPress: async () => {
                                                    if (directory.documents.length < 2) {
                                                        return false;
                                                    }
                                                    setLoadingDirectories(true);
                                                    directory.joinDirectory().finally(() => {
                                                        setLoadingDirectories(false);
                                                        handleSetState();
                                                    });
                                                },
                                                children:   <>
                                                                <IoIosAlbums size={24} color="gray" />
                                                                <Text b >Unir Documentos</Text>
                                                            </>
                                            }}
                                            />
                                    </Col>
                                </Row>
                            )
                        })
                    }
                    {
                        (legajoDirectories.map(dir => dir.documents).flat().length) < 1 && (
                            <Text b size={24} color="gray">
                                ¿Aún no has creado tu legajo? Sube un documento y selecciona o crea un directorio para empezar.
                            </Text>
                        )
                    }
                </Col>
            </Row>
            {
                (legajoDirectories.map(dir => dir.documents).flat().length > 0) 
                    && 
                        <>
                            <Button color="primary" onPress={handleDownloadLegajo} >Descargar Legajo</Button>
                            <Spacer y={2} />
                        </>
            }
        </Layout>
    )
}