import React from 'react';
import Layout from "components/layout";
import styled from "styled-components";

const ContactWrapper = styled.section`
  margin: 80px 20px 120px 20px;
  padding: 0 20px;
`;

const ContactSuccessPage = props => {

  return (
    <Layout>
      <ContactWrapper>
        <h2>Kiitoksia yhteydenotostasi!</h2>
        <p>Palaamme asiaan pikaisesti kun viestisi on käsitelty...</p>
      </ContactWrapper>

      <ContactWrapper>
        <h2>Thank you for contacting us!</h2>
        <p>We will get back to you as soon as your message has been processed.</p>
      </ContactWrapper>
    </Layout>
  )
}

export default ContactSuccessPage;
