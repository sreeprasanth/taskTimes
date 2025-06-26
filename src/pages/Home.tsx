import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "../features/countries/countriesSlice";
import { RootState } from "../store";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Spinner,
} from "react-bootstrap";
import Header from "../components/Header";
import Slider from "../components/Slider";
import Footer from "../components/Footer";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { filtered, loading } = useSelector(
    (state: RootState) => state.countries
  );
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    dispatch(fetchCountries() as any);
  }, [dispatch]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1">
        <Container className="px-4 px-md-0" style={{ maxWidth: "1140px" }}>
          <Header />
          <h1
            className="text-center fw-bold"
            style={{ marginTop: "38px", marginBottom: "38px" }}
          >
            <div className="d-none d-md-flex align-items-center justify-content-center">
              <div
                className="flex-grow-1 bg-dark"
                style={{
                  height: "3px",
                  marginBottom: "0.6em",
                  color: "#3D3D3D",
                }}
              ></div>

              <span className="text-welcome">WELCOME</span>
              <div
                className="flex-grow-1 bg-dark"
                style={{ height: "3px", marginTop: "0.6em", color: "#3D3D3D" }}
              ></div>
            </div>

            <div
              className="d-flex d-md-none flex-column align-items-center"
              style={{ lineHeight: 1 }}
            >
              <div
                className="w-100 bg-dark mb-2"
                style={{ height: "3px", color: "#3D3D3D" }}
              ></div>
              <span className="text-welcome">WELCOME</span>
              <div
                className="w-100 bg-dark mt-2"
                style={{ height: "3px", color: "#3D3D3D" }}
              ></div>
            </div>
          </h1>
          <Slider />
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          ) : (
            <Row className="gx-md-3" style={{ rowGap: "10px" }}>
              {filtered.slice(0, visibleCount).map((country, idx) => (
                <Col key={idx} xs={12} md={6} className="px-0 px-md-2 mb-md-19">
                  <div className="card-shadow-wrapper">
                    <div className="card-inner">
                      <div className="card-content d-flex align-items-start">
                        <div className="flag-box d-flex justify-content-center align-items-center overflow-hidden">
                          <img
                            src={country.flag}
                            alt={country.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        <div>
                          <div className="fw-semibold fs-6 text-dark mb-1 mb-mobile-0">
                            {country.name}
                          </div>
                          <div className="text-muted fs-6 mb-0">
                            {country.region}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          )}
          {visibleCount < filtered.length && (
            <div className="text-center load-more-wrapper">
              <Button
                variant="primary"
                className="bg-dark rounded-0 border-0"
                onClick={handleLoadMore}
                style={{
                  padding: "13px 33px",
                }}
              >
                Load More
              </Button>
            </div>
          )}
          <Footer />
        </Container>
      </main>
    </div>
  );
};

export default Home;
