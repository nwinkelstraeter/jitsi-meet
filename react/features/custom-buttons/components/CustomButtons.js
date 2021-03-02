import Button from '@atlaskit/button';
import React from 'react';
import { connect } from '../../base/redux';

/**
 * The type of the React {@code Component} props of {@link CustomButtons}.
 */
type Props = {

    _buttons: Object;

    /**
     * Flag signaling if the buttons ar rendered on the conference screen
     */
    _on_conference: boolean;

    /**
     * Flag signaling if the buttons ar rendered on the prejoin screen
     */
    _on_prejoin: boolean;
}

/**
 * Implements customizable buttons with static links.
 *
 * @extends Component
 */
class CustomButtons extends React.Component {

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {

        const containerClassName = `custom-button-container
            ${this.props._on_conference ? 'custom-button-on-conference' : ''}
            ${this.props._on_prejoin ? 'custom-button-on-prejoin' : ''}`
        let buttons = [];

        for (var button of this.props._buttons) {
            buttons.push(
                <Button
                    key = {'custom-button' + button.text}
                    className = 'custom-button'
                    onClick = { () => window.open(button.url) }>
                    {button.text}
                </Button>
            );
        }
        return (
            <div className = { containerClassName } >
                { buttons }
            </div>
        );
    }
}

/**
 * Maps (parts of) the redux state to the React {@code Component} props.
 *
 * @param {Object} state - The redux state.
 * @param {Object} ownProps - The props passed to the component.
 * @returns {Object}
 */

function _mapStateToProps(state, ownProps) {

    const { customButtons } = state['features/base/config'];
    const { on_conference, on_prejoin } = ownProps;

    return {
        _buttons: customButtons || [],
        _on_conference: Boolean(on_conference),
        _on_prejoin: Boolean(on_prejoin)
    }
}
export default connect(_mapStateToProps)(CustomButtons);
