import React, { useState } from 'react';
import ImageCard from './ImageCard';
import Navbar from './Navbar';
import { Container, Row, Col } from 'react-bootstrap';

interface ImageGalleryProps {
  images: any[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelectAll = () => {
    const allTitles = images.map((image) => image.title);
    setSelectedImages(allTitles);
  };

  const handleClearSelection = () => {
    setSelectedImages([]);
  };

  const handleSelectImage = (title: string) => {
    if (selectedImages.includes(title)) {
      setSelectedImages(selectedImages.filter((selectedTitle) => selectedTitle !== title));
    } else {
      setSelectedImages([...selectedImages, title]);
    }
  };

  const handleSortByName = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const sortedImages = [...images].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  });

  const filteredImages = sortedImages.filter((image) => {
    const titleMatch = image.title.toLowerCase().includes(searchTerm.toLowerCase());
    const descriptionMatch = image.description.toLowerCase().includes(searchTerm.toLowerCase());
    return titleMatch || descriptionMatch;
  });

  return (
    <Container>
      <Navbar
        onSearch={handleSearch}
        onSelectAll={handleSelectAll}
        onClearSelection={handleClearSelection}
        onSortByName={handleSortByName}
        sortOrder={sortOrder}
      />
      <Row>
        {filteredImages.map((image) => (
          <Col key={image.title} sm={6} md={4} lg={3}>
            <ImageCard
              image={image}
              onSelect={handleSelectImage}
              selected={selectedImages.includes(image.title)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ImageGallery;