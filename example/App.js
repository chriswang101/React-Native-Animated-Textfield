import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    LayoutAnimation,
} from 'react-native';
import TextField from '../module/TextField'

type Props = {};
export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            shouldShowSecondaryColor: false,
        }
    }

    render() {
        return (
            <View>
                <TextField
                    label={'Label'}
                    placeholder={'Tap Here First'}
                    accentColor={'deepskyblue'}
                    secondaryAccentColor={'magenta'}
                    shouldShowSecondaryColor={this.state.shouldShowSecondaryColor}
                    fontFamily={'Helvetica Neue'}
                    floatingTextFontWeight={'500'}
                    fontSize={24}
                    animationDuration={250}
                    selectionColor={'mediumslateblue'}
                    underlineWeight={2}
                    onTextFieldFocus={() => console.log('onFocus')}
                    onTextFieldBlur={() => console.log('onBlur')}
                    onChangeTextFieldText={(text) => console.log(text)}
                    viewStyle={{
                        marginTop: 60,
                        marginHorizontal: 10,
                    }}
                />

                <TouchableOpacity
                    onPress={() => {
                        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                        this.setState({
                            shouldShowSecondaryColor: !this.state.shouldShowSecondaryColor,
                        });

                    }}
                    style={{
                        borderRadius: 5,
                        backgroundColor: 'mediumslateblue',
                        marginVertical: 20,
                        marginHorizontal: 10,
                    }}
                >
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 32,
                            fontWeight: '600',
                            paddingVertical: 10,
                            alignSelf: 'center',
                        }}

                    >
                        Then Press Here
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
