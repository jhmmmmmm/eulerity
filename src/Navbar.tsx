import React, { useState } from 'react';
import { Navbar as BootstrapNavbar, Nav, Form, FormControl, Button, InputGroup } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import ImageLogo from './assets/image.png';

interface NavbarProps {
  onSearch: (searchTerm: string) => void;
  onSelectAll: () => void;
  onClearSelection: () => void;
  onSortByName: () => void;
  sortOrder: 'asc' | 'desc';
}

const Navbar: React.FC<NavbarProps> = ({
  onSearch,
  onSelectAll,
  onClearSelection,
  onSortByName,
  sortOrder,
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
        <img src={ImageLogo} alt="Eulerity" style={{ height: '40px' }} />
      </BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BootstrapNavbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav className="ml-auto">
          <Button variant="primary" onClick={onSelectAll} className="me-3">
            Select All
          </Button>
          <Button variant="primary" onClick={onClearSelection} className="me-3">
            Clear Selection
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