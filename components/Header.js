import { Navbar, Text, Button, Link } from "@nextui-org/react";

export default function Header() {
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
                <Navbar.Link color="inherit" href="/">
                    Inicio   
                </Navbar.Link>
                <Navbar.Link color="inherit" href="/config">
                    Configuración
                </Navbar.Link>
            </Navbar.Content>   
        </Navbar>
    )
}