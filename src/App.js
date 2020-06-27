import React from "react";

import { Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

import { state_codes } from "./components/Plots.js";
import "./App.css";
import C19ApiChart from "./components/C19ApiChart.js";

const cardHeader = (name) => (
  <Card.Header as="h2" class="card-header bg-light border-dark">
    {name}
  </Card.Header>
);

export default class App extends React.Component {
  state = {
    vizType: "confirmed",
    geography: "TT",
  };

  render() {
    return (
      <>
        <div className="App container">
          <Row>
            <Col>
              <Card className="bg-dark text-white text-center">
                <Card.Header as="h1" className="bg-dark text-white text-center">
                  {" "}
                  covin adaptive control [STAGING] website {" "}
                </Card.Header>
                <Card.Body>
                  <Card.Subtitle as="h3" className="text-secondary">
                    {" "}
                    where the colors can be anything i like
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col sm={8}>
              <Card id="viz_box">
                {cardHeader("Analysis")}
                <Card.Body>
                  <div>
                    <Form>
                      <Row>
                        <Col>
                          <Form.Group controlId="geoForm">
                            <Form.Label as="h3" className="text-dark">
                              Geography
                            </Form.Label>
                            <Form.Control
                              as="select"
                              size="lg"
                              custom
                              onChange={(e) => {
                                this.setState({ geography: e.target.value });
                              }}>
                              {/* <option value="IN">All India</option> */}
                              <optgroup label="States">
                                {Object.keys(state_codes).map((key) => (
                                  <option value={key}>{state_codes[key]}</option>
                                ))}
                              </optgroup>
                            </Form.Control>
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group controlId="vizForm">
                            <Form.Label as="h3" className="text-dark">
                              Visualization
                            </Form.Label>
                            <Form.Control
                              as="select"
                              size="lg"
                              custom
                              onChange={(e) => {
                                this.setState({ vizType: e.target.value });
                              }}>
                              <optgroup label="Plots">
                                <option value="confirmed">confirmed</option>
                                <option value="recovered">recovered</option>
                                <option value="tested">tested</option>
                                <option value="deceased">deceased</option>
                                <option value="active">active</option>
                                <option value="prevalence">prevalence</option>
                              </optgroup>
                            </Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </Card.Body>
                <C19ApiChart vizType={this.state.vizType} geography={this.state.geography}/>
              </Card>
            </Col>
            <Col sm={4}>
              <Card id="detail_box">
                {cardHeader("Details")}
                <Card.Body>
                </Card.Body>
              </Card>
              <br></br>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
