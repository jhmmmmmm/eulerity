import React, { useState } from 'react';
import ImageCard from './ImageCard';
import Navbar from './Navbar';
import { Container, Row, Col } from 'react-bootstrap';

interface ImageGalleryProps {
  images: any[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [likedImages, setLikedImages] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const [sortInitiated, setSortInitiated] = useState(false);

  const handleLikeAll = () => {
    setLikedImages(images.map(image => image.title));
  };

  const handleClearLikes = () => {
    setLikedImages([]);
  };

  const handleLikeImage = (title: string) => {
    if (likedImages.includes(title)) {
      setLikedImages(prevLikedImages => prevLikedImages.filter(likedTitle => likedTitle !== title));
    } else {
      setLikedImages(prevLikedImages => [...prevLikedImages, title]);
    }
  };

  const handleSortByName = () => {
    setSortOrder(prevSortOrder => prevSortOrder === 'asc' ? 'desc' : 'asc');
    setSortInitiated(true);
  };

  const handleSearch = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };

  const toggleFavorites = () => {
    setShowFavorites(prevShowFavorites => !prevShowFavorites);
  };

  let displayImages = images.filter(image => {
    const matchesSearchTerm = image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.description.toLowerCase().includes(searchTerm.toLowerCase());
    return showFavorites ? likedImages.includes(image.title) && matchesSearchTerm : matchesSearchTerm;
  });

  if (sortInitiated) {
    displayImages.sort((a, b) => sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title));
  }

  return (
    <Container>
      <Navbar
        onSearch={handleSearch}
        onLikeAll={handleLikeAll}
        onClearLikes={handleClearLikes}
        onSortByName={handleSortByName}
        onToggleFavorites={toggleFavorites}
        sortOrder={sortOrder}
        showFavorites={showFavorites}
      />
      <Row>
        {displayImages.map(image => (
          <Col key={image.title} sm={6} md={4} lg={3}>
            <ImageCard
              image={image}
              onLike={handleLikeImage}
              liked={likedImages.includes(image.title)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ImageGallery;