import React from "react";

export default class Core extends React.Component {
  constructor(props) {
    super();

  }

  render() {
    const { _id, ip, port, hasPing, hasConnection, description } = this.props;

    const hasPingIcon = (hasPing) ? "\u2714" : "\u2716"
    const hasConnectionIcon = (hasConnection) ? "\u2714" : "\u2716"

    return(
      <tr>
        <th width="100" scope="row">{ip}</th>
        <td width="100">{port}</td>
        <td width="100">{hasPingIcon}</td>
        <td width="100">{hasConnectionIcon}</td>
        <td width="200">{description}</td>
      </tr>
    );
    }
  }