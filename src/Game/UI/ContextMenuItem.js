// @flow
import React from 'react';

type Props = {
    text:string,
    fn:Function
}
export default class ContextMenuItem extends React.Component{
    props:Props;
    render() {
        return <div className=".contextMenuItem" onClick={this.props.fn}>{this.props.text}</div>
    }
}