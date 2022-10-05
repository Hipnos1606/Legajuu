import { Grid, Card } from '@nextui-org/react'

export default function DocumentsList ({ documentsURL=[] }) {
    return (
        <Grid.Container gap={3}>
            {
                documentsURL.map((documentURL) => (
                    <Grid xs={4}>
                        <Card css={{ p: 0 }}>
                            <iframe frameBorder={0} scrolling="no" width="100%" height="200" src={documentURL}></iframe>
                        </Card>
                    </Grid>
                ))
            }
            <style jsx>{`
                iframe {
                    border: 0
                }
            `}</style>
        </Grid.Container>
    )
}