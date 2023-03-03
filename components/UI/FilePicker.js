import { Button } from '@nextui-org/react';

export default function UIFilePicker(props) {

    const { title } = props;

    return (
        <>
            <input type="file" name="document" id="document" {...props} hidden />
            <Button id="select_document" color="primary" auto onPress={() => document.querySelector("#document").click()} >
                {
                    title ? title : "Seleccionar Documentos"
                }
            </Button>
        </>
    );
}