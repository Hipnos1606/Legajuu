import { useState, useContext, useEffect, createContext } from 'react';
import { DirectoriesContext } from './directoriesContext';
import { LoadingScreen } from '../UI';
import User from '../../Classes/User';
import Auth from '../../Classes/Auth';
import StoreMan from '../../Classes/StoreMan';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const { setLegajoDirectories, setGeneralDirectory, setLoadingDirectories } = useContext(DirectoriesContext);
    const [loading, setUserLoading] = useState(true);

    const initUser = async (session, type) => {
        if (session === null) {
            setUser(null);
            setUserLoading(false);
            setLoadingDirectories(false);
            return;
        }
        session = new User(session);
        const state = await StoreMan.initialize(session);
        setUser(session);
        setLegajoDirectories(state.legajoDirectories);
        setGeneralDirectory(state.generalDirectory);

        if (type === "cloud") {
            window.sessionStorage.setItem('legajuu_user', JSON.stringify(cloudSession));
        }
        
        setUserLoading(false);
        setLoadingDirectories(false);
        state = null;
        session = null;

    }


    useEffect(() => {
        var localSession = JSON.parse(window.sessionStorage.getItem('legajuu_user'));
        if (localSession !== null) {
            initUser(localSession, "local");
        } else {
            Auth.onAuthStateChanged().then(cloudSession => {
                initUser(cloudSession);
            });
        }
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