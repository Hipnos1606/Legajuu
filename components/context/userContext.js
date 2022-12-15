import { useState, useContext, useEffect,createContext } from 'react';
import auth from '../../libs/auth';
import { DirectoriesContext } from './directoriesContext';
import { LoadingScreen } from '../UI';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(auth.instance.currentUser());
    const [loading, setUserLoading] = useState(true);
    const { handleGetAllDocuments, handleGetDirectories } = useContext(DirectoriesContext);

    useEffect(() => {
        auth.instance.authStateChange().then((user) => {
            setUser(user);
            handleGetAllDocuments(user);
            handleGetDirectories(user);
        }).finally(() => setUserLoading(false));
    }, [handleGetAllDocuments, handleGetDirectories]);

    return (
        <UserContext.Provider value={{
            user,
            setUser,
            setUserLoading,
        }}>
            <LoadingScreen visible={loading} />
            { children }
        </UserContext.Provider>
    )   
}