import NextLink from 'next/link';
import { Text } from '@nextui-org/react';

const Link = (props) => (
    <NextLink href={props.href}>
        <Text {...props.textProps} css={{ cursor: 'pointer' }}> {props.text} </Text>
    </NextLink>
    )

export default Link;