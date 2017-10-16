import React, { Component } from 'react';
import PropTypes from 'prop-types';

// const mapStateToProps = (state) => {
//     return {
//         themeColor: state.themeColor,
//         themeName: state.themeName,
//         fullName: `${state.firstName} ${state.lastName}`
//     }
// }


const connect = (mapStateToProps) => (WrappedComponent) => {
    class Connect extends Component {
        static contextTypes = {
            store: PropTypes.object
        }
        constructor() {
            super();
            this.state = {
                allProps: {}
            }
        }
        componentWillMount() {
            const { store } = this.context;
            this._updateProps();
            store.subscribe(() => this._updateProps())
        }
        _updateProps() {
            const { store } = this.context;
            let stateProps = mapStateToProps(store.getState(), this.props);
            this.setState({
                allProps: {
                    ...stateProps,
                    ...this.props
                }
            })
        }
        // TODO: how to get data from `store`
        render() {
            return (
                <WrappedComponent {...this.state.allProps}/>
            )
        }
    }
    return Connect;
}

export default connect;