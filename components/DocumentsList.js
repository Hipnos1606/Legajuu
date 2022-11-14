import { Grid } from '@nextui-org/react'
import DocumentCard from './DocumentCard'

export default function DocumentsList (props) {

    const { documents = [] } = props;
    
    return (
        <Grid.Container gap={3}>
            {
                documents.map((document) => (
                    <DocumentCard document={document} gridNum={4} />
                ))
            }
        </Grid.Container>
    )
}