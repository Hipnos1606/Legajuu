import { Component } from 'react';
import Head from 'next/head';
import { Container } from "@nextui-org/react";
import { UserProvider } from './context/userContext';
import Header from './Header';
import { LoadingScreen } from './UI';
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
            <UserProvider>
                <Head>
                    <title>{title}</title>
                    <meta name={meta.name} content={meta.content} />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Header />
                    <LoadingScreen visible={this.state.loading} />
                    <Container css={containerCss} fluid>
                        <main>
                            { children }
                        </main>
                    </Container>
            </UserProvider>
        )
    }
}

export default Layout;