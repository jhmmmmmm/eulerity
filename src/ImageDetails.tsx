import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Card, Button } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

interface ImageDetailsProps {
  images: any[];
}

const ImageDetails: React.FC<ImageDetailsProps> = ({ images }) => {
  const { title } = useParams<{ title: string }>();
  const navigate = useNavigate();
  const image = images.find((img) => img.title === title);

  if (!image) {
    return (
      <Container className="mt-5">
        <h2>Image not found</h2>
      </Container>
    );
  }

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image.url;
    link.setAttribute('download', `${image.title}.jpg`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container className="mt-5">
      <Button
        variant="outline-secondary"
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        <ArrowLeft /> Back
      </Button>
      <Card className="shadow">
        <Row className="g-0">
          <Col md={6}>
            <div className="ratio ratio-1x1">
              <Image
                src={image.url}
                alt={image.title}
                fluid
                rounded
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </Col>
          <Col md={6}>
            <Card.Body>
              <Card.Title as="h2" className="mb-4">
                {image.title}
              </Card.Title>
              <Card.Text>{image.description}</Card.Text>
              <div className="mt-4">
                <h5>Details:</h5>
                <ul>
                  <li>Dimensions: {image.width} x {image.height}</li>
                  <li>
                    Size: {(image.sizeInBytes / 1024).toFixed(2)} KB
                  </li>
                </ul>
              </div>
              <Button
                variant="outline-primary"
                onClick={handleDownload}
                className="mt-4"
              >
                View Image
              </Button>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default ImageDetails;