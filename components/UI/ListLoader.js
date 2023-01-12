import { Loading, Container } from '@nextui-org/react';

const ListLoader = () => {
    return  <Container 
                fluid 
                css={{ 
                    w: '100%', 
                    h: '100%', 
                    position: "absolute", 
                    bg: 'white', 
                    zIndex: 1,
                }}>
                <Loading 
                    css={{ 
                        alignSelf: "center",
                        position: "absolute",
                        left: '50%',
                        top: '50%',
                        transform: "translateX(-50%) translateY(-50%)"
                    }}>Recuperando...</Loading>
            </Container>
}

export default ListLoader;