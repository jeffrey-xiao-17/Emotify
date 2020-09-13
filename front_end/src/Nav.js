import React, { Component } from "react";
import { createMedia } from "@artsy/fresnel";
import { Link } from "react-router-dom";
// import PropTypes from "prop-types";
import {
  Header,
  Container,
  Menu,
  Segment,
  Visibility,
} from "semantic-ui-react";

const { Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
});

class Nav extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { fixed } = this.state;
    return (
      <Media greaterThan="mobile">
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment textAlign="center" style={{ padding: "1em 0em" }} vertical>
            <Menu
              fixed={fixed ? "top" : null}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
              style={{ border: "none" }}
            >
              <Container>
                <Link class="active item" to="/">
                  <Menu.Item as="a">
                    <Header as="h1">EM😮TIFY</Header>
                  </Menu.Item>
                </Link>

                <Menu.Item position="right">
                  <Link class="item" to="/interaction">
                    Interaction
                  </Link>
                  <Link class="item" to="/results">
                    Results
                  </Link>
                  <Link class="item" to="/history">
                    History
                  </Link>
                </Menu.Item>
              </Container>
            </Menu>
          </Segment>
        </Visibility>
      </Media>
    );
  }
}

export default Nav;
