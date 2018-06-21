'use strict';
import React, { Component } from "react";
import {
    Animated,
} from "react-native";

export default class FloatingLabel extends Component {
    constructor(props) {
        super(props);
        this.posTop = 0;
        // Need to include an offset for letters such as 'g' which extend below the bottom
        const fontPaddingOffset = this.props.fontSize * 0.4;
        this.posBottom = this.props.fontSize + fontPaddingOffset;
        this.fontLarge = this.props.fontSize;
        this.fontSmall = this.props.fontSize * 0.6;
        let posTop = (props.hasValue) ? this.posTop : this.posBottom;
        let fontSize = (props.hasValue) ? this.fontSmall : this.fontLarge;

        this.state = {
            top: new Animated.Value(posTop),
            fontSize: new Animated.Value(fontSize),
        }
    }

    shouldComponentUpdate(nextProps: Object, nextState: Object) : bool {
        return this.props.hasValue === nextProps.hasValue;
    }

    floatLabel() {
        Animated.parallel([
            Animated.timing(this.state.top, {
                toValue: this.posTop,
                duration: this.props.animationDuration,
            }),
            Animated.timing(this.state.fontSize, {
                toValue: this.fontSmall,
                duration: this.props.animationDuration,
            })
        ]).start();
    }

    sinkLabel() {
        Animated.parallel([
            Animated.timing(this.state.top, {
                toValue: this.posBottom,
                duration: this.props.animationDuration,
            }),
            Animated.timing(this.state.fontSize, {
                toValue: this.fontLarge,
                duration: this.props.animationDuration,
            })
        ]).start();
    }

    render() {
        const {
                  label,
                  accentColor,
                  labelColor,
                  fontFamily,
                  floatingTextFontWeight,
                  focusHandler,
                  fontSize,
                  isFocused,
        } = this.props;

        return(
            <Animated.Text
                style={[
                    {
                        fontSize: this.state.fontSize,
                        fontFamily: fontFamily,
                        fontWeight: floatingTextFontWeight,
                        top: this.state.top,
                        color: labelColor,
                        lineHeight: fontSize * 1.1,
                    },
                    isFocused && {
                        color: accentColor,
                    },
                ]}
                onPress={focusHandler}
            >
                {label}
            </Animated.Text>

        );
    }
}
