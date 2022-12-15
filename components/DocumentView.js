import { Card, Progress } from '@nextui-org/react';
import { useState } from 'react';

export default function DocumentView ({ src }) {

    return <embed 
                src={src} 
                width="100%" 
                frameBorder={0} 
                height="100%" 
            />
}