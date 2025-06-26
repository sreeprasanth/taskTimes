import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
const schema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be 8 characters")
    .matches(/[A-Z]/, "Must contain an uppercase letter")
    .matches(/\d/, "Must contain a number")
    .matches(/[@$!%*?&]/, "Must contain a symbol"),
});

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = () => {
    localStorage.setItem("isAuthenticated", "true");
    navigate("/home");
  };
  useEffect(() => {
    localStorage.removeItem("isAuthenticated");
  }, []);
  return (
    <div className="min-vh-100 d-flex align-items-center bg-white">
      <Container>
        <Row className="align-items-center justify-content-center g-0 ">
          {/* Left: Form */}
          <Col
            xs={12}
            md={6}
            className="px-5 d-flex flex-column"
            style={{ maxWidth: "460px" }}
          >
            <div className="w-100">
              <h2
                className="fw-bold"
                style={{ fontSize: "32px", marginBottom: "14px" }}
              >
                Sign In
              </h2>
              <p
                className="fw-bold "
                style={{ fontSize: "16px", marginBottom: "29px" }}
              >
                New user?{" "}
                <a
                  href="#"
                  className="text-primary text-decoration-none fw-semibold"
                >
                  Create an account
                </a>
              </p>
            </div>

            <Form onSubmit={handleSubmit(onSubmit)} className="w-100">
              <Form.Group className="mb-4">
                <Form.Control
                  placeholder="Username or email"
                  className="rounded-0 p-2 custom-placeholder input-bordered"
                  {...register("email")}
                />
                <small className="text-danger">{errors.email?.message}</small>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  className="rounded-0 p-2 custom-placeholder input-bordered"
                  {...register("password")}
                />
                <small className="text-danger">
                  {errors.password?.message}
                </small>
              </Form.Group>

              <Form.Group className="mb-4 d-flex align-items-center">
                <Form.Check type="checkbox" className="me-2 custom-checkbox" />
                <Form.Label
                  className="mb-0 fw-semibold"
                  style={{ fontSize: "16px" }}
                >
                  Keep me signed in
                </Form.Label>
              </Form.Group>

              <Button
                type="submit"
                className="w-100 bg-dark border-dark rounded-0 fw-semibold"
                style={{ padding: "12px 0", fontSize: "16px" }}
              >
                Sign In
              </Button>

              <div
                className="d-flex align-items-center"
                style={{ marginTop: "32px", marginBottom: "32px" }}
              >
                <div className="flex-grow-1 border-bottom border-secondary" />
                <span className="mx-2  fw-bold" style={{ fontSize: "13px" }}>
                  Or Sign In With
                </span>
                <div className="flex-grow-1 border-bottom border-secondary" />
              </div>

              <div className="d-flex justify-content-center gap-3">
                {["google", "facebook", "linkedin", "twitter"].map((icon) => (
                  <div
                    key={icon}
                    className="border border-dark rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: "48px", height: "48px", cursor: "pointer" }}
                  >
                    <i
                      className={`bi bi-${icon}`}
                      style={{
                        fontSize: "20px",
                        width: "20px",
                        height: "20px",
                        display: "inline-block",
                        textAlign: "center",
                        lineHeight: "20px",
                      }}
                    ></i>
                  </div>
                ))}
              </div>
            </Form>
          </Col>

          {/* Right: Illustration */}
          <Col
            md={6}
            className="d-none d-md-flex justify-content-end align-items-center "
          >
            <img
              src="/assets/images/loginImage.png"
              alt="Illustration"
              className="img-fluid"
              style={{ maxHeight: "500px", width: "300px" }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
