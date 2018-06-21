'use-strict'

import React, { Component } from "react";

import {
    View,
    Animated,
} from 'react-native'

export default class Underline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lineLength: new Animated.Value(0),
        };
        this.wrapperWidth = 0;
    }

    componentDidMount() {
        requestAnimationFrame( () => {
            if (this.refs.wrapper == null) { return; }
            const container = this.refs.wrapper;
            container.measure((_, __, width, ___) => {
                this.wrapperWidth = width;
            });
        });
    }

    expandLine() {
        Animated.timing(this.state.lineLength, {
            toValue: this.wrapperWidth,
            duration: this.props.animationDuration
        }).start();
    }
    shrinkLine() {
        Animated.timing(this.state.lineLength, {
            toValue: 0,
            duration: this.props.animationDuration
        }).start();
    }

    render() {
        const {
            backgroundColor,
            accentColor,
        } = this.props;
        return(
            <View
                style={{
                    height: this.props.underlineWeight,
                    alignItems: 'center',
                    backgroundColor: backgroundColor,
                }}
            ref={'wrapper'}
            >
                <Animated.View style={
                    {
                        width: this.state.lineLength,
                        height: this.props.underlineWeight,
                        backgroundColor: accentColor,
                    }
                }/>
            </View>
        )
    }
}
