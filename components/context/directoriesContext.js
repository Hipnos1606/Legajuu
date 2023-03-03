import { useState, createContext } from 'react';
import { UserProvider } from './userContext';
import Directory from '../../Classes/Directory';

export const DirectoriesContext = createContext();

let fixedDirectories = ["TÍTULOS", "DOCUMENTOS PERSONALES", "ANTECEDENTES PENALES", "ACUERDO DE NOMBRAMIENTO"];
fixedDirectories = fixedDirectories.map((dirName) => {
    return new Directory(dirName, []);
});

export function DirectoriesProvider({ children }) {

    const [legajoDirectories, setLegajoDirectories] = useState(fixedDirectories);
    const [generalDirectory, setGeneralDirectory] = useState(new Directory("general", []));
    const [loadingDirectories, setLoadingDirectories] = useState(true);
    
    return (
        <DirectoriesContext.Provider value={{
            legajoDirectories,
            generalDirectory,
            loadingDirectories,
            setLegajoDirectories,
            setGeneralDirectory,
            setLoadingDirectories,
        }}>
            <UserProvider>
                { children }
            </UserProvider>
        </DirectoriesContext.Provider>
    )
}