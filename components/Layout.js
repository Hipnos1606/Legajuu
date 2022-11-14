import { Component } from 'react';
import Head from 'next/head';
import { Container, Card, Loading } from "@nextui-org/react";
import Header from '../components/Header';
import auth from '../libs/auth';

class Layout extends Component {

    state = {
        user: null,
        loading: true,
    }

    componentDidMount() {
        auth.instance.authStateChange().then((user) => this.setState({loading: false, user,}));
    }

    render() {

        const { 
            headTitle,
            children,
            meta = {
                name: "description",
                content: "Crea tu Legajo de forma rápida y fácil",
            },
            containerCss
        } = this.props;

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
                        {
                            this.state.loading ? (
                                <Card css={{ 
                                    mw: '100px', 
                                    minHeight: '100px', 
                                    ai: 'center', 
                                    jc: 'center', 
                                    ml: '50%', 
                                    mt: '10%',
                                    transform: 'translateX(-50%) translateY(-50%)',
                                }}>
                                    <Loading />
                                </Card>
                            )
                            : children
                        }
                    </main>
                </Container>
            </>
        )
    }
}

export default Layout;