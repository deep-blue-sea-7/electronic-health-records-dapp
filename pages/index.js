import { createMedia } from "@artsy/fresnel";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "../routes";
import { Router } from "../routes";
import web3 from "../ethereum/web3";
import MenuBar from "../components/MenuBar";
import Layout from "../components/Layout";

import { Button, Container, Divider, Grid, Header, Icon, Image, List, Menu, Segment, Sidebar, Visibility, Dropdown } from "semantic-ui-react";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
});

const HomepageHeading = ({ mobile }) => <Layout />;

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
};

const handleClick = () => {
  // window.open(url, "_blank");
  console.log("link us");
};

class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  onClickedPatient = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    Router.pushRoute(`/record/${accounts[0]}`);
  };

  onClickedDoctor = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    Router.pushRoute(`/doctor/${accounts[0]}`);
  };

  handleClick = () => {
    // window.open(url, "_blank");
    console.log("link us");
  };

  render() {
    const { children } = this.props;
    const { fixed } = this.state;

    return (
      <Media greaterThan="mobile">
        <Visibility once={false} onBottomPassed={this.showFixedMenu} onBottomPassedReverse={this.hideFixedMenu}>
          <HomepageHeading />
        </Visibility>

        {children}
      </Media>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
};

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });
  handleToggle = () => this.setState({ sidebarOpened: true });

  onClickedPatient = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    Router.pushRoute(`/record/${accounts[0]}`);
  };

  onClickedDoctor = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    Router.pushRoute(`/doctor/${accounts[0]}`);
  };

  handleClick = () => {
    // window.open(url, "_blank");
    console.log("link us");
  };

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Media as={Sidebar.Pushable} at="mobile">
        <Sidebar.Pushable>
          <Sidebar as={Menu} animation="overlay" inverted onHide={this.handleSidebarHide} vertical visible={sidebarOpened}>
            <Link route="/">
              <a className="item">Home</a>
            </Link>

            <Link route="/dashboard">
              <a className="item">Dashboard</a>
            </Link>

            <Link route="/list">
              <a className="item">Patients List</a>
            </Link>

            <Dropdown item text="Doctor">
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link route="/">
                    <a style={{ color: "black" }} onClick={this.onClickedDoctor}>
                      View Profile
                    </a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route="/edit-doctor">
                    <a style={{ color: "black" }}>Edit Profile</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route="/make-appointment">
                    <a style={{ color: "black" }}>Make Appointment</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route="/edit-appointment">
                    <a style={{ color: "black" }}>Update Appointment</a>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown item text="Patient">
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link route="/">
                    <a style={{ color: "black" }} onClick={this.onClickedPatient}>
                      View Profile
                    </a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route="/edit-patient">
                    <a style={{ color: "black" }}>Edit Profile</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route="/approve-doctor">
                    <a style={{ color: "black" }}>Allow Access</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route="/revoke-doctor">
                    <a style={{ color: "black" }}>Revoke Access</a>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown item text="Register">
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link route="/register-patient">
                    <a style={{ color: "black" }}>Patient</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route="/register-doctor">
                    <a style={{ color: "black" }}>Doctor</a>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment inverted textAlign="center" style={{ minHeight: 350, padding: "1em 0em" }} vertical>
              <Container>
                <Menu inverted pointing secondary size="large">
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name="sidebar" />
                  </Menu.Item>
                </Menu>
              </Container>
              <HomepageHeading mobile />
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Media>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
};

