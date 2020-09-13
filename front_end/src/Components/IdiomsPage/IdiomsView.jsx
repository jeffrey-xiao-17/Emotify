import React, { Component, Fragment } from "react";
import styles from "../../css/ChatBot.module.css";
import cx from "classnames";
import Avatar from "avataaars";
import data from "./idioms.json";


class IdiomsView extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
    }

    lol() {
        console.log(data);
    }

    render() {
        return (
            <Fragment>
                <h1>Hello world</h1>
                <button onClick={this.lol}>asdf</button>
            </Fragment>
        )
    }
}

export default IdiomsView;