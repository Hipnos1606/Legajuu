import { Button } from '@nextui-org/react';

export default function UIFilePicker(props) {

    const { title } = props;

    return (
        <>
            <input type="file" id="file" {...props} hidden />
            <Button color="primary" auto onPress={() => document.querySelector("#file").click()} >
                {
                    title ? title : "Seleccionar Documentos"
                }
            </Button>
        </>
    );
}