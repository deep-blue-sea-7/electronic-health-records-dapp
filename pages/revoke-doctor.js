import React, { Component } from "react";
import { Segment, Input, Header, Message, Button, Form } from "semantic-ui-react";
import toast, { Toaster } from "react-hot-toast";
import Layout from "../components/Layout";
import record from "../ethereum/record";
import web3 from "../ethereum/web3";

class RevokeDoctor extends Component {
  state = {
    doctorAddr: "",
    loading: "",
    errorMessage: "",
  };

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();

      await record.methods.RevokePermission(this.state.doctorAddr).send({ from: accounts[0] });

      toast.success("Permission Revoked Successfully!");
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false, doctorAddr: "" });
  };

  render() {
    return (
      <Layout>
        <Segment padded raised color="teal">
          <Header as="h2" style={{ color: "#088395" }} content="Revoke Access" subheader="Revoke permission for doctor or patient to view records"></Header>
          <Input
            fluid
            placeholder="Doctor's Ethereum Address"
            value={this.state.doctorAddr}
            onChange={(event) => this.setState({ doctorAddr: event.target.value })}
          />
          <br />
          <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Message error header="Oops!" content={this.state.errorMessage} />
            <Button primary loading={this.state.loading} size="large" align="right" style={{ backgroundColor: "#088395" }}>
              Revoke
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

export default RevokeDoctor;
