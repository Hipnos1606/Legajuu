import React from 'react';
import auth from '../../libs/auth';

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {

    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        const unsubscriber = () => auth.instance.authStateChange().then((user) => {
            setUser(user);
        });

        return unsubscriber;
    }, []);

    return (
        <UserContext.Provider value={{
            user,
            setUser,
        }}>
            { children }
        </UserContext.Provider>
    )   
}