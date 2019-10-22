import React, { Component } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import { LinearGradient, Stop, Defs, Text, Circle, Ellipse, G, ClipPath, Image } from 'react-native-svg';
import { BarChart, Grid } from 'react-native-svg-charts';

const { width } = Dimensions.get('window');

class MoneyGraph extends Component {
    render() {
        const data = this.props.userTransactions.map(info => info.amount);

        const Circles = ({ x, y, bandwidth, data }) => (
            data.map((value, index) => (
                <Circle
                key={index}
                x={x(index) + (bandwidth / 2)}
                y={y(value)}
                r={5}
                fill={'rgb(0, 79, 133)'}>
                </Circle>
            ))
        );

        const Labels = ({ x, y, bandwidth, data }) => (
            data.map((value, index) => (
                <Text
                key={ index }
                x={ x(index) + (bandwidth / 2) }
                y={ y(value) - 15 }
                fontSize={ 14 }
                fill={'rgb(0, 166, 170)'}
                alignmentBaseline={ 'middle' }
                textAnchor={ 'middle' }>
                    {`R$ ${parseFloat(value).toFixed(2)}`}
                </Text>
            ))
        );

        const Gradient = () => (
            <Defs key={'gradient'}>
                <LinearGradient id={'gradient'} x1={'0%'} y={'0%'} x2={'0%'} y2={'100%'}>
                    <Stop offset={'0%'} stopColor={'rgb(0, 79, 133)'}/>
                    <Stop offset={'100%'} stopColor={'rgb(0, 166, 170)'}/>
                </LinearGradient>
            </Defs>
        );

        const Images = ({ x, y, bandwidth, data }) => (
            data.map((value, index) => {
                const info = this.props.userTransactions[index];
                let initials = info.name.match(/([A-Z])/g);
                initials = `${initials[0]}${initials[initials.length-1]}`;

                return (
                    <G
                    x={x(index) - 25}
                    y={y(0)} 
                    key={index}>
                        <Ellipse
                        cx="25"
                        cy="25"
                        rx="25"
                        ry="25"
                        stroke="rgb(0, 166, 170)"
                        strokeWidth="3"
                        fill="rgba(0, 0, 0, 0)" />
                        <Text
                        y={32}
                        x={25}
                        textAnchor={'middle'}
                        fontSize={ 20 }
                        fontWeight={'600'}
                        fill={'rgb(0, 166, 170)'}>
                            {initials}
                        </Text>
                        <ClipPath id="clip">
                            <G>
                                <Ellipse
                                cx="25"
                                cy="25"
                                rx="23"
                                ry="23"
                                stroke="rgb(0, 166, 170)"
                                strokeWidth="5"
                                fill="rgba(0, 0, 0, 0)" />
                            </G>
                        </ClipPath>
                        {info && info.image &&
                        <Image
                        x="0"
                        y="0"
                        width="50"
                        height="50"
                        clipPath="url(#clip)"
                        href={{ uri: info.image }}
                        />}
                    </G>
                );
            })
        );

        let chartWidth = width;
        let spacingInner = 0.99;
        
        const bars = data.length;
        const spaceBars = bars - 1;

        if (spaceBars > 0) {
            let barSize = chartWidth / spaceBars;
            while (barSize < 103) {
                chartWidth += chartWidth;
                barSize = chartWidth / spaceBars;
            }
    
            const spaceWithBar = barSize - 5;
            spacingInner = spaceWithBar / barSize;
        }

        return (
            <ScrollView horizontal>
                <View style={{ flex: 1, minHeight: width / 2 }}>
                    <BarChart
                    style={{ flex: 1, width: chartWidth, minHeight: width / 2 }}
                    data={ data }
                    spacingOuter={0.5}
                    gridMin={0}
                    spacingInner={spacingInner}
                    contentInset={{ top: 30, bottom: 70 }}
                    svg={{
                        strokeWidth: 1,
                        fill: 'url(#gradient)',
                    }}>
                        <Grid />
                        <Gradient/>
                        <Circles />
                        <Labels />
                        <Images/>
                    </BarChart>
                </View>
            </ScrollView>
        )
    }

}

export default MoneyGraph;