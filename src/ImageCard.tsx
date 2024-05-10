import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './ImageCard.css';
import { useNavigate } from 'react-router-dom';
import { Heart, HeartFill } from 'react-bootstrap-icons';

interface ImageCardProps {
  image: {
    title: string;
    description: string;
    url: string;
  };
  onLike: (title: string) => void;
  liked: boolean;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onLike, liked }) => {
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

  const handleLike = () => {
    onLike(image.title);
  };

  const handleImageClick = () => {
    navigate(`/image/${image.title}`);
  };

  return (
    <Card className={`image-card mb-4 ${liked ? 'border-primary' : ''}`}>
      <Card.Img
        variant="top"
        src={image.url}
        alt={image.title}
        className="card-image"
        onClick={handleImageClick}
        style={{ cursor: 'pointer' }}
      />
      <Card.Body className="d-flex flex-column align-items-center justify-content-end">
        <Card.Title>{image.title}</Card.Title>
        <div className="d-flex justify-content-center w-100">
          <Button variant="primary" onClick={handleDownload} className="download-btn mb-2">
            Download
          </Button>
          <Button variant={liked ? "danger" : "outline-danger"} onClick={handleLike} className="heart-btn">
            {liked ? <HeartFill /> : <Heart />}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ImageCard;