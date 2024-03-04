import React, { Component } from "react";
import { Grid, Segment, Header, Image } from "semantic-ui-react";
import toast, { Toaster } from "react-hot-toast";
import Layout from "../components/Layout";
import record from "../ethereum/record";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

class DoctorDetails extends Component {
  static async getInitialProps(props) {
    const addr = props.query.address;
    const accounts = await web3.eth.getAccounts();
    var doctor, profilePic;

    try {
      console.log("accounts[0]: ", accounts[0]);

      doctor = await record.methods.searchDoctor(addr).call({ from: accounts[0] });
      profilePic =
        doctor[3] == "Male"
          ? "https://tse4.mm.bing.net/th?id=OIP.HbDA5tA1u_7TWeXtJugWTQHaHa&pid=Api&P=0&w=300&h=300"
          : "https://tse3.explicit.bing.net/th?id=OIP.lHapBFWfDfNUS9uqYUGLmAHaHa&pid=Api&P=0&w=300&h=300";

      return {
        ic: doctor[0],
        name: doctor[1],
        phone: doctor[2],
        gender: doctor[3],
        dob: doctor[4],
        qualification: doctor[5],
        major: doctor[6],
        profilePic,
      };
    } catch (err) {
      toast.error("You have not created an account");
      Router.pushRoute("/");
    }
  }

  renderDisplayNew() {
    return (
      <Grid columns={2} stackable className="fill-content">
        <Grid.Row>
          <Grid.Column width={1} />
          <Grid.Column width={14}>
            <Segment raised color="teal" style={{ color: "#088395" }}>
              <Image style={{ marginBottom: "5px" }} className="centered" src={this.props.profilePic} size="small" circular />
              <Segment>
                <h2 style={{ textAlign: "center" }}>{this.props.name}</h2>
              </Segment>
            </Segment>
            <Segment raised color="teal" style={{ color: "#088395" }} size="large">
              <Header as="h2" color="grey" style={{ marginBottom: "15px" }} size="small">
                PERSONAL DETAILS
              </Header>
              <Grid columns={3} verticalAlign="top">
                <Grid.Row>
                  <Grid.Column>
                    <b style={{ color: "grey" }}>Full Name</b>
                    <div style={{ marginTop: "0.5em" }}>{this.props.name}</div>
                  </Grid.Column>
                  <Grid.Column>
                    <b style={{ color: "grey" }}>NPI</b>
                    <div style={{ marginTop: "0.5em" }}>{this.props.ic}</div>
                  </Grid.Column>
                  <Grid.Column>
                    <b style={{ color: "grey" }}>Gender</b>
                    <div style={{ marginTop: "0.5em" }}>{this.props.gender}</div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Grid columns={2} verticalAlign="top">
                <Grid.Row>
                  <Grid.Column>
                    <b style={{ color: "grey" }}>Phone</b>
                    <div style={{ marginTop: "0.5em" }}>{this.props.phone}</div>
                  </Grid.Column>
                  <Grid.Column>
                    <b style={{ color: "grey" }}>Birthdate</b>
                    <div style={{ marginTop: "0.5em" }}>{this.props.dob}</div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Header as="h3" color="grey" style={{ marginTop: "25px", marginBottom: "15px" }} size="small">
                EDUCATION DETAILS
              </Header>
              <Grid columns={2} verticalAlign="top">
                <Grid.Row>
                  <Grid.Column>
                    <b style={{ color: "grey" }}>Highest Qualification</b>
                    <div style={{ marginTop: "0.5em" }}>{this.props.qualification}</div>
                  </Grid.Column>
                  <Grid.Column>
                    <b style={{ color: "grey" }}>Major</b>
                    <div style={{ marginTop: "0.5em" }}>{this.props.major}</div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Grid.Column>
          <Grid.Column width={1} />
        </Grid.Row>
      </Grid>
    );
  }

  render() {
    return (
      <Layout>
        <div>
          <Toaster
            containerStyle={{
              position: "relative",
            }}
            toastOptions={{
              style: {
                fontSize: "1.5em",
                fontWeight: "bold",
                minWidth: "fit-content",
                padding: "15px",
                marginTop: "200px",
              },
              success: {
                style: {
                  backgroundColor: "#78D6C6",
                  color: "white",
                },
                iconTheme: {
                  primary: "#78D6C6",
                  secondary: "#78D6C6",
                },
              },
              error: {
                style: {
                  backgroundColor: "#FE8F8F",
                  color: "white",
                },
                iconTheme: {
                  primary: "#FE8F8F",
                  secondary: "#FE8F8F",
                },
              },
            }}
          />{" "}
        </div>
        <div>{this.renderDisplayNew()}</div>
      </Layout>
    );
  }
}

export default DoctorDetails;
