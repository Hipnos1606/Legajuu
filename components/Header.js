import { useContext, useState } from 'react';
import { UserContext } from './context/userContext';

import { 
    Navbar, 
    Button, 
    User, 
    Spacer, 
    Badge,
} from "@nextui-org/react";

import { 
    IoLogoGoogle, 
    IoIosLogOut 
} from 'react-icons/io';

import { Modal } from './UI';
import Auth from '../Classes/Auth';
import Link from './UI/Link';
import StoreMan from '../Classes/StoreMan';
import { DirectoriesContext } from './context/directoriesContext';

    
export default function Header() {
    const { user, setUser, setUserLoading } = useContext(UserContext);
    const { setLegajoDirectories, setGeneralDirectory } = useContext(DirectoriesContext);
    const [toggleModal, setToggleModal] = useState(false);

    const handlerModal= () => {
        setToggleModal(true);
    }

    const signOut = async () => {
        await Auth.signOut()
        setUser(null);
        setToggleModal(false);
    }

    const signin = async () => {
        if (user) return false;
        const session = await Auth.signIn();
        const state = StoreMan.initialize();
        setUser(session);
        setLegajoDirectories(state.legajoDirectories);
        setGeneralDirectory(state.generalDirectory);
        setUserLoading(false);
    }

    return (
        <>
        <Navbar variant="sticky">
            <Navbar.Brand>
                <Link href="/" text="LEGAJUU!" textProps={{ b: true, color: 'inherit'}} />
                <Spacer x={0.2} />
                <Badge color="primary">
                    BETA
                </Badge>
            </Navbar.Brand>
            <Navbar.Content hideIn="xs" variant="underline">
                <Link href="/documents" textProps={{ b: true }} text="Mis documentos" />
                <Link href="/create" textProps={{ b: true }} text="Crear mi Legajo" />
            </Navbar.Content>
            <Navbar.Content>
            {
                user ? (
                    <User
                        size="sm"
                        src={ user.photoURL }
                        name={ user.displayName }
                        onClick={ handlerModal }
                        zoomed
                        pointer  
                        />
                ) : (
                    <Button 
                        color="light" 
                        icon={
                            <IoLogoGoogle fill="currentColor" />
                        } 
                        onPress={signin}>
                        Ingresar con Google
                    </Button>
                )
            }
            </Navbar.Content>   
        </Navbar>
        <Modal isVisible={toggleModal} closeHandler={() => setToggleModal(false)}>
            <Button>
                <Link textProps={{ b: true, color: 'white' }} href="/documents" text="Mis documentos" />
            </Button>
            <Button>
                <Link textProps={{ b: true, color: 'white' }} href="/create" text="Crear mi Legajo" />
            </Button>
            <Button 
                color="default" 
                onPress={signOut}
                icon={
                    <IoIosLogOut fill="currentColor" />
                }
                >
                Cerrar sesión
            </Button>
        </Modal>
        </>
    )
}