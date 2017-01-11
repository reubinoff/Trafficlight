import React from "react";

export default class Core extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    const { _id, ip, port } = this.props;

    const icon = (_id === 33) ? "\u2714" : "\u2716"

    return (
      <tr>
        <th scope="row">{_id}</th>
        <td>{ip}</td>
        <td>{port}</td>
        <td>{icon}</td>
      </tr>
    );
  }
}