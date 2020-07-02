import React from "react";
import {LineChart, XAxis, YAxis, Tooltip, Legend, Line, CartesianGrid, ResponsiveContainer} from "recharts";
import { state_codes } from "./Plots.js";

class C19ApiChart extends React.Component { 
    constructor(props) {
        super(props);
        this.state = { data: null };
        this.pop_list = {"AN": 0.397, "AP": 52.221, "AR": 1.504, "AS": 34.293, "BR": 119.52, "CH": 1.179, "CT": 28.724,
        "DN": 0.959, "DL": 19.814, "GA": 1.54, "GJ": 67.936, "HR": 28.672, "HP": 7.3, "JK": 13.203, "JH": 37.403, "KA": 65.798,
        "KL": 35.125, "LA": 0.293, "LD": 0.064, "MP": 82.232, "MH": 122.153, "MN": 3.103, "ML": 3.224, "MZ": 1.192, "NL": 2.15,
        "OR": 43.671, "PY": 1.504, "PB": 29.859, "RJ": 77.264, "SK": 0.664, "TN": 75.695, "TG": 37.22, "TR": 3.992, "UP": 224.979,
        "UT": 11.141, "WB": 96.906, "TT": 1332.83};
    }
     
    componentDidMount() {
        fetch('https://api.covid19india.org/v3/timeseries.json')
            .then(response => response.json())
            .then(data => {
                var flattened = {}  
                Object.keys(data).forEach((state, _) => {
                    var ts = []                        
                    Object.keys(data[state]).forEach((date, _) => {
                        var total = data[state][date]["total"] || {}
                        var delta = data[state][date]["delta"] || {}
                        var d = date.slice(0,10).split("-")
                        if (isNaN(total["deceased"]) && isNaN(total["recovered"])) {
                            ts.push({ 
                                "date": d[1] +'/'+ d[2] +'/'+ d[0],
                                "confirmed": total["confirmed"] || 0,
                                "recovered": total["recovered"] || 0,
                                "tested":    total["tested"]    || 0,
                                "deceased":    total["deceased"] || 0,
                                "infection rate this week": delta["confirmed"]/delta["tested"] || 0,
                                "infection rate to date": Math.round((delta["confirmed"]/delta["tested"])*1000)/1000 || 0,
                                "active": total["confirmed"] || 0,
                                "active per million": Math.round((total["confirmed"]/this.pop_list[state])*1000)/1000 || 0,
                                "cfr":  0,
                                "cfr this week":  0,
                                "recovery rate": total["recovered"]/this.pop_list[state] || 0,
                             })
                        } else if (isNaN(total["deceased"])) {
                            ts.push({ 
                                "date": d[1] +'/'+ d[2] +'/'+ d[0],
                                "confirmed": total["confirmed"] || 0,
                                "recovered": total["recovered"] || 0,
                                "tested":    total["tested"]    || 0,
                                "deceased":    total["deceased"] || 0,
                                "infection rate this week": delta["confirmed"]/delta["tested"] || 0,
                                "infection rate to date": Math.round((delta["confirmed"]/delta["tested"])*1000)/1000 || 0,
                                "active": total["confirmed"] - total["recovered"] || 0,
                                "active per million": Math.round(((total["confirmed"] - total["recovered"])/this.pop_list[state])*1000)/1000 || 0,
                                "cfr":  0,
                                "cfr this week": 0,
                                "recovery rate": total["recovered"]/this.pop_list[state] || 0,
                             })
                        } else {
                            ts.push({
                                "date": d[1] +'/'+ d[2] +'/'+ d[0],
                                "confirmed": total["confirmed"] || 0,
                                "recovered": total["recovered"] || 0,
                                "tested":    total["tested"]    || 0,
                                "deceased":    total["deceased"] || 0,
                                "infection rate this week": Math.round((delta["confirmed"]/delta["tested"])*1000)/1000 || 0,
                                "infection rate to date": Math.round((delta["confirmed"]/delta["tested"])*1000)/1000 || 0,
                                "active":    total["confirmed"] - total["recovered"] - total["deceased"] || 0,
                                "active per million": Math.round(((total["confirmed"] - total["recovered"] - total["deceased"])/this.pop_list[state])*1000)/1000 || 0,
                                "cfr": Math.round((total["deceased"]/total["confirmed"])*1000)/1000 || 0,
                                "cfr this week": Math.round((delta["deceased"]/delta["confirmed"])*1000)/1000 || 0,
                                "recovery rate": total["recovered"]/this.pop_list[state] || 0,
                                
                            }) 
                        } 
                    })
                    flattened[state] = ts
                })
            this.setState({ data: flattened })
        });
    }



    render() { 
        console.log("rendering chart")
        if (this.state.data === null)
            return <p>l o a d i n g . . .</p>
        console.log(this.state.data)        
        if (this.props.vizType === "confirmed" || this.props.vizType === "recovered" || this.props.vizType === "tested" || this.props.vizType === "deceased" || this.props.vizType === "active") {
            return <>
            <ResponsiveContainer>
            <LineChart margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis allowDuplicatedCategory={false} dataKey="date" />
                <YAxis scale="log" domain={['auto', 'auto']} />
                <Tooltip />
                <Legend />
                <Line name={state_codes[this.props.geography]} type="monotone" data={this.state.data[this.props.geography].slice(-50)} dataKey={this.props.vizType} stroke="#8884d8" activeDot={{ r: 5 }} dot={false}/>
                <Line name="Total India" type="monotone" data={this.state.data["TT"].slice(-50)} dataKey={this.props.vizType} stroke="#6c757d" activeDot={{ r: 5 }} dot={false}/>
            </LineChart>
            </ResponsiveContainer>
            </>
        }
        if (this.props.vizType === "active per million" || this.props.vizType === "cfr" || this.props.vizType === "recovery rate" || this.props.vizType === "infection rate to date" ) {
            return <>
            <ResponsiveContainer>
            <LineChart margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis allowDuplicatedCategory={false} dataKey="date"/>
                <YAxis />
                <Tooltip />
                <Legend />
                <Line name={state_codes[this.props.geography]} type="monotone" data={this.state.data[this.props.geography].slice(-50)} dataKey={this.props.vizType} stroke="#8884d8" activeDot={{ r: 5 }} dot={false} />
                <Line name="Total India" type="monotone" data={this.state.data["TT"].slice(-50)} dataKey={this.props.vizType} stroke="#6c757d" activeDot={{ r: 5 }} dot={false}/>
            </LineChart>
            </ResponsiveContainer>
            </>
        }
        if (this.props.vizType === "infection rate this week" || this.props.vizType === "cfr this week" ) {
            return <>
            <ResponsiveContainer>
            <LineChart margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis allowDuplicatedCategory={false} dataKey="date"/>
                <YAxis />
                <Tooltip />
                <Legend />
                <Line name={state_codes[this.props.geography]} type="monotone" data={this.state.data[this.props.geography].slice(-8,-1)} dataKey={this.props.vizType} stroke="#8884d8" activeDot={{ r: 5 }} dot={false} />
                <Line name="Total India" type="monotone" data={this.state.data["TT"].slice(-8, -1)} dataKey={this.props.vizType} stroke="#6c757d" activeDot={{ r: 5 }} dot={false}/>
            </LineChart>
            </ResponsiveContainer>
            </>
        }
    }
}

export default C19ApiChart;