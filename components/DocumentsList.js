import { Grid, Card } from '@nextui-org/react'
import DocumentCard from './DocumentCard'

export default function DocumentsList (props) {

    const {
        directory,
        utilityCard, 
        defaultShowPreview, 
        isLegajoList,
     } = props;

    return (
        <Grid.Container gap={2}>
            {
                directory.documents.map((document) => {
                    return <DocumentCard 
                                isLegajoList={isLegajoList}
                                key={Date.now() * Math.random()} 
                                document={document}
                                deleteAction={directory.removeDoc}
                                defaultShowPreview={defaultShowPreview}
                            />
                })
            }
            {
                utilityCard
                    && 
                        <Grid xs={12} md={4} lg={1}>
                                <Card 
                                    isPressable 
                                    isHoverable
                                    onPress={() => {
                                            utilityCard.onPress();
                                        }}
                                    css={{ height: 100, alignItems: 'center', justifyContent: 'center' }}
                                    >
                                    {
                                        utilityCard.children
                                    }
                                </Card> 
                        </Grid>
            }
        </Grid.Container>
    )
}