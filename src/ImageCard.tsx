import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './ImageCard.css';
import { useNavigate } from 'react-router-dom';

interface ImageCardProps {
  image: {
    title: string;
    description: string;
    url: string;
  };
  onSelect: (title: string) => void;
  selected: boolean;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onSelect, selected }) => {
  const navigate = useNavigate();
  const handleDownload = async () => {
    try {
      const response = await fetch(image.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${image.title}.jpg`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  const handleSelect = () => {
    onSelect(image.title);
  };

  const handleImageClick = () => {
    navigate(`/image/${image.title}`);
  };

  return (
    <Card className={`image-card mb-4 ${selected ? 'border-primary' : ''}`}>
      <Card.Img
        variant="top"
        src={image.url}
        alt={image.title}
        className="card-image"
        onClick={handleImageClick}
        style={{ cursor: 'pointer' }}
      />
      <Card.Body>
        <Card.Title>{image.title}</Card.Title>
        <Card.Text>{image.description}</Card.Text>
        <Button variant="primary" onClick={handleDownload} className="download-btn">
          Download
        </Button>
        <div className="custom-checkbox">
          <input
            type="checkbox"
            checked={selected}
            onChange={handleSelect}
            className="mr-2"
          />
          <label>Select</label>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ImageCard;
