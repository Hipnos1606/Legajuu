import Head from 'next/head';
import { Container } from "@nextui-org/react";
import Header from './Header';

function Layout (props) {

    const { 
        headTitle,
        children,
        meta = {
            name: "description",
            content: "Crea tu Legajo de forma rápida y segura, guarda todos tus documentos en un sólo lugar y buscalos desde cualquier lugar.",
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