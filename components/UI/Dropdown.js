import { Button, Dropdown } from '@nextui-org/react'

export default function UIDropdown({ title, items, onChange} ) {
    
    return (
        <Dropdown>
            <Dropdown.Button flat>{ title }</Dropdown.Button>
            <Dropdown.Menu aria-label="Static Actions">
                {
                    items.map((item) => (
                            <Dropdown.Item key={item} color={item.color} textValue={item}>
                                <Button light onPress={() => onChange(item)} >
                                    {item}
                                </Button>
                            </Dropdown.Item>
                        ))
                }
            </Dropdown.Menu>
        </Dropdown>
    );
}