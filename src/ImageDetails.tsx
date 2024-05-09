import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';

interface ImageDetailsProps {
  images: any[];
}

const ImageDetails: React.FC<ImageDetailsProps> = ({ images }) => {
  const { title } = useParams<{ title: string }>();
  const image = images.find((img) => img.title === title);

  if (!image) {
    return (
      <Container className="mt-5">
        <h2>Image not found</h2>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col md={5} className="mb-4">
          <Image
            src={image.url}
            alt={image.title}
            fluid
            rounded
            style={{ width: '80%', height: 'auto' }}
          />
        </Col>
        <Col>
          <h2 className="mb-4">{image.title}</h2>
          <p>{image.description}</p>
          <div className="mt-4">
            <h5>Details:</h5>
            <ul>
              <li>Dimensions: {image.width} x {image.height}</li>
              <li>Size: {(image.sizeInBytes / 1024).toFixed(2)} KB</li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ImageDetails;