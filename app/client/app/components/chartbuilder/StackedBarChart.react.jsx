"use strict"

import React, { PropTypes } from 'react'
import d3plus from 'd3plus'
import _ from 'lodash'

import BaseChart, { updateBaseChart } from './BaseChart'

class StackedBarChart extends React.Component {
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.object),
        items: PropTypes.object,
        noTimeline: PropTypes.bool
    };

    componentDidMount() {
        let { data, attributes, noTimeline } = this.props

        // var data = this.state.data;
        this.visualization = BaseChart(this.props)
            .axes({
                'background' : {
                    'color': '#ffffff',
                    'stroke' : {
                        'color' : '#cccccc',
                        'width' : '1'
                    }
                },
                'mirror' : false,
                'ticks' : true
            })
            .data(data)
            .type("bar")
            .id("id")
            .text(x => x.name + " - " + x.aggregation)
            .x({value: "x", label: "Year"})
            .y({value: "y", label: "Transaction value", stacked: true})
            .time("x")
            .timeline(noTimeline ? false : {
                handles: {
                    color: '#3A99D8',
                    stroke: 0,
                    size: 3,
                    opacity: 1,
                    hover: '#298dcf'
                },
                height: false,
                tick: '#e6e6e6',
            })
            .tooltip(["x", "y", "count", "activity_count"])
            .draw()
    }

    componentDidUpdate() {
        let { data, attributes } = this.props

        updateBaseChart(this.visualization, this.props)
            .data(data)
            .draw();

    }

    render() {
        return (
            <div id={`chart-${this.props.vizId}`} className="chart"></div>
        )
    }
}

module.exports = StackedBarChart
