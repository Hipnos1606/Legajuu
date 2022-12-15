import { useContext } from 'react';
import { Grid, Card } from '@nextui-org/react'
import DocumentCard from './DocumentCard'
import {DirectoriesContext} from './context/directoriesContext';
import { ListLoader } from './UI';

export default function DocumentsList (props) {

    const { documents = [], deleteAction, utilityCard, isStoredDirectories, defaultShowPreview, isLegajoList } = props;
    const { loadingDirectories, setLoadingDirectories } = useContext(DirectoriesContext);
    
    return (
        <Grid.Container gap={3}>
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
                                gridNum={4} 
                                deleteAction={deleteAction}
                                defaultShowPreview={defaultShowPreview}
                            />
                })
            }
            {
                utilityCard
                    && 
                        <Grid xs={4}>
                                <Card 
                                    isPressable 
                                    isHoverable
                                    onPress={() => {
                                            setLoadingDirectories(true);
                                            utilityCard.onPress().finally(() => setLoadingDirectories(false));
                                        }}
                                    css={{ alignItems: 'center', justifyContent: 'center' }}
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