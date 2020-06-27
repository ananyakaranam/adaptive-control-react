import React from "react";
import {LineChart, XAxis, YAxis, Tooltip, Legend, Line, CartesianGrid, ResponsiveContainer} from "recharts";

class C19ApiChart extends React.Component { 
    constructor(props) {
        super(props);
        this.state = { data: null };
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
                        ts.push({
                            "date": date, 
                            "confirmed": total["confirmed"] || 0,
                            "recovered": total["recovered"] || 0,
                            "tested":    total["tested"]    || 0,
                            "deceased":    total["deceased"]    || 0,
                            "active":    total["confirmed"] - total["recovered"] - total["deceased"] || 0,
                            "prevalence": total["confirmed"]/total["tested"] || 0,
                        })
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
        return <>
        <ResponsiveContainer>
        <LineChart data={this.state.data[this.props.geography]} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={this.props.vizType} stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
        </ResponsiveContainer>
        </>
    }
}

export default C19ApiChart;