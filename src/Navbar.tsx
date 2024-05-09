import React, { useState } from 'react';
import { Navbar as BootstrapNavbar, Nav, Form, FormControl, Button, InputGroup } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

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
      <BootstrapNavbar.Brand>Image Gallery</BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BootstrapNavbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto" style={{ margin: '0 10px' }}>
          <Button variant="outline-info" onClick={onSelectAll} className="mr-3" style={{ borderRadius: '20px', margin: '0 10px' }}>
            Select All
          </Button>
          <Button variant="outline-info" onClick={onClearSelection} className="mr-3" style={{ borderRadius: '20px', margin: '0 10px' }}>
            Clear Selection
          </Button>
          <Button variant="outline-info" onClick={onSortByName} style={{ borderRadius: '20px', margin: '0 10px' }}>
            Sort by Name {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
          </Button>
        </Nav>
        <Form onSubmit={handleSearchSubmit} className="d-flex ml-auto" style={{ padding: '10px'}}>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search by title or description"
              value={searchTerm}
              onChange={handleSearchChange}
              className="mr-2"
              style={{ minWidth: '300px', borderRadius: '20px 0 0 20px', marginRight: '0' }}
            />
            <Button type="submit" variant="outline-info" style={{ borderRadius: '0 20px 20px 0' }}>
              <Search />
            </Button>
          </InputGroup>
        </Form>

      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
};

export default Navbar;