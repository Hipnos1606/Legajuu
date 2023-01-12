import { Button, Col, Text } from '@nextui-org/react';

const OptionsMenu = (props) => {
    const { options } = props;
    return (
        <Col>
            {
                options.map((option) => option && (
                        <Button 
                            light
                            size={"lg"}
                            icon={ option.icon }
                            css={{ jc: 'left' }}
                            onPress={ option.onPress }
                        >
                            <Text css={{ p: 20 }} >
                                { option.text }
                            </Text>
                        </Button>
                    ))
            }
        </Col>
    )
}

export default OptionsMenu;