const ResponsiveContainer = ({ children }) => (
  <MediaContextProvider>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </MediaContextProvider>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
};

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: "8em 0em", color: "#116D6E" }} vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h3" style={{ fontSize: "1.7em" }}>
              Blockchain is Revolutionizing Healthcare
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              These are some of the most impactful improvements that Blockchain has provided Healthcare Systems: <br />
              Improved data security, enhanced interoperability, streamlined data sharing, increased transparency, reduced administrative costs, and enhanced
              patient privacy...
            </p>
          </Grid.Column>
          <Grid.Column floated="right" width={6}>
            <Image
              src="https://d2jx2rerrg6sh3.cloudfront.net/image-handler/ts/20210105085915/ri/673/picture/2021/1/shutterstock_1067569886_(1).jpg"
              bordered
              rounded
              size="large"
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Button
              as="a"
              size="huge"
              onClick={() => {
                window.open("https://insights.omnia-health.com/technology/how-blockchain-provides-data-security-cost-savings-and-privacy-healthcare", "_blank");
              }}
              style={{ background: "#088395", color: "#FFFFFF" }}
            >
              Learn More
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: "0em", color: "#116D6E" }} vertical>
      <Grid celled="internally" columns="equal" stackable>
        <Grid.Row textAlign="center">
          <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
            <Header as="h3" style={{ fontSize: "1.7em" }}>
              The Solution for Healthcare Interoperability by Peter Nichol
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              “The beauty of blockchain technology, applied to healthcare, is a centralized platform that decentralizes health data (medical records) increasing
              security of sensitive information. A patient can now use their own signature, combined with that of a hospital signature to unlock data to provide
              more secure access to medical information for use in treatment. The patient by using their profile, has full control of their medical information
              and can select the information shared and viewed by providers or doctors.”
            </p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
            <Header as="h3" style={{ fontSize: "1.7em" }}>
              Blockchain symposium at HIMSS 17 by Tamara StClaire
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              "Think about transferring ownership of data to patients. All of a sudden we have a new paradigm about the way we think of privacy. We may need to
              set default levels for the people who are uncomfortable with the magnitude of that responsibility. There's a lot we need to dig into, and that
              conversation needs to start."
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: "8em 0em", color: "#116D6E" }} vertical>
      <Container text>
        <Header as="h3" style={{ fontSize: "1.7em" }}>
          Major Issues with Electronic Health Records
        </Header>
        <p style={{ fontSize: "1.33em" }}>
          Compared with traditional paper-based medical records, electronic health records (EHRs) are widely used because of their efficiency, security, and
          reducing data redundancy. However, EHRs still manifest poor interoperability and privacy issues are unresolved. As a distributed ledger protocol
          composed of encrypted blocks of data organized in chains, blockchain represents a potential tool to solve the shortcomings of EHRs in terms of
          interoperability and privacy. In this paper...
        </p>
        <Button
          as="a"
          floated="right"
          content="Continue Reading Article"
          size="huge"
          style={{ background: "#088395", color: "#FFFFFF" }}
          onClick={() => {
            window.open("https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9739765/", "_blank");
          }}
        />
        <br />
        <Divider as="h4" className="header" horizontal style={{ margin: "3em 0em", textTransform: "uppercase" }}></Divider>
        <Header as="h3" style={{ fontSize: "1.7em" }}>
          Blockchain technology applications in healthcare: An overview
        </Header>
        <p style={{ fontSize: "1.33em" }}>
          <ul>
            <li> Blockchain is an emerging technology useful to provide innovative solutions in various sectors, including healthcare. </li>
            <li> This paper identifies and discuss significant applications of blockchain for healthcare. </li>
            <li> In healthcare, a blockchain network is useful to preserve and exchange patient data. </li>
            <li> Blockchain application can accurately identify serious mistakes and even dangerous ones in the medical field. </li>
            <li> Blockchain plays a decisive part in handling deception in clinical trials for better healthcare outcomes.</li>
          </ul>
        </p>
        <Button
          as="a"
          size="huge"
          floated="right"
          style={{ background: "#088395", color: "#FFFFFF" }}
          onClick={() => {
            window.open("https://www.sciencedirect.com/science/article/pii/S266660302100021X", "_blank");
          }}
        >
          View Research on Science Direct
        </Button>
      </Container>
    </Segment>

    <Segment inverted vertical style={{ padding: "2em 0em", color: "#116D6E" }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={8} style={{ textAlign: "center" }}>
              <Header inverted as="h4" content="About" size="large" />
              <List link inverted size="large">
                <List.Item as="a">Sitemap</List.Item>
                <List.Item as="a">Contact Us</List.Item>
                <List.Item as="a">Site Details</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={8} style={{ textAlign: "center" }}>
              <Header inverted as="h4" content="Services" size="large" />
              <List link inverted size="large">
                <List.Item as="a">Create Blockchain System</List.Item>
                <List.Item as="a">Store Medical Record</List.Item>
                <List.Item as="a">How To Access</List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
);

export default HomepageLayout;
