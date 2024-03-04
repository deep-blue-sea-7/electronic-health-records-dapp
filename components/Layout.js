import React from "react";
import { Container, Header, Icon, Segment } from "semantic-ui-react";
import Head from "next/head";
import MenuBar from "./MenuBar";

//Layout properly the Header at the top of every page and then the content come afterwards

export default (props) => {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"></link>
      </Head>

      <Segment inverted textAlign="center" style={{ minHeight: 200, background: "linear-gradient(to bottom, #1B6B93, #419197)" }}>
        <MenuBar />
        {/* <Icon size="huge" name="hospital" /> */}
        <Header as="h2" style={{ fontSize: "3em", fontWeight: "normal", color: "white" }} content="Blockchain Medical Records" />
        <Header as="h3" style={{ fontSize: "1.5em", fontWeight: "normal" }} content="Ensure that your records are safe and secure" />
      </Segment>

      <Container>{props.children}</Container>
    </>
  );
};
