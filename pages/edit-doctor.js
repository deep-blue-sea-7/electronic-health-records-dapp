import React, { Component } from "react";
import { Divider, Form, Input, Button, Segment, Message, Select } from "semantic-ui-react";
import toast, { Toaster } from "react-hot-toast";
import Layout from "../components/Layout";
import record from "../ethereum/record";
import web3 from "../ethereum/web3";

const genderOptions = [
  { key: "m", text: "Male", value: "Male" },
  { key: "f", text: "Female", value: "Female" },
  { key: "o", text: "Other", value: "Other" },
];

const qualificationOptions = [
  { key: "h", text: "Higher Certificate/SPM", value: "Higher Certificate/SPM" },
  { key: "d", text: "Diploma", value: "Diploma" },
  { key: "b", text: "Bachelor's Degree", value: "Bachelor's Degree" },
  { key: "m", text: "Master's Degree", value: "Master's Degree" },
  { key: "dd", text: "Doctoral Degree", value: "Doctoral Degree" },
];

class EditDoctor extends Component {
  state = {
    ic: "",
    name: "",
    phone: "",
    gender: "",
    dob: "",
    qualification: "",
    major: "",
    loading: false,
    errorMessage: "",
  };

  handleGender = (e, { value }) => this.setState({ gender: value });

  handleQualification = (e, { value }) => this.setState({ qualification: value });

  onSubmit = async (event) => {
    event.preventDefault();

    const { ic, name, phone, gender, dob, qualification, major } = this.state;

    this.setState({ loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();

      await record.methods.editDoctor(ic, name, phone, gender, dob, qualification, major).send({ from: accounts[0] });

      toast.success("Doctor account created successfully!");
    } catch (err) {
      this.setState({ errorMessage: err.message });
      toast.error("This Doctor account already exists");
    }

    this.setState({ loading: false, ic: "", name: "", phone: "", gender: "", dob: "", qualification: "", major: "" });
  };

  render() {
    return (
      <Layout>
        <Segment padded raised color="teal">
          <h2 style={{ color: "#088395" }}>Edit Doctor Profile</h2>
        </Segment>
        <Segment raised color="teal" style={{ color: "#088395" }}>
          <h3 style={{ marginTop: "2px", marginBottom: "5px" }}>General Information</h3>
          <Divider clearing />
          <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} size="large" key="large">
            <Form.Group widths="equal">
              <Form.Field>
                <label>NPI</label>
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
              <Form.Field label="Gender" control={Select} options={genderOptions} onChange={this.handleGender} />

              <Form.Field>
                <label>Date of Birth</label>
                <Input placeholder="01/01/1997" value={this.state.dob} onChange={(event) => this.setState({ dob: event.target.value })} />
              </Form.Field>
            </Form.Group>
            <br />
            <h3 style={{ marginTop: "2px", marginBottom: "5px" }}>Education Information</h3>
            <Divider clearing />
            <Form.Group widths="equal">
              <Form.Field label="Highest Qualification" control={Select} options={qualificationOptions} onChange={this.handleQualification} />

              <Form.Field>
                <label>Major</label>
                <Input placeholder="Biology" value={this.state.major} onChange={(event) => this.setState({ major: event.target.value })} />
              </Form.Field>
            </Form.Group>
            <Message error header="Oops!" content={this.state.errorMessage} />
            <Button primary loading={this.state.loading} size="large" align="right" style={{ backgroundColor: "#088395" }}>
              Create
            </Button>
          </Form>
        </Segment>
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

export default EditDoctor;
