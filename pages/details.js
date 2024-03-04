import React, { Component } from "react";
import { useEffect, useState } from "react";
import { Grid, Segment, Header, Image, Message } from "semantic-ui-react";
import toast, { Toaster } from "react-hot-toast";
import Layout from "../components/Layout";
import record from "../ethereum/record";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

class RecordDetails extends Component {
  static async getInitialProps(props) {
    const addr = props.query.address;
    const accounts = await web3.eth.getAccounts();
    var records, records2, appointment, profilePic, returnStatus;

    try {
      records = await record.methods.searchPatientDemographic(addr).call({ from: accounts[0] });
      records2 = await record.methods.searchPatientMedical(addr).call({ from: accounts[0] });
      appointment = await record.methods.searchAppointment(addr).call({ from: accounts[0] });

      if (appointment[0].includes("0x00000000000")) appointment[0] = "";

      profilePic = records[3] == "Male" ? "https://cdn-icons-png.flaticon.com/128/3135/3135715.png" : "https://cdn-icons-png.flaticon.com/512/3135/3135789.png";

      return {
        ic: records[0],
        name: records[1],
        phone: records[2],
        gender: records[3],
        dob: records[4],
        height: records[5],
        weight: records[6],

        houseaddr: records2[0],
        bloodgroup: records2[1],
        allergies: records2[2],
        medication: records2[3],
        emergencyName: records2[4],
        emergencyContact: records2[5],

        doctoraddr: appointment[0],
        doctorname: appointment[1],
        date: appointment[2],
        time: appointment[3],
        diagnosis: appointment[4],
        prescription: appointment[5],
        description: appointment[6],
        status: appointment[7],
        profilePic,
        returnStatus: true,
      };
    } catch (err) {
      return { returnStatus: false };
    }
  }

