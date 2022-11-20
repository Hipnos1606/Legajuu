import { useContext } from 'react';
import { UserContext } from './context/userContext';
import { Navbar, Text, Link } from "@nextui-org/react";
import auth from '../libs/auth';

export default function Header() {
    const { user, setUser } = useContext(UserContext);

    const signin = () => {

        auth.instance.signInWithGoogle()
            .then((res) => {
                setUser(res.user);
            }).catch((err) => {
                console.log(err);
            });

    }

    return (
        <Navbar variant="sticky">
            <Navbar.Brand>
                <Link href="/">
                    <Text  b color="inherit" >
                        LEGAJUU!
                    </Text>
                </Link>
            </Navbar.Brand>
            <Navbar.Content hideIn="xs" variant="underline">
                <Navbar.Link href="/my_documents">Mis documentos</Navbar.Link>
                <Navbar.Link href="/create">Crear mi Legajo</Navbar.Link>
            </Navbar.Content>
            <Navbar.Content>
            {
                user? (
                    <Navbar.Link color="primary" onPress={auth.instance.signOut} >
                        {user.displayName}
                    </Navbar.Link>    
                ) : (
                    <Navbar.Link light onPress={() => signin()}>
                        Ingresar con Google
                    </Navbar.Link>
                )
            }
            </Navbar.Content>   
        </Navbar>
    )
}