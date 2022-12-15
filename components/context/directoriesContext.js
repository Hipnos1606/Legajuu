import React from 'react';
import auth from '../../libs/auth';
import store from '../../libs/store';

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
        const directories = await store.getDirectories();
        const directoriesList = getDirectoriesList(directories);
        setDirectoriesList(directoriesList);
        const filteredDirectories = getFilteredDirectories(directories);
        setDirectories(filteredDirectories);
        setLoadingDirectories(false);
    }

    const handleGetAllDocuments = async () => {
        const documents = await store.getAllDocs();
        setAllDocuments(documents);
    }
    
    return (
        <DirectoriesContext.Provider value={{
            directories,
            directoriesList, 
            loadingDirectories,
            setLoadingDirectories,
            allDocuments,
            handleGetAllDocuments,
            handleGetDirectories,
        }}>
            { children }
        </DirectoriesContext.Provider>
    )
}