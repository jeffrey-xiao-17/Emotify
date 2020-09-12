import React, { Component } from "react";
import { createMedia } from "@artsy/fresnel";
import { Link } from "react-router-dom";
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
            >
              <Container>
                <Link to="/">
                  <Menu.Item as="a">
                    <Header as="h1">EMOTIFY</Header>
                  </Menu.Item>
                </Link>

                <Menu.Item position="right">
                  <Link to="/interaction">
                    <a class="active item">Interaction</a>
                  </Link>
                  <Link to="/results">
                    <a class="item">Results</a>
                  </Link>
                  <Link to="/history">
                    <a class="item">History</a>
                  </Link>
                </Menu.Item>
              </Container>
            </Menu>
          </Segment>
        </Visibility>
      </Media>
    );
  }

  // render() {
  //   return (
  //     <div className={styles.center}>
  //       <div class="ui large pointing secondary menu">
  //         <div className={cx("ui container", "right item")}>
  //           <a class="item">APP TITLE PLACEHOLDER</a>
  //         </div>
  //         <div class="right item">
  // <Link to="/">
  //   <a class="active item">Conversation</a>
  // </Link>
  // <Link to="/results">
  //   <a class="item">Results</a>
  // </Link>
  // <Link to="/history">
  //   <a class="item">History</a>
  // </Link>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
}

export default Nav;
