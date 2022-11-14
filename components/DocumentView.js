import { Card, Progress } from '@nextui-org/react';
import { useState } from 'react';

export default function DocumentView ({ src }) {
    const [loading, setLoading] = useState(true);

    console.log('documentView src', src);

    return (
        <Card>
            {
                loading && (
                    <Progress
                        indeterminated
                        value={50}
                        color="secondary"
                        status="secondary"
                        />
                ) 
            }
            <iframe 
                src={src} 
                css={{ display: loading ? "none" : "inline-flex" }}
                width="100%" 
                frameBorder={0} 
                height="400px" 
                onLoad={() => setLoading(false)}
            />
        </Card>
    )
}