
import React from "react";

// reactstrap components
import { Row, Container } from "reactstrap";

function DemoFooter() {
  return (
    <footer className="footer footer-black footer-white">
      <Container>
        <Row>
          <nav className="footer-nav">
            <ul>
              <li>
                <a
                  className="btn-outline-neutral btn-round"
                color="default"
                href="/profile-page"
                target="_blank"
                >
                  Our Team
                </a>
              </li>
              {/* <li>
                <a
                  href="http://blog.creative-tim.com/?ref=pkr-footer"
                  target="_blank"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="https://www.creative-tim.com/license?ref=pkr-footer"
                  target="_blank"
                >
                  Licenses
                </a>
              </li> */}
            </ul>
          </nav>
          <div className="credits ml-auto">
            <span className="copyright">
               {new Date().getFullYear()}, made with{" "}
              <i className="fa fa-heart heart" /> by CraZzyShoes Team
            </span>
          </div>
        </Row>
      </Container>
    </footer>
  );
}

export default DemoFooter;
