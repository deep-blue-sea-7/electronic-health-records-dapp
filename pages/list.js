import React, { Component } from "react";
import { Card, Input, Form } from "semantic-ui-react";
import { Link } from "../routes";
import Layout from "../components/Layout";
import record from "../ethereum/record";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

class RecordsList extends Component {
  state = {
    search: "",
  };

  static async getInitialProps() {
    const allRecords = await record.methods.getPatients().call();

    return { allRecords };
  }

  renderRecords() {
    const items = this.props.allRecords.map((address) => {
      return {
        header: <div style={{ fontSize: "1.3em", marginBottom: "0.5em" }}> {address}</div>,
        description: (
          <Link route={`/record/${address}`}>
            <a style={{ fontSize: "1.2em" }}>View EMR</a>
          </Link>
        ),
        fluid: true,
      };
    });
    //Add all records to card group
    return <Card.Group items={items} />;
  }

  onSearch = async (event) => {
    event.preventDefault(); //prevent browser from submitting form to back end server

    Router.pushRoute(`/record/${this.state.search}`);
  };

  render() {
    return (
      <Layout>
        <div style={{ padding: "1em 0em" }}>
          <Form onSubmit={this.onSearch} size="large">
            <Form.Field>
              <Input
                fluid
                action={{ color: "teal", icon: "search" }}
                placeholder="Search for Patients by Address..."
                onChange={(event) => this.setState({ search: event.target.value })}
                size="huge"
              />
              <br />
            </Form.Field>
          </Form>
          <h2>Medical Records List</h2>
          {this.renderRecords()}
        </div>
      </Layout>
    );
  }
}

export default RecordsList;
