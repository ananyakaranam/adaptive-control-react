import React from 'react';
import { Table, Badge } from 'react-bootstrap';
import Card from 'react-bootstrap/Card'

// const typenames = {
//     statusmap: "Adaptive Control Status",
//     rtmap: "Reproductive rate",
//     Itmap: "Active infections",
//     rtplot: "Reproductive rate",
//     Itplot: "Active infections"
// }

export const Details = ({viztype, geography}) => {
    var unit = (geography === "IN") ? "state" : "district"
    
    if (viztype === "statusmap") {
        return (<div>
        <Card.Title className="italic">Adaptive Control Status (by {unit})</Card.Title>
        <p>
        An adaptive control policy sorts geographic units into different policy regimes based on a certain trigger. In the map displayed, each {unit} is colored according to a policy regime based on its <b>reproductive rate</b> (<i>R<sub>t</sub></i>): the number of additional cases in a community that a single person creates. 
        </p>
        In the policy presented, we restrict movement in each {unit} based on the following criteria:
            <br></br>
            <Table>
            <thead>
                <tr style={{"text-align": "center"}}> <th>Policy Regime</th> <th>Trigger</th> <th>Description</th> </tr>
                <tr> <td><Badge pill size="lg" variant="danger">  CRITICAL </Badge></td>  <td><i>R<sub>t</sub></i> &ge; 2 </td></tr>
                <tr> <td><Badge pill size="lg" variant="warning">  MODERATE </Badge></td> <td><i>1 &le; R<sub>t</sub></i> &lt; 2 </td> </tr>
                <tr> <td><Badge pill size="lg" variant="success"> IMPROVING </Badge></td> <td><i>R<sub>t</sub></i> &lt; 1</td> </tr>
            </thead>
            </Table>
        </div>
        )
    } else if (viztype === "confirmed") {
        return (
        <div>
            <Card.Title className="italic">Confirmed cases </Card.Title>
            <p>This plot shows the number of COVID-19 confirmed cases over time.</p>
            {
            (unit === "district") &&
            <p>The purple line shows cases for the given state. The grey line represents cases for the entire country, for comparison. </p>
            }
        </div>)
    } else if (viztype === "recovered") {
        return (
        <div>
            <Card.Title className="italic">Recovered cases </Card.Title>
            <p>This plot shows the number of COVID-19 recovered cases over time.</p>
            {
            (unit === "district") &&
            <p>The purple line shows recoveries for the given state. The grey line represents recoveries for the entire country, for comparison. </p>
            }
        </div>)
    } else if (viztype === "tested") {
        return (
        <div>
            <Card.Title className="italic">Tests </Card.Title>
            <p>This plot shows the number of COVID-19 tests over time.</p>
            {
            (unit === "district") &&
            <p>The purple line shows tests for the given state. The grey line represents tests for the entire country, for comparison. </p>
            }
        </div>)
    } else if (viztype === "deceased") {
        return (
        <div>
            <Card.Title className="italic">Deaths </Card.Title>
            <p>This plot shows the number of COVID-19 confirmed deaths over time.</p>
            {
            (unit === "district") &&
            <p>The purple line shows deaths for the given state. The grey line represents deaths for the entire country, for comparison. </p>
            }
        </div>)
    } else if (viztype === "active") {
        return (
        <div>
            <Card.Title className="italic">Active cases </Card.Title>
            <p>This plot shows the number of COVID-19 active cases over time.</p>
            {
            (unit === "district") &&
            <p>The purple line shows active cases for the given state. The grey line represents active cases for the entire country, for comparison. </p>
            }
        </div>)
    } else if (viztype === "active per million") {
        return (
        <div>
            <Card.Title className="italic">Lower bound on confirmed infection rate </Card.Title>
            <p>This plot shows the number of COVID-19 confirmed cases per million people, giving us a lower bound on the infection rate.</p>
            {
            (unit === "district") &&
            <p>The purple line shows cases per million for the given state. The grey line represents cases per million for the entire country, for comparison. </p>
            }
        </div>)
    } else if (viztype === "cfr") {
        return (
        <div>
            <Card.Title className="italic">Case fatality rate </Card.Title>
            <p>This plot shows the ratio of COVID-19 deaths to confirmed cases over time.</p>
            {
            (unit === "district") &&
            <p>The purple line shows case fatality rate for the given state. The grey line represents case fatality rate for the entire country, for comparison. </p>
            }
        </div>)
    } else if (viztype === "recovery rate") {
        return (
        <div>
            <Card.Title className="italic">Confirmed recovered rate </Card.Title>
            <p>This plot shows the number of COVID-19 recovered cases per million people.</p>
            {
            (unit === "district") &&
            <p>The purple line shows recovered rate for the given state. The grey line represents the rate for the entire country, for comparison. </p>
            }
        </div>)
    } else if (viztype === "infection rate to date") {
        return (
        <div>
            <Card.Title className="italic">Confirmed infection rate to date </Card.Title>
            <p>This plot shows the ratio of COVID-19 active cases to the number of tests over time.</p>
            {
            (unit === "district") &&
            <p>The purple line shows confirmed infection rate for the given state. The grey line represents the rate for the entire country, for comparison. </p>
            }
        </div>)
    } else if (viztype === "infection rate this week") {
        return (
        <div>
            <Card.Title className="italic">Confirmed infection rate this week </Card.Title>
            <p>This plot shows the ratio of new COVID-19 active cases this week to the number of tests this week.</p>
            {
            (unit === "district") &&
            <p>The purple line shows confirmed infection rate for the given state. The grey line represents the rate for the entire country, for comparison. </p>
            }
        </div>)
    } else if (viztype === "cfr this week") {
        return (
        <div>
            <Card.Title className="italic">Case fatality rate this week </Card.Title>
            <p>This plot shows the ratio of new COVID-19 deaths this week to confirmed cases this week.</p>
            {
            (unit === "district") &&
            <p>The purple line shows case fatality rate for the given state. The grey line represents the rate for the entire country, for comparison. </p>
            }
        </div>)
    }
}

// export default Description;