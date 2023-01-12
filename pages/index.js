import Layout from '../components/Layout';
import NextLink from 'next/link';
import { 
  Grid, 
  Container,
  Button,
  Col,
  Card,
  Text,
  Spacer,
} from '@nextui-org/react';
import FeaturesSource from '../res/marketing/features.js';


export async function getStaticProps() {
  return {
    props: {
      features: FeaturesSource,
    }
  }
}

export default function Home({ features }) {

  let gridSize = 3;

  return ( 
    <Layout 
      headTitle="crea tu legajo de forma rápida y fácil">
      <Spacer y={2}/>
      <Container>
        <Grid.Container>
          <Grid xs={6} css={{ display: "flex", flexDirection: "column" }}> 
          <Container>
              <Text h1>Organiza tu 
                <NextLink href="/create" 
                  css={{
                    textGradient: "45deg, $purple600 -20%, $pink600 100%",
                  }}> Legajo </NextLink>
                de forma sencilla.
              </Text>
              <Text h3 color="$gray600">La única herramienta en el mercado y es grátis.</Text>
              <Button>
                <NextLink href="/create">
                  <Text color="white" b>
                    Vamos a Crear tu Legajuu!
                  </Text>
                </NextLink>
              </Button>
          </Container>
          </Grid>
          <Grid xs={1} />
          <Grid xs={5}>
            <Card css={{ w: "100%", h: "fit-content" }}>
                  <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                    <Col>
                      <Text size={12} weight="bold" transform="uppercase" color="#ffffffaa">
                        Todos tus documentos en un solo lugar
                      </Text>
                      <Text h4 color="white">
                        El buen orden es la base de todo.
                      </Text>
                    </Col>
                  </Card.Header>
                  <Card.Image
                    src="https://images.pexels.com/photos/6814538/pexels-photo-6814538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    width="100%"
                    height={340}
                    objectFit="cover"
                    alt="Card image background"
                  />
            </Card>
          </Grid>
        </Grid.Container>
      </Container>
      <Container>
        <Grid.Container gap={1}>
            {
              features.map((feature) => {
                return (
                  <Grid xs={gridSize} key={JSON.stringify(feature)}>
                    <Card>
                      <Card.Header css={{ zIndex: 1, top: 5 }}>
                        <Col>
                          <Text size={10} weight="bold" transform="uppercase" color="#333333ff">
                            {feature.title}
                          </Text>
                          <Text h6 color="black">
                            {feature.description_short}
                          </Text>
                        </Col>
                      </Card.Header>
                      <Card.Image
                        src={feature.imageSrc}
                        objectFit="cover"
                        width="100%"
                        height={340}
                        alt={`${feature.title} documentos`}
                      />
                    </Card>
                  </Grid>
                  )
              })
            }
          </Grid.Container>
      </Container>
    </Layout>
  )
}


