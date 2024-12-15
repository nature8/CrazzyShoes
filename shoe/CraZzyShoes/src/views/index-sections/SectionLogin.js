
// import React from "react";

// // reactstrap components
// import {
//   Button,
//   Card,
//   Form,
//   Input,
//   InputGroupAddon,
//   InputGroupText,
//   InputGroup,
//   Container,
//   Row,
//   Col,
// } from "reactstrap";

// // core components

// function SectionLogin() {
//   return (
//     <>
//       <div
//         className="section section-image section-login"
//         style={{
//           backgroundImage: "url(" + require("assets/img/login-image.jpg") + ")",
//         }}
//       >
//         <Container>
//           <Row>
//             <Col className="mx-auto" lg="4" md="6">
//               <Card className="card-register">
//                 <h3 className="title mx-auto">Welcome</h3>
//                 <div className="social-line text-center">
//                   <Button
//                     className="btn-neutral btn-just-icon mt-0"
//                     color="facebook"
//                     href="#pablo"
//                     onClick={(e) => e.preventDefault()}
//                   >
//                     <i className="fa fa-facebook-square" />
//                   </Button>
//                   <Button
//                     className="btn-neutral btn-just-icon mt-0 ml-1"
//                     color="google"
//                     href="#pablo"
//                     onClick={(e) => e.preventDefault()}
//                   >
//                     <i className="fa fa-google-plus" />
//                   </Button>
//                   <Button
//                     className="btn-neutral btn-just-icon mt-0 ml-1"
//                     color="twitter"
//                     href="#pablo"
//                     onClick={(e) => e.preventDefault()}
//                   >
//                     <i className="fa fa-twitter" />
//                   </Button>
//                 </div>
//                 <Form className="register-form">
//                   <label>Email</label>
//                   <InputGroup className="form-group-no-border">
//                     <InputGroupAddon addonType="prepend">
//                       <InputGroupText>
//                         <i className="nc-icon nc-email-85" />
//                       </InputGroupText>
//                     </InputGroupAddon>
//                     <Input placeholder="Email" type="email" />
//                   </InputGroup>
//                   <label>Password</label>
//                   <InputGroup className="form-group-no-border">
//                     <InputGroupAddon addonType="prepend">
//                       <InputGroupText>
//                         <i className="nc-icon nc-key-25" />
//                       </InputGroupText>
//                     </InputGroupAddon>
//                     <Input placeholder="Password" type="password" />
//                   </InputGroup>
//                   <Button
//                     block
//                     className="btn-round"
//                     color="danger"
//                     type="button"
//                   >
//                     login
//                   </Button>
//                 </Form>
//                 <div className="forgot">
//                   <Button
//                     className="btn-link"
//                     color="danger"
//                     href="#pablo"
//                     onClick={(e) => e.preventDefault()}
//                   >
//                     Forgot password?
//                   </Button>
//                 </div>
//               </Card>
//               <div className="col text-center">
//                 <Button
//                   className="btn-round"
//                   outline
//                   color="neutral"
//                   href="/register-page"
//                   size="lg"
//                   target="_blank"
//                 >
//                   Register Here
//                 </Button>
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </div>{" "}
//     </>
//   );
// }

// export default SectionLogin;


import React, { useState } from "react";
import { Button, Card, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Container, Row, Col } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // React Router for navigation

function SectionLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  // UseNavigate hook for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Check if the email and password are entered
  //   if (!formData.email || !formData.password) {
  //     setError("Email and password are required");
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     const apiUrl = `${process.env.REACT_APP_API_URL}/users/login`;

  //     // Send login request
  //     const response = await axios.post(apiUrl, formData);

  //     // If successful, store the JWT token in localStorage
  //     localStorage.setItem("authToken", response.data.token);

  //     // Redirect to the homepage or dashboard
  //     navigate("/");  // Or use window.location.href = '/' to redirect

  //   } catch (err) {
  //     setLoading(false);
  //     // Handle possible errors in response
  //     setError(
  //       err.response && err.response.data && err.response.data.message
  //         ? err.response.data.message
  //         : "An error occurred during login."
  //     );
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/users/login`;
  
      // Send login request
      const response = await axios.post(apiUrl, formData);
  
      // If successful, store the JWT token in localStorage
      localStorage.setItem("authToken", response.data.token);
  
      // Redirect to the homepage or dashboard
      navigate("/");  // Use your desired route here
  
    } catch (err) {
      setLoading(false);
  
      // Log error details for debugging
      const errorMessage =
        err.response && err.response.data.message
          ? err.response.data.message
          : "An error occurred during login.";
      console.error("Login error:", errorMessage);
  
      // Display error message to user
      setError(errorMessage);
    }
  };
  

  return (
    <>
      <div
        className="section section-image section-login"
        style={{
          backgroundImage: "url(" + require("assets/img/login-image.jpg") + ")",
        }}
      >
        <Container>
          <Row>
            <Col className="mx-auto" lg="4" md="6">
              <Card className="card-register">
                <h3 className="title mx-auto">Welcome</h3>
                <Form className="register-form" onSubmit={handleSubmit}>
                  <label>Email</label>
                  <InputGroup className="form-group-no-border">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-email-85" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </InputGroup>
                  <label>Password</label>
                  <InputGroup className="form-group-no-border">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-key-25" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </InputGroup>
                  <Button block className="btn-round" color="danger" type="submit" disabled={loading}>
                    {loading ? "Logging In..." : "Login"}
                  </Button>
                </Form>
                {error && <p className="text-danger text-center">{error}</p>}
              </Card>
              <div className="col text-center">
                <Button
                  className="btn-round"
                  outline
                  color="neutral"
                  href="/register-page"
                  size="lg"
                >
                  Register Here
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default SectionLogin;
