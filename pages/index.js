import Layout from '../components/Layout';
import { 
  Grid, 
  Container,
  Col,
  Card,
  Text,
  Spacer,
} from '@nextui-org/react';

export default function Home() {
  return ( 
    <Layout 
      headTitle="crea tu legajo de forma rápida y fácil">
      <Spacer y={2}/>
      <Container>
        <Grid.Container>
          <Grid xs={6} css={{ display: "flex", flexDirection: "column" }}>
            <Text h1>
              Crea tu Legajo rápido, fácil y gratis.
            </Text>
            <Text p >¡Legajuu! es la aplicación perfecta para docentes hondureños que buscan una manera fácil y rápida de gestionar sus documentos y crear el legajo que requiere la secretaría de educación. Con Legajuu!, podrás almacenar tus documentos PDF en la nube, crear y modificar tu legajo de manera organizada, convertir imágenes a PDF, unir diferentes archivos PDF en uno solo, y descargar tu legajo en un archivo comprimido. Nuestra aplicación es fácil de usar y segura, por lo que puedes estar tranquilo sabiendo que tus documentos están protegidos. ¡Descarga Legajuu! hoy mismo y simplifica la gestión de tus documentos y el proceso de creación de tu legajo!</Text> 
          </Grid>
          <Grid xs={1} />
          <Grid xs={5}>
            <Card css={{ w: "100%", h: "fit-content" }}>
                  <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                    <Col>
                      <Text size={12} weight="bold" transform="uppercase" color="#ffffffaa">
                        Limpio y seguro
                      </Text>
                      <Text h4 color="white">
                        Todos tus documentos en un solo lugar
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
    </Layout>
  )
}
