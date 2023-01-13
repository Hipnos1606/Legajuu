import { useContext, useState } from 'react';
import { UserContext } from './context/userContext';
import { DirectoriesContext } from './context/directoriesContext';
import { 
    Navbar, 
    Text, 
    Button, 
    User, 
    Spacer, 
    Badge,
} from "@nextui-org/react";
import { IoLogoGoogle, IoIosLogOut } from 'react-icons/io';
import NextLink from 'next/link';
import auth from '../libs/auth';
import { Modal } from './UI';

const Link = (props) => (
    <NextLink href={props.href}>
        <Text {...props.textProps} css={{ cursor: 'pointer' }}> {props.text} </Text>
    </NextLink>
    )

    
export default function Header() {
    const { user, setUser, setUserLoading } = useContext(UserContext);
    const { handleSetState  } = useContext(DirectoriesContext);
    const [toggleModal, setToggleModal] = useState(false);

    const handlerModal= () => {
        setToggleModal(true);
    }

    const signOut = async () => {
        setUserLoading(true);
        await auth.instance.signOut()
        setUser(null);
        setUserLoading(false);
        handleSetState();
        setToggleModal(false);
    }

    const signin = async () => {
        setUserLoading(true);
        const response = await auth.instance.signInWithGoogle();
        setUser(response.user);
        handleSetState();
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