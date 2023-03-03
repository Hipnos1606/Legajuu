import { useState } from 'react';
import { Dropdown } from '@nextui-org/react'
import Text from '../../libs/Text';

function UIDropdown({ title, items, onChange} ) {
    const [selectedValue, setSelected] = useState(new Set([title]));

    const handleSetSelected = (value) => {
        setSelected(value);
        value = value["currentKey"];
        onChange(value);
    }
    
    return (
        <Dropdown>
            <Dropdown.Button flat>{ selectedValue }</Dropdown.Button>
            <Dropdown.Menu 
                aria-label="Single selection Actions" 
                items={items}
                disallowEmptySelection
                color="secondary"
                selectionMode="single"
                selectedKeys={selectedValue}
                onSelectionChange={handleSetSelected}
                >
                {items.map((item) => (
                    <Dropdown.Item key={item}>
                        { Text.pascalCase(item) }
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default UIDropdown;