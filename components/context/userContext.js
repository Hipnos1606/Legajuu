import { useState, useContext, useEffect,createContext } from 'react';
import auth from '../../libs/auth';
import { DirectoriesContext } from './directoriesContext';
import { LoadingScreen } from '../UI';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setUserLoading] = useState(true);
    const { 
        handleSetState,
        setLoadingDirectories,
    } = useContext(DirectoriesContext);

    const init = (user) => {
        setUser(user);
        handleSetState();
        setUserLoading(false);
        setLoadingDirectories(false);
    }

    useEffect(() => {
        (async () => {
            const user = await auth.instance.authStateChange();
            init(user);
        })()
    }, []);

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