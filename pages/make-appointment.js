import React, { Component } from "react";
import { Divider, Form, Input, Button, Segment, Message, Select } from "semantic-ui-react";
import toast, { Toaster } from "react-hot-toast";
import Layout from "../components/Layout";
import record from "../ethereum/record";
import web3 from "../ethereum/web3";

const statusOptions = [
  { key: "p", text: "Pending", value: "Pending" },
  { key: "c", text: "Complete", value: "Complete" },
];

class MakeAppointment extends Component {
  state = {
    patientaddr: "",
    date: "",
    time: "",
    prescription: "",
    description: "",
    diagnosis: "",
    status: "",
    errorMessage: "",
  };

  handleStatus = (e, { value }) => this.setState({ status: value });

  onSubmit = async (event) => {
    event.preventDefault();

    const { patientaddr, date, time, diagnosis, prescription, description, status } = this.state;

    this.setState({ loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();

      await record.methods.setAppointment(patientaddr, date, time, diagnosis, prescription, description, status).send({ from: accounts[0] });

      toast.success("Appointment created successfully!");
    } catch (err) {
      this.setState({ errorMessage: err.message });
      toast.error("An error has occured");
    }

    this.setState({ loading: false, patientaddr: "", date: "", time: "", prescription: "", description: "", diagnosis: "", status: "" });
  };

  render() {
    return (
      <Layout>
        <Segment padded raised color="teal">
          <h2 style={{ color: "#088395" }}>Make an Appointment</h2>
        </Segment>
        <Segment raised color="teal" style={{ color: "#088395" }}>
          <h3 style={{ marginTop: "2px", marginBottom: "5px" }}>Appointment Information</h3>
          <Divider clearing />
          <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} size="large" key="large">
            <Form.Group widths="equal">
              <Form.Field>
                <label>Patient's Ethereum Address</label>
                <Input
                  placeholder="0xF6973b46412ff52c1BfDB783D29e5218620Be541"
                  value={this.state.patientaddr}
                  onChange={(event) => this.setState({ patientaddr: event.target.value })}
                />
              </Form.Field>
            </Form.Group>

            <br />
            <Form.Group widths="equal">
              <Form.Field>
                <label>Date</label>
                <Input placeholder="10/10/2022" value={this.state.date} onChange={(event) => this.setState({ date: event.target.value })} />
              </Form.Field>

              <Form.Field>
                <label>Time</label>
                <Input placeholder="10:30am" value={this.state.time} onChange={(event) => this.setState({ time: event.target.value })} />
              </Form.Field>

              <Form.Field label="Status" control={Select} options={statusOptions} onChange={this.handleStatus} />
            </Form.Group>

            <br />
            <h3 style={{ marginTop: "2px", marginBottom: "5px" }}>Medical Information</h3>
            <Divider clearing />
            <Form.TextArea
              rows="1"
              label="Prescription"
              placeholder="Amoxicillin 500mg"
              value={this.state.prescription}
              onChange={(event) => this.setState({ prescription: event.target.value })}
            />

            <br />
            <Form.TextArea
              rows="1"
              label="Diagnosis"
              placeholder="Skin Infection"
              value={this.state.diagnosis}
              onChange={(event) => this.setState({ diagnosis: event.target.value })}
            />
            <br />
            <Form.TextArea
              rows="1"
              label="Notes"
              placeholder="Still requires further observation"
              value={this.state.description}
              onChange={(event) => this.setState({ description: event.target.value })}
            />

            <br />
            <Message error header="Oops!" content={this.state.errorMessage} />
            <Button primary loading={this.state.loading} size="large" align="right" style={{ backgroundColor: "#088395" }}>
              Create
            </Button>
          </Form>
        </Segment>
        <br />

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
      </Layout>
    );
  }
}

export default MakeAppointment;
