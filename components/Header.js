import { useState, useEffect } from 'react';
import { Navbar, Text, Link, Button } from "@nextui-org/react";
import auth from '../libs/auth';

export default function Header() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscriber = () => auth.instance.authStateChange().then((user) => {
            setUser(user);
        });

        return unsubscriber;
    });

    const signin = () => {
        auth.signInWithGoogle()
            .then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
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
                    <Navbar.Link color="primary" href="/profile">
                        {user.displayName}
                    </Navbar.Link>    
                ) : (
                    <Button light onPress={() => signin()}>
                        Ingresar con Google
                    </Button>
                )
            }
                <Navbar.Link color="inherit" href="/config">
                    Configuración
                </Navbar.Link>
            </Navbar.Content>   
        </Navbar>
    )
}