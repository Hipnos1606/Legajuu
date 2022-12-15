import { useContext } from 'react';
import { UserContext } from './context/userContext';
import { DirectoriesContext } from './context/directoriesContext';
import { 
    Navbar, 
    Text, 
    Link, 
    Row, 
    Button, 
    User, 
    Spacer, 
    Badge,
} from "@nextui-org/react";
import auth from '../libs/auth';

export default function Header() {
    const { user, setUser, setUserLoading } = useContext(UserContext);
    const { handleGetDirectories } = useContext(DirectoriesContext);

    const signOut = () => {
        setUserLoading(true);
        console.log("sign out");
        auth.instance.signOut().finally(() => {
            setUser(null);
            setUserLoading(false);
            handleGetDirectories();
            console.log("sign out successfully");
        });
    }

    const signin = () => {
        setUserLoading(true);
        auth.instance.signInWithGoogle()
            .then((res) => {
                setUser(res.user);
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                setUserLoading(false);
                handleGetDirectories();
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
                <Spacer x={0.2} />
                <Badge color="primary">
                    BETA
                </Badge>
            </Navbar.Brand>
            <Navbar.Content hideIn="xs" variant="underline">
                <Navbar.Link href="/my_documents">Mis documentos</Navbar.Link>
                <Navbar.Link href="/create">Crear mi Legajo</Navbar.Link>
            </Navbar.Content>
            <Navbar.Content>
            {
                user ? (
                    <User
                        size="sm"
                        src={user.photoURL}
                        name={user.displayName}
                        zoomed
                        pointer
                        >
                            <User.Link href={`javascript:${signOut}`} ></User.Link>
                        </User>
                ) : (
                    <Button color="light" onPress={signin}>
                        Ingresar con Google
                    </Button>
                )
            }
            </Navbar.Content>   
        </Navbar>
    )
}