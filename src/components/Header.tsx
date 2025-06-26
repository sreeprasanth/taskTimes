import React, { useState } from "react";
import { Navbar, Container, Nav, Offcanvas } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { filterByRegion } from "../features/countries/countriesSlice";

const regions = ["All", "Asia", "Europe"];

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState("All");
  const [showMenu, setShowMenu] = useState(false);

  const handleRegionClick = (region: string) => {
    setActive(region);
    dispatch(filterByRegion(region));
    setShowMenu(false); // Close offcanvas on mobile
  };

  return (
    <>
      {/* Top Bar */}
      <Navbar className="navbar-custom-margin">
        <Container className="d-flex justify-content-between align-items-center px-0">
          <Navbar.Brand className="fw-bold m-0" style={{ fontSize: "24px" }}>
            Countries
          </Navbar.Brand>
          {/* Web view filter */}
          <Nav className="gap-3 d-none d-md-flex">
            {regions.map((region) => (
              <span
                key={region}
                role="button"
                onClick={() => handleRegionClick(region)}
                className={`fw-semibold ${
                  active === region ? "text-dark pb-1" : "text-muted"
                }`}
                style={{
                  borderBottomColor:
                    active === region ? "#3E3E3E" : "transparent",
                  borderBottomStyle: "solid",
                  borderBottomWidth: "2px",
                  color: active !== region ? "#8B8B8B" : "#3D3D3D",
                  cursor: "pointer",
                }}
              >
                {region}
              </span>
            ))}
          </Nav>

          {/* Hamburger - Mobile only */}
          <i
            className="bi bi-list fs-3 d-md-none"
            role="button"
            onClick={() => setShowMenu(true)}
          ></i>
        </Container>
      </Navbar>

      {/* Mobile Offcanvas Filter */}
      <Offcanvas
        show={showMenu}
        onHide={() => setShowMenu(false)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filter Regions</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column gap-3">
            {regions.map((region) => (
              <span
                key={region}
                role="button"
                onClick={() => handleRegionClick(region)}
                className={`fw-semibold ${
                  active === region
                    ? "text-dark border-bottom border-2 pb-1"
                    : "text-muted"
                }`}
                style={{ cursor: "pointer" }}
              >
                {region}
              </span>
            ))}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Header;
