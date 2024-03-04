import React, { Component } from "react";
import { Divider, Form, Input, Button, Segment, Message, Select } from "semantic-ui-react";
import toast, { Toaster } from "react-hot-toast";
import Layout from "../components/Layout";
import record from "../ethereum/record";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

const options = [
  { key: "m", text: "Male", value: "Male" },
  { key: "f", text: "Female", value: "Female" },
  { key: "o", text: "Other", value: "Other" },
];

const allergyOptions = [
  { key: "f", text: "Food", value: "Food" },
  { key: "m", text: "Medical", value: "Medical" },
  { key: "e", text: "Environmental", value: "Environmental" },
  { key: "o", text: "Others", value: "Others" },
];

class RegisterPatient extends Component {
  state = {
    ic: "",
    name: "",
    phone: "",
    gender: "",
    dob: "",
    height: "",
    weight: "",
    houseaddr: "",
    bloodgroup: "",
    allergies: "",
    medication: "",
    emergencyName: "",
    emergencyContact: "",
    loading: false,
    errorMessage: "",
  };

  handleGender = (e, { value }) => this.setState({ gender: value });

  handleAllergies = (e, { value }) => this.setState({ allergies: value });

  onSubmit = async (event) => {
    event.preventDefault();

    const { ic, name, phone, gender, dob, height, weight, houseaddr, bloodgroup, allergies, medication, emergencyName, emergencyContact } = this.state;

    this.setState({ loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();

      await record.methods
        .setDetails(ic, name, phone, gender, dob, height, weight, houseaddr, bloodgroup, allergies, medication, emergencyName, emergencyContact)
        .send({ from: accounts[0] });

      toast.success("Account created successfully!");
      Router.pushRoute("/list");
    } catch (err) {
      this.setState({ errorMessage: err.message });
      toast.error("Account already exists");
    }

    this.setState({
      loading: false,
      ic: "",
      name: "",
      phone: "",
      gender: "",
      dob: "",
      height: "",
      weight: "",
      houseaddr: "",
      bloodgroup: "",
      allergies: "",
      medication: "",
      emergencyName: "",
      emergencyContact: "",
    });
  };

  render() {
    return (
      <Layout>
        <Segment padded raised color="teal">
          <h2 style={{ color: "#088395" }}>Create New Record</h2>
        </Segment>
        <Segment raised color="teal" style={{ color: "#088395" }}>
          <h3 style={{ marginTop: "2px", marginBottom: "5px" }}>General Information</h3>
          <Divider clearing />
          <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} size="large" key="large">
            <Form.Group widths="equal">
              <Form.Field>
                <label>Medical Record Number</label>
                <Input placeholder="001234010234" value={this.state.ic} onChange={(event) => this.setState({ ic: event.target.value })} />
              </Form.Field>

              <Form.Field>
                <label>Full Name</label>
                <Input placeholder="John Smith" value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })} />
              </Form.Field>

              <Form.Field>
                <label>Phone</label>
                <Input placeholder="0123456789" value={this.state.phone} onChange={(event) => this.setState({ phone: event.target.value })} />
              </Form.Field>
            </Form.Group>
            <br />
            <Form.Group widths="equal">
              <Form.Field label="Gender" control={Select} options={options} onChange={this.handleGender} />

              <Form.Field>
                <label>Date of Birth</label>
                <Input placeholder="01/01/1997" value={this.state.dob} onChange={(event) => this.setState({ dob: event.target.value })} />
              </Form.Field>

              <Form.Field>
                <label>Height</label>
                <Input
                  placeholder="5' 7"
                  label={{ basic: true, content: "in" }}
                  labelPosition="right"
                  value={this.state.height}
                  onChange={(event) => this.setState({ height: event.target.value })}
                />
              </Form.Field>

              <Form.Field>
                <label>Weight</label>
                <Input
                  placeholder="165"
                  label={{ basic: true, content: "lb" }}
                  labelPosition="right"
                  value={this.state.weight}
                  onChange={(event) => this.setState({ weight: event.target.value })}
                />
              </Form.Field>
            </Form.Group>

            <br />
            <Form.Group widths="equal">
              <Form.TextArea
                rows="1"
                label="Home Address"
                placeholder="123 Main Street, Atlanta, GA"
                value={this.state.houseaddr}
                onChange={(event) => this.setState({ houseaddr: event.target.value })}
              />
            </Form.Group>

            <br />
            <h3 style={{ marginTop: "2px", marginBottom: "5px" }}>Medical History</h3>
            <Divider clearing />
            <Form.Group widths="equal">
              <Form.Field>
                <label>Blood Group</label>
                <Input placeholder="A-" value={this.state.bloodgroup} onChange={(event) => this.setState({ bloodgroup: event.target.value })} />
              </Form.Field>

              <Form.Field label="Allergies" control={Select} options={allergyOptions} onChange={this.handleAllergies} />
            </Form.Group>
            <br />
            <Form.Group widths="equal">
              <Form.TextArea
                rows="1"
                label="Current Medications"
                placeholder="Antidepressants"
                value={this.state.medication}
                onChange={(event) => this.setState({ medication: event.target.value })}
              />
            </Form.Group>

            <br />
            <h3 style={{ marginTop: "2px", marginBottom: "5px" }}>Emergency Contact</h3>
            <Divider clearing />
            <Form.Group widths="equal">
              <Form.Field>
                <label>Emergency Contact Name</label>
                <Input placeholder="Taylor Smith" value={this.state.emergencyName} onChange={(event) => this.setState({ emergencyName: event.target.value })} />
              </Form.Field>

              <Form.Field>
                <label>Emergency Contact Phone</label>
                <Input
                  placeholder="0124995002"
                  value={this.state.emergencyContact}
                  onChange={(event) => this.setState({ emergencyContact: event.target.value })}
                />
              </Form.Field>
            </Form.Group>
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

export default RegisterPatient;
