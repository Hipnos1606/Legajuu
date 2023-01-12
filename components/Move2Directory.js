import { useContext } from 'react';
import { Button, Col } from '@nextui-org/react';
import { DirectoriesContext } from './context/directoriesContext';

const Move2Directory = ({ onPress }) => {

    const { directoriesList } = useContext(DirectoriesContext);

    return (
        <Col>
            {
                directoriesList.map(directory => (
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