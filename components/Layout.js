import Head from 'next/head';
import { Container } from "@nextui-org/react";
import Header from './Header';

function Layout (props) {

    const { 
        headTitle,
        children,
        meta = {
            name: "description",
            content: "Legajuu es una aplicación dirigida a docentes hondureños que facilita la gestión de documentos y la creación de legajos para la secretaría de educación. La aplicación permite almacenar documentos PDF en la nube, crear y modificar legajos, convertir imágenes a PDF, unir archivos PDF, y descargar el legajo en un archivo comprimido. Es fácil de usar y segura.",
        },
        containerCss
    } = props;

    const title = `Legajuu! | ${ headTitle }`;

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name={meta.name} content={meta.content} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <Container css={containerCss}>
                <main>
                    { children }
                </main>
            </Container>
        </>
    )
}

export default Layout;