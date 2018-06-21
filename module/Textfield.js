'use strict';
import React, { Component } from "react";

import {
    View,
    TextInput,
    Platform,
    Animated,
} from 'react-native';

import PropTypes from "prop-types";

import FloatingLabel from './FloatingLabel'
import Underline from './Underline'

export default class TextField extends Component {

    constructor(props) {
        super(props);

        this.state = {
            text: props.value ? props.value : "",
            isFocused: false,
        };

        this.interpolatedColorValue = new Animated.Value(0);

        this.floatingLabelRef = React.createRef();
        this.underlineRef = React.createRef();
        this.inputRef = React.createRef();
    }

    focus() {
        this.inputRef.current.focus();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.text !== nextProps.text){
            this.setState({text: nextProps.text});
        }

        if (this.props.shouldShowSecondaryColor !== nextProps.shouldShowSecondaryColor) {
            if (this.props.shouldShowSecondaryColor) {
                Animated.timing(
                    this.interpolatedColorValue,
                    {
                        toValue: 0,
                        duration: this.props.animationDuration,
                    }
                ).start();
            } else {
                Animated.timing(
                    this.interpolatedColorValue,
                    {
                        toValue: 1,
                        duration: this.props.animationDuration,
                    }
                ).start();
            }
        }
    }

    render() {
        let {
            label,
            accentColor,
            secondaryAccentColor,
            labelColor,
            floatingTextFontWeight,
            fontSize,
            fontFamily,
            animationDuration,
            inputTextColor,
            onTextFieldFocus,
            onTextFieldBlur,
            onChangeTextFieldText,
            underlineWeight,
            underlineBackgroundColor,
            viewStyle,
        } = this.props;

        const backgroundColor = this.interpolatedColorValue.interpolate({
            inputRange: [0, 1],
            outputRange: [accentColor, secondaryAccentColor]
        });

        return (
            <View style={[
                {height: fontSize * 2.9},
                viewStyle,
            ]}>
                <FloatingLabel
                    label={label}
                    accentColor={backgroundColor}
                    labelColor={labelColor}
                    fontFamily={fontFamily}
                    floatingTextFontWeight={floatingTextFontWeight}
                    hasValue={this.props.placeholder ? true : this.state.text.length}
                    focusHandler={this.focus.bind(this)}
                    fontSize={fontSize}
                    isFocused={this.state.isFocused}
                    animationDuration={animationDuration}
                    ref={this.floatingLabelRef}
                />

                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <TextInput
                        value={this.state.text}
                        alignSelf={'auto'}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        ref={this.inputRef}

                        style={{
                            color: inputTextColor,
                            paddingHorizontal: 0,
                            paddingTop: 0,
                            paddingBottom: fontSize / 4,
                            fontFamily: fontFamily,
                            flex: 1,
                        }}

                        onFocus={ () => {
                            this.underlineRef.current.expandLine();
                            if (this.state.text.length === 0) {
                                this.floatingLabelRef.current.floatLabel();
                            }
                            this.setState({isFocused: true});
                            onTextFieldFocus && onTextFieldFocus();
                        }}

                        onBlur={ () => {
                            this.underlineRef.current.shrinkLine();
                            this.setState({
                                isFocused: false,
                            });
                            if (this.state.text.length === 0) {
                                this.floatingLabelRef.current.sinkLabel();
                            }
                            onTextFieldBlur && onTextFieldBlur();
                        }}

                        onChangeText={ (text) => {
                            console.log("OnChangeText: ", text);
                            this.setState({text: text});
                            onChangeTextFieldText && onChangeTextFieldText(text);
                        }}

                        {...this.props}
                    />
                </View>

                <Underline
                    accentColor={backgroundColor}
                    underlineWeight={underlineWeight}
                    animationDuration={animationDuration}
                    backgroundColor={underlineBackgroundColor}
                    ref={this.underlineRef}
                />
            </View>
        )
    }
}

TextField.propTypes = {
    /** Label that describes what the text field is for. Floats up to the top when text field is active. */
    label: PropTypes.string.isRequired,
    /** The primary color of the floating label and underline when the text field is active. Shows when
     *  shouldShowSecondaryColor is false. */
    accentColor: PropTypes.string,
    /** The secondary color of the floating label and underline when the text field is active. Shows when
     *  shouldShowSecondaryColor is true. */
    secondaryAccentColor: PropTypes.string,
    /** Whether the secondary accent color should be shown. If false, the accent color is shown. */
    shouldShowSecondaryColor: PropTypes.bool,
    /** The default color of the floating label. Applies when the text field is not being edited. */
    labelColor: PropTypes.string,
    /** Font of the floating label and input text. */
    fontFamily: PropTypes.string,
    /** Floating text font weight. */
    floatingTextFontWeight: PropTypes.string,
    /** Input text font size. Floating text font size auto calculated from this value. */
    fontSize: PropTypes.number,
    /** How long (in ms) the animation takes when the text field becomes active and inactive. */
    animationDuration: PropTypes.number,
    /** The background/default color of the underline, shown when the text field is out of focus. */
    underlineBackgroundColor: PropTypes.string,

    keyboardType: Platform.select({
        ios: PropTypes.oneOf(['default', 'numeric', 'email-address', 'phone-pad', 'ascii-capable', 'numbers-and-punctuation', 'url', 'number-pad', 'name-phone-pad', 'decimal-pad', 'twitter', 'web-search']),
        android: PropTypes.oneOf(['default', 'numeric', 'email-address', 'phone-pad', 'visible-password']),
    }),
    autoCapitalize: PropTypes.oneOf(['none', 'sentences', 'words', 'characters']),
    inputTextColor: PropTypes.string,
    underlineWeight: PropTypes.number,

    // All of the TextInput props are also available for use
};

TextField.defaultProps = {
    accentColor: 'dodgerblue',
    secondaryAccentColor: 'dodgerblue',
    labelColor: 'lightslategray',
    underlineBackgroundColor: '#EDEDED',
    fontFamily: 'Helvetica Neue',
    floatingTextFontWeight: '500',
    fontSize: 32,
    animationDuration: 250,
    underlineWeight: 2,
    value: "",

};
