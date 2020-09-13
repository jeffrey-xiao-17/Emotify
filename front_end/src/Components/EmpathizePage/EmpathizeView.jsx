import React, { Component } from "react";
import styles from "../../css/InteractionView.module.css";
import cx from "classnames";
import Avatar from "avataaars";
import { getText } from "./empathize";

class EmpathizeView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            avatarGenerator: props.avatarGenerator,
            avatar: props.avatarGenerator(),
            sourceText: "",
            link: ""
        }
    }

    componentDidMount() {
        this.loadNewText();
    }

    async loadNewText() {
        const [sourceText, link] = await getText();
        this.setState({
            sourceText: sourceText,
            link: link
        })
    }

    render() {
        return (
            <div className={styles.width}>
                <h1 style={{ textAlign: "center" }}>{this.state.sourceText}</h1>
                <div className={styles.window}>
                    <Avatar
                        className={cx("ui image", styles.avatar)}
                        style={{
                            maxHeight: "50vh",
                            height: "100vh",
                            width: "100%",
                        }}
                        avatarStyle="Transparent"
                        topType={this.state.avatar.topType}
                        accessoriesType={this.state.avatar.accessoriesType}
                        hairColor={this.state.avatar.hairColor}
                        hatColor={this.state.avatar.hatColor}
                        facialHairType={this.state.avatar.facialHairType}
                        clotheType={this.state.avatar.clotheType}
                        clotheColor={this.state.avatar.clotheColor}
                        skinColor={this.state.avatar.skinColor}
                        eyeType={this.state.avatar.eyeType}
                        eyebrowType={this.state.avatar.eyeType}
                        mouthType={this.state.avatar.eyeType}
                    />
                </div>
            </div>
        )
    }
}

export default EmpathizeView;