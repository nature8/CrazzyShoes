
import React from "react";

// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

// core components

function SectionNucleoIcons() {
  return (
    <>
      <div className="section section-dark section-nucleo-icons">
        <Container>
          <Row>
            <Col lg="6" md="12">
              <h2 className="title">Matrial Details</h2>
              <br />
              <p className="description">
                Content.....
              </p>
              <br />
              <Button
                className="btn-round"
                color="danger"
                href="#SectionExamples"
                target="_blank"
              >
                Team
              </Button>
              <Button
                className="btn-round ml-1"
                color="danger"
                href="#SectionExamples"
                outline
                target="_blank"
              >
                Our Collection
              </Button>
            </Col>
            <Col lg="6" md="12">
            <img
                  alt="..."
                  className="img-rounded img-responsive"
                  src={require("assets/img/examples/material.webp")}
                  style={{ width: "700px", height: "300px" }}
                />
              {/* <div className="icons-container">
                <i className="nc-icon nc-time-alarm" />
                <i className="nc-icon nc-atom" />
                <i className="nc-icon nc-camera-compact" />
                <i className="nc-icon nc-watch-time" />
                <i className="nc-icon nc-key-25" />
                <i className="nc-icon nc-diamond" />
                <i className="nc-icon nc-user-run" />
                <i className="nc-icon nc-layout-11" />
                <i className="nc-icon nc-badge" />
                <i className="nc-icon nc-bulb-63" />
                <i className="nc-icon nc-favourite-28" />
                <i className="nc-icon nc-planet" />
                <i className="nc-icon nc-tie-bow" />
                <i className="nc-icon nc-zoom-split" />
                <i className="nc-icon nc-cloud-download-93" />
              </div> */}
            </Col>
          </Row>
        </Container>
      </div>{" "}
    </>
  );
}

export default SectionNucleoIcons;
