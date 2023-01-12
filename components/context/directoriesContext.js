import React from 'react';
import store from '../../libs/store';
import Directory from '../../libs/directory';

export const DirectoriesContext = React.createContext();

const directoriesFixed = ["TÍTULOS", "DOCUMENTOS PERSONALES", "ANTECEDENTES PENALES", "ACUERDO DE NOMBRAMIENTO"];

export function DirectoriesProvider({ children }) {

    const [directories, setDirectories] = React.useState([]);
    const [allDocuments, setAllDocuments] = React.useState([]);
    const [directoriesList, setDirectoriesList] = React.useState(directoriesFixed);
    const [loadingDirectories, setLoadingDirectories] = React.useState(true);

    const getFilteredDirectories = (directories) => {
        return directories.filter((directory) => {
            return (directory.documents.length > 0)
        });
    };

    const getDirectoriesList = (directories) => {
        const storedDirectories = directories.map(directory => directory.name);
        const mergedDirectoryList = new Set([...storedDirectories, ...directoriesFixed]);
        return [...mergedDirectoryList];
    }

    
    const handleGetDirectories = async () => {
        setLoadingDirectories(true);
        const cloudDirectories = await store.getDirectories();
        const directoriesList = getDirectoriesList(cloudDirectories);
        setDirectoriesList(directoriesList);
        const filteredDirectories = getFilteredDirectories(cloudDirectories);
        setDirectories(filteredDirectories);
        setLoadingDirectories(false);
    }
    
    const handleGetAllDocuments = async () => {
        const documents = await store.getAllDocs();
        setAllDocuments(documents);
    }
    
    const handleSetState = async () => {
        await handleGetDirectories();
        await handleGetAllDocuments();
        setLoadingDirectories(false);
    }

    const handleSaveDirectory = async (files, directoryName) => {
        setLoadingDirectories(true);
        let directory = new Directory();
        if (directoryName.trim() === "") {
            alert("Porfavor selecciona un directorio o crea uno nuevo");
            return;
        }
        directory.setName(directoryName);
        directory.setDocuments(files);
        await directory.save()
        handleSetState();
        directory = null;
    }
    
    return (
        <DirectoriesContext.Provider value={{
            directories,
            directoriesList, 
            loadingDirectories,
            allDocuments,
            handleSetState,
            setLoadingDirectories,
            handleGetAllDocuments,
            handleGetDirectories,
            handleSaveDirectory,
        }}>
            { children }
        </DirectoriesContext.Provider>
    )
}