  renderDisplay() {
    if (!this.props.returnStatus) {
      toast.error("You do not have permission to view this patient's record");
      return;
    } else
      return (
        <Grid columns={2} stackable className="fill-content">
          <Grid.Row>
            <Grid.Column width={1} />
            <Grid.Column width={5}>
              <Segment>
                <Image style={{ marginBottom: "25px" }} className="centered" src={this.props.profilePic} size="small" circular />
                <Segment>
                  <h2 style={{ marginBottom: "25px", color: "#088395" }}>{this.props.name}</h2>
                  <Grid columns={2}>
                    <Grid.Row>
                      <Grid.Column>
                        <b style={{ color: "#088395" }}>MRN</b>
                      </Grid.Column>
                      <Grid.Column>
                        <b>{this.props.ic}</b>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <Grid columns={2}>
                    <Grid.Row>
                      <Grid.Column>
                        <b style={{ color: "#088395" }}>Phone</b>
                      </Grid.Column>
                      <Grid.Column>
                        <b>{this.props.phone}</b>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <Grid columns={2}>
                    <Grid.Row>
                      <Grid.Column>
                        <b style={{ color: "#088395" }}>Gender</b>
                      </Grid.Column>
                      <Grid.Column>
                        <b>{this.props.gender}</b>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>
              </Segment>
              <Segment>
                <Header as="h3" style={{ marginBottom: "25px", color: "#088395" }}>
                  EMERGENCY CONTACT
                </Header>
                <Grid columns={2} verticalAlign="top">
                  <Grid.Row>
                    <Grid.Column>
                      <b style={{ color: "#088395" }}>Name</b>
                      <div style={{ fontWeight: "bold" }}>{this.props.emergencyName}</div>
                    </Grid.Column>
                    <Grid.Column>
                      <b style={{ color: "#088395" }}>Phone</b>
                      <div style={{ fontWeight: "bold" }}>{this.props.emergencyContact}</div>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Grid.Column>
            <Grid.Column width={9}>
              <Segment>
                <Header as="h3" style={{ marginBottom: "25px", color: "#088395" }}>
                  PERSONAL DETAILS
                </Header>
                <Grid columns={4} verticalAlign="top">
                  <Grid.Row>
                    <Grid.Column>
                      <b style={{ color: "#088395" }}>Full Name</b>
                      <div style={{ fontWeight: "bold" }}>{this.props.name}</div>
                    </Grid.Column>
                    <Grid.Column>
                      <b style={{ color: "#088395" }}>Birthdate</b>
                      <div style={{ fontWeight: "bold" }}>{this.props.dob}</div>
                    </Grid.Column>
                    <Grid.Column>
                      <b style={{ color: "#088395" }}>Height</b>
                      <div style={{ fontWeight: "bold" }}>{this.props.height} in</div>
                    </Grid.Column>
                    <Grid.Column>
                      <b style={{ color: "#088395" }}>Weight</b>
                      <div style={{ fontWeight: "bold" }}>{this.props.weight} lb</div>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Grid columns={1}>
                  <Grid.Row>
                    <Grid.Column>
                      <b style={{ color: "#088395" }}>Address</b>
                      <div style={{ fontWeight: "bold" }}>{this.props.houseaddr}</div>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

                <Header as="h3" style={{ marginTop: "35px", marginBottom: "25px", color: "#088395" }}>
                  MEDICAL DETAILS
                </Header>
                <Grid columns={2} verticalAlign="top">
                  <Grid.Row>
                    <Grid.Column>
                      <b style={{ color: "#088395" }}>Blood Group</b>
                      <div style={{ fontWeight: "bold" }}>{this.props.bloodgroup}</div>
                    </Grid.Column>
                    <Grid.Column>
                      <b style={{ color: "#088395" }}>Allergies</b>
                      <div style={{ fontWeight: "bold" }}>{this.props.allergies}</div>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

                <Grid>
                  <Grid.Row>
                    <Grid.Column>
                      <b style={{ color: "#088395" }}>Medications</b>
                      <div style={{ fontWeight: "bold" }}>{this.props.medication}</div>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>

              <Segment>
                <Header as="h3" style={{ marginBottom: "25px", color: "#088395" }}>
                  APPOINTMENT
                </Header>
                <Grid columns={1} verticalAlign="top">
                  <Grid.Row>
                    <Grid.Column>
                      <b style={{ color: "#088395" }}>Doctor Address</b>
                      <div style={{ fontWeight: "bold" }}>{this.props.doctoraddr}</div>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Grid columns={3}>
                  <Grid.Row>
                    <Grid.Column>
                      <b style={{ color: "#088395" }}>Doctor Name</b>
                      <div style={{ fontWeight: "bold" }}>{this.props.doctorname}</div>
                    </Grid.Column>
                    <Grid.Column>
                      <b style={{ color: "#088395" }}>Date</b>
                      <div style={{ fontWeight: "bold" }}>{this.props.date}</div>
                    </Grid.Column>
                    <Grid.Column>
                      <b style={{ color: "#088395" }}>Time</b>
                      <div style={{ fontWeight: "bold" }}>{this.props.time}</div>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

                <Grid columns={2}>
                  <Grid.Row>
                    <Grid.Column>
                      <b style={{ color: "#088395" }}>Prescription</b>
                      <div style={{ fontWeight: "bold" }}>{this.props.prescription}</div>
                    </Grid.Column>
                    <Grid.Column>
                      <b style={{ color: "#088395" }}>Description</b>
                      <div style={{ fontWeight: "bold" }}>{this.props.description}</div>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

                <Grid columns={2}>
                  <Grid.Row>
                    <Grid.Column>
                      <b style={{ color: "#088395" }}>Diagnosis</b>
                      <div style={{ fontWeight: "bold" }}>{this.props.diagnosis}</div>
                    </Grid.Column>
                    <Grid.Column>
                      <b style={{ color: "#088395" }}>Status</b>
                      <div style={{ fontWeight: "bold" }}>{this.props.status}</div>
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

        <div style={{ fontFamily: "Helvetica" }}>{this.renderDisplay()}</div>
      </Layout>
    );
  }
}

export default RecordDetails;
