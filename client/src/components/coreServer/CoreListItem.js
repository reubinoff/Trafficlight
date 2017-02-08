import React from "react";

export default class CoreListItem extends React.Component {
    constructor(props) {
        super();
        this.state = {
            active: false
        }
        this.activeClass = this.state.active ? "active" : "";
        this._onClick = this._onClick.bind(this);

    }
    _onClick(e) {
        // const active = !this.state.active;
        // this.setState({ active });
    }
    render() {
        const { _id, ip , onClick_ } = this.props;
        const activeClass = (this.props.activeID===_id) ? "active" : "";
        return (
            <button id={_id} type="button" className={"list-group-item list-group-item-action btn-sm" + activeClass} onClick={onClick_} >{ip}</button>
        );
    }
}