import React from "react";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const Footer: React.FC = () => (
  <footer className="text-center py-4 mt-4">
    <Container>
      <div className="d-flex justify-content-center align-items-center gap-2 mb-icons">
        {[faFacebookF, faTwitter, faLinkedinIn, faYoutube].map((icon, idx) => (
          <div
            key={idx}
            style={{ cursor: "pointer" }}
            className="d-flex align-items-center justify-content-center border border-dark rounded-circle icon-circle"
          >
            <FontAwesomeIcon icon={icon} className="text-dark icon-size" />
          </div>
        ))}
      </div>

      <p className="mb-email fw-bold footer-text-13">Example@email.com</p>
      <p className="mb-copy fw-bold footer-text-13">
        Copyright © 2020 Name. All rights reserved.
      </p>
    </Container>

    <style>
      {`
        .icon-circle {
          width: 36px;
          height: 36px;
          padding: 10px;
        }
        .icon-size {
          font-size: 16px;
        }
        .mb-icons {
          margin-bottom: 27px;
        }
        .mb-email {
          margin-bottom: 11px;
        }

        @media (min-width: 768px) {
          .icon-circle {
            width: 48px !important;
            height: 48px !important;
            padding: 14px !important;
          }
          .icon-size {
            font-size: 20px !important;
          }
          .mb-icons {
            margin-bottom: 40px !important;
          }
          .mb-email {
            margin-bottom: 15px !important;
          }
        }
      `}
    </style>
  </footer>
);

export default Footer;
