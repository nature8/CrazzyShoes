
// import React, { useState } from "react";
// import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";
// import axios from "axios";
// import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
// import "./RegisterPage.css";

// function RegisterPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phone: "",
//     street: "",
//     apartment: "",
//     zip: "",
//     city: "",
//     country: "",
//   });

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   // Handle input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Use the API URL from the .env file for the registration API endpoint
//       const apiUrl = `${process.env.REACT_APP_API_URL}/users/register`;

//       // Sending a POST request to the backend with the form data
//       const response = await axios.post(apiUrl, formData);

//       // Handle the response if successful
//       setSuccess("Registration successful! Please login.");
//       setError("");
      
//       // Reset the form data
//       setFormData({
//         name: "",
//         email: "",
//         password: "",
//         phone: "",
//         street: "",
//         apartment: "",
//         zip: "",
//         city: "",
//         country: "",
//       });
//     } catch (err) {
//       // Handle any errors that occur during registration
//       setError(
//         err.response && err.response.data.message
//           ? err.response.data.message
//           : "An error occurred during registration."
//       );
//       setSuccess(""); // Clear success message if an error occurs
//     }
//   };

//   // Adding page styles when component mounts and cleaning up when it unmounts
//   React.useEffect(() => {
//     document.body.classList.add("register-page");
//     return function cleanup() {
//       document.body.classList.remove("register-page");
//     };
//   }, []);

//   return (
//     <>
//       <ExamplesNavbar />
//       <div
//         className="page-header"
//         style={{
//           backgroundImage: "url(" + require("assets/img/login-image.jpg") + ")",
//         }}
//       >
//         <div className="filter" />
//         <Container>
//           <Row>
//             <Col className="ml-auto mr-auto" lg="4">
//               <Card className="card-register ml-auto mr-auto">
//                 <h3 className="title mx-auto">Register</h3>
//                 <Form className="register-form" onSubmit={handleSubmit}>
//                   {/* User Inputs */}
//                   <label>Name</label>
//                   <Input
//                     placeholder="Name"
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                   />
//                   <label>Email</label>
//                   <Input
//                     placeholder="Email"
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                   />
//                   <label>Password</label>
//                   <Input
//                     placeholder="Password"
//                     type="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                   />
//                   <label>Phone</label>
//                   <Input
//                     placeholder="Phone"
//                     type="text"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                   />
//                   <label>Street</label>
//                   <Input
//                     placeholder="Street"
//                     type="text"
//                     name="street"
//                     value={formData.street}
//                     onChange={handleChange}
//                   />
//                   <label>Apartment</label>
//                   <Input
//                     placeholder="Apartment"
//                     type="text"
//                     name="apartment"
//                     value={formData.apartment}
//                     onChange={handleChange}
//                   />
//                   <label>ZIP Code</label>
//                   <Input
//                     placeholder="ZIP Code"
//                     type="text"
//                     name="zip"
//                     value={formData.zip}
//                     onChange={handleChange}
//                   />
//                   <label>City</label>
//                   <Input
//                     placeholder="City"
//                     type="text"
//                     name="city"
//                     value={formData.city}
//                     onChange={handleChange}
//                   />
//                   <label>Country</label>
//                   <Input
//                     placeholder="Country"
//                     type="text"
//                     name="country"
//                     value={formData.country}
//                     onChange={handleChange}
//                   />
//                   <Button
//                     block
//                     className="btn-round register-button"
//                     color="danger"
//                     type="submit"
//                   >
//                     Register
//                   </Button>
//                 </Form>
//                 {error && <p className="text-danger text-center">{error}</p>}
//                 {success && <p className="text-success text-center">{success}</p>}
//                 <div className="footer register-footer text-center">
//                   <h6>
//                     © {new Date().getFullYear()}, made with{" "}
//                     <i className="fa fa-heart heart" /> by CraZzyShoes Team
//                   </h6>
//                 </div>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     </>
//   );
// }

// export default RegisterPage;


import React, { useState } from "react";
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";
import axios from "axios";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import { useNavigate } from "react-router-dom"; // Import useNavigate for React Router v6
import "./RegisterPage.css";

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    street: "",
    apartment: "",
    zip: "",
    city: "",
    country: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate(); // Initialize the navigate hook

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Use the API URL from the .env file for the registration API endpoint
      const apiUrl = `${process.env.REACT_APP_API_URL}/users/register`;

      // Sending a POST request to the backend with the form data
      const response = await axios.post(apiUrl, formData);

      // Handle the response if successful
      setSuccess("Registration successful! Please login.");
      setError("");

      // Reset the form data
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        street: "",
        apartment: "",
        zip: "",
        city: "",
        country: "",
      });

      // Redirect to the home page (index.js)
      navigate("/"); // This will navigate to the index.js or home page

    } catch (err) {
      // Handle any errors that occur during registration
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : "An error occurred during registration."
      );
      setSuccess(""); // Clear success message if an error occurs
    }
  };

  // Adding page styles when component mounts and cleaning up when it unmounts
  React.useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  }, []);

  return (
    <>
      <ExamplesNavbar />
      <div
        className="page-header"
        style={{
          backgroundImage: "url(" + require("assets/img/login-image.jpg") + ")",
        }}
      >
        <div className="filter" />
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" lg="4">
              <Card className="card-register ml-auto mr-auto">
                <h3 className="title mx-auto">Register</h3>
                <Form className="register-form" onSubmit={handleSubmit}>
                  {/* User Inputs */}
                  <label>Name</label>
                  <Input
                    placeholder="Name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <label>Email</label>
                  <Input
                    placeholder="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <label>Password</label>
                  <Input
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <label>Phone</label>
                  <Input
                    placeholder="Phone"
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <label>Street</label>
                  <Input
                    placeholder="Street"
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                  />
                  <label>Apartment</label>
                  <Input
                    placeholder="Apartment"
                    type="text"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleChange}
                  />
                  <label>ZIP Code</label>
                  <Input
                    placeholder="ZIP Code"
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                  />
                  <label>City</label>
                  <Input
                    placeholder="City"
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                  <label>Country</label>
                  <Input
                    placeholder="Country"
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  />
                  <Button
                    block
                    className="btn-round register-button"
                    color="danger"
                    type="submit"
                  >
                    Register
                  </Button>
                </Form>
                {error && <p className="text-danger text-center">{error}</p>}
                {success && <p className="text-success text-center">{success}</p>}
                <div className="footer register-footer text-center">
                  <h6>
                    © {new Date().getFullYear()}, made with{" "}
                    <i className="fa fa-heart heart" /> by CraZzyShoes Team
                  </h6>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default RegisterPage;
