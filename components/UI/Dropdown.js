import { Button, Dropdown } from '@nextui-org/react'

export default function UIDropdown({ title, items, onChange} ) {
    items = items.map(item => ({
        key: item,
        name: item,
    }))
    
    return (
        <Dropdown>
            <Dropdown.Button flat>{ title }</Dropdown.Button>
            <Dropdown.Menu aria-label="Static Actions" items={items}>
                {(item) => (
                    <Dropdown.Item key={item.key}>
                        <Button light onPress={() => onChange(item.name)} >
                            {item.name}
                        </Button>
                    </Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
}