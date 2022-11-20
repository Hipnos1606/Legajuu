import { Grid } from '@nextui-org/react'
import DocumentCard from './DocumentCard'

export default function DocumentsList (props) {

    const { documents = [], deleteAction } = props;
    
    return (
        <Grid.Container gap={3}>
            {
                documents.map((document) => {
                    return (
                    <DocumentCard document={document} gridNum={4} deleteAction={deleteAction} />
                )
                })
            }
        </Grid.Container>
    )
}