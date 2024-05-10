import React, { useState } from 'react';
import { Navbar as BootstrapNavbar, Nav, Form, FormControl, Button, InputGroup } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import ImageLogo from './assets/image.png';

interface NavbarProps {
  onSearch: (searchTerm: string) => void;
  onLikeAll: () => void;
  onClearLikes: () => void;
  onSortByName: () => void;
  onToggleFavorites: () => void;
  sortOrder: 'asc' | 'desc';
  showFavorites: boolean;
}



const Navbar: React.FC<NavbarProps> = ({
  onSearch,
  onLikeAll,
  onClearLikes,
  onSortByName,
  onToggleFavorites,
  sortOrder,
  showFavorites
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <BootstrapNavbar expand="lg" className="mb-4">
      <BootstrapNavbar.Brand>
        <img src={ImageLogo} alt="Eulerity" style={{ height: '50px' }} />
      </BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BootstrapNavbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav className="ml-auto">
          <Button variant="primary" onClick={onLikeAll} className="me-3">
            Like All
          </Button>
          <Button variant="primary" onClick={onClearLikes} className="me-3">
            Unlike All
          </Button>
          <Button variant="primary" onClick={onToggleFavorites} className="me-3">
            {showFavorites ? "Show All" : "Show My Favorites"}
          </Button>
          <Button variant="primary" onClick={onSortByName} className="me-3">
            Sort by Name {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
          </Button>
        </Nav>
        <Form onSubmit={handleSearchSubmit} className="d-flex" style={{ padding: '10px' }}>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search by title or description"
              value={searchTerm}
              onChange={handleSearchChange}
              className="mr-2"
              style={{ minWidth: '300px', borderRadius: '20px 0 0 20px', marginRight: '0' }}
            />
            <Button type="submit" variant="primary" style={{ borderRadius: '0 20px 20px 0' }}>
              <Search />
            </Button>
          </InputGroup>
        </Form>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
};

export default Navbar;
