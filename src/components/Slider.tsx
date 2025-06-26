import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Container } from "react-bootstrap";

const Slider: React.FC = () => {
  const { filtered } = useSelector((state: RootState) => state.countries);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const topFive = filtered.slice(0, 5);
  const selectedCountry = topFive[selectedIndex];

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? topFive.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === topFive.length - 1 ? 0 : prev + 1));
  };

  return (
    <Container fluid className="px-0 mb-responsive">
      <div className="d-flex flex-column-reverse flex-md-row align-items-stretch responsive-gap">
        <div className="flex-grow-1 carousel-img-container">
          <div style={{ position: "relative", height: "100%" }}>
            <img
              className="d-block w-100 rounded-0"
              src={selectedCountry?.flag}
              alt={selectedCountry?.name}
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                borderRadius: "6px",
              }}
            />

            <div
              className="position-absolute bottom-0 start-50 translate-middle-x mb-3 d-flex align-items-center justify-content-center"
              style={{ gap: "10px" }}
            >
              <i
                className="bi bi-chevron-left arrow-style"
                onClick={handlePrev}
              ></i>

              {topFive.map((_, idx) => (
                <span
                  key={idx}
                  onClick={() => setSelectedIndex(idx)}
                  className="rounded-circle"
                  style={{
                    width: "10px",
                    height: "10px",
                    backgroundColor:
                      selectedIndex === idx ? "#1a1a1a" : "#f5f0f5",
                    display: "inline-block",
                    cursor: "pointer",
                  }}
                ></span>
              ))}

              <i
                className="bi bi-chevron-right arrow-style"
                onClick={handleNext}
              ></i>
            </div>
          </div>
        </div>

        <div
          className="d-flex justify-content-center justify-content-md-end rounded-0 top-card-container"
        >
          <div
            style={{
              height: "100%",
              width: "100%",
              aspectRatio: "232 / 498",
              overflow: "hidden",
              border: "none",
            }}
          >
            <img
              src={selectedCountry?.flag}
              alt={selectedCountry?.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "0px",
                display: "block",
              }}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Slider;
