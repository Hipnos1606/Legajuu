import { useContext } from 'react';
import { Grid, Card } from '@nextui-org/react'
import DocumentCard from './DocumentCard'
import {DirectoriesContext} from './context/directoriesContext';
import { ListLoader } from './UI';

export default function DocumentsList (props) {

    const { 
        documents = [], 
        deleteAction, 
        utilityCard, 
        isStoredDirectories, 
        defaultShowPreview, 
        isLegajoList,
     } = props;
    const { loadingDirectories, setLoadingDirectories } = useContext(DirectoriesContext);

    console.log(documents);

    return (
        <Grid.Container gap={2}>
            {
                (isStoredDirectories)
                    && (loadingDirectories)
                        && <ListLoader />
            }
            {
                documents.map((document) => {
                    return <DocumentCard 
                                isLegajoList={isLegajoList}
                                key={Date.now() * Math.random()} 
                                document={document}
                                deleteAction={deleteAction}
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
                                            setLoadingDirectories(true);
                                            utilityCard.onPress().finally(() => setLoadingDirectories(false));
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