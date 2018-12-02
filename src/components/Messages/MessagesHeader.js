import React, { Component } from 'react';
import { Header, Segment, Input, Icon } from "semantic-ui-react";

class MessagesHeader extends Component {
  render() {
    const { channelName, numUniqueUsers, handleSearchChange, searchLoading } = this.props;

    return (
      <Segment clearing>
      {/* Channel title */}
        <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
          <span>
            {channelName}
            <Icon name={"star outline"} color="blue" />
          </span>
          <Header.Subheader>{numUniqueUsers}</Header.Subheader>
        </Header>

        {/* Channel search input */}
        <Header floated="right">
          <Input size="mini" icon="search" name="searchTerm" placeholder="Search Messages"
            onChange={handleSearchChange} loading={searchLoading} />
        </Header>
      </Segment>
    );
  }
}

export default MessagesHeader;