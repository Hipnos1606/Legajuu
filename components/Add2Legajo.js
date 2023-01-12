import { useContext, useRef } from 'react';
import { DirectoriesContext } from './context/directoriesContext';
import { Col, Button, Input, Spacer } from '@nextui-org/react';
import { Dropdown } from './UI';

const Add2Legajo = ({ document }) => {
    const { directoriesList, handleSaveDirectory } = useContext(DirectoriesContext);
    let inputRef = useRef();

    const handleChangeInputValue = (value) => {
        inputRef.current.value = value;
    }

    return (
        <Col>
            <Dropdown 
                css={{ w: '100%'}}
                items={directoriesList} 
                title="Selecciona un Directorio" 
                onChange={handleChangeInputValue} />
            <Spacer y={1} />
            <Input 
                css={{ w: '100%'}}
                ref={inputRef}
                placeholder="O Crea un Nuevo Directorio" 
                defaultValue={''} />
            <Spacer y={1} />
            <Button css={{ w: '100%'}} onPress={() => handleSaveDirectory([document], inputRef.current.value)}>¡Listo!</Button>
        </Col>
    );
};

export default Add2Legajo;