import { useContext } from 'react';
import { Button, Col } from '@nextui-org/react';
import { DirectoriesContext } from './context/directoriesContext';

const Move2Directory = ({ onPress }) => {

    let { legajoDirectories } = useContext(DirectoriesContext);

    legajoDirectories = legajoDirectories.map(dir => dir.name);

    return (
        <Col>
            {
                legajoDirectories.map(directory => (
                    <Button 
                        onPress={() => onPress(directory)}
                        light
                        key={directory} 
                        css={{ w: '100%' }}>
                        { directory }
                    </Button>
                ))
            }
        </Col>
    );
};

export default Move2Directory;