import React from 'react';
import { StyleSheet, View, TouchableHighlight, Text } from 'react-native';

export default class Grid extends React.Component {
    state = {
        colors: [
            'black',
            'blue',
            'cyan',
            'green',
            'magenta',
            'red',
            'yellow'
        ],
        gridData: {}
    }

    nextColor = (rowIndex: any, colIndex: any) => {
        const { gridData, colors } = this.state;
        const colorIndex = gridData[rowIndex][colIndex];
        const nextColorIndex = colorIndex == (colors.length - 1) ? 0 : colorIndex + 1;
        const copyGridData = { ...gridData };
        copyGridData[rowIndex][colIndex] = nextColorIndex;
        this.setState({ gridData: copyGridData })
    }

    populateGridData = (colors: Array<string>) => {
        const rowObj = colors.reduce((rows, color: any, rowIndex: string | number) => {
            rows[rowIndex] = colors.reduce((cols, currColor: any, colorIndex: any) => {
                const colId = `${rowIndex}${colorIndex}`;
                cols[colId] = colorIndex;
                return cols;
            }, {});
            return rows;
        }, {});
        return rowObj;
    }

    componentDidMount() {
        const { colors } = this.state;
        this.setState({ gridData: this.populateGridData(colors) });
    }
    
    makeRow = (rowKey: string, rowIndex: number) => {
        const { gridData } = this.state;
        const rowObject = gridData[rowKey];
        return this.renderBoxList({ rowObject, rowKey, rowIndex });
    }

    renderBoxList = ({ rowObject, rowIndex, rowKey }) => {
        return (<View testID={`row-${rowIndex}`} key={rowIndex} style={{ flexDirection: 'row' }}>
            {Object.keys(rowObject).sort().map(this.makeBox({ rowKey, rowObject }))}
        </View>)
    }

    makeBox = ({ rowKey, rowObject }) => (colKey: string) => {
        const { colors } = this.state;
        const cellColor = colors[rowObject[colKey]];
        return (
            <TouchableHighlight
                key={colKey}
                testID={`box-${colKey}`}
                onPress={() => this.nextColor(rowKey, colKey)}
                style={{ ...styles.cell, backgroundColor: cellColor }}>
                <Text testID={`box-text-${colKey}`} accessibilityLabel={cellColor} style={{ color: cellColor }}> {colKey} </Text>
            </TouchableHighlight>
        )
    }

    render() {
        const { gridData } = this.state;
        return (
            <View testID="GridComponent" style={styles.container}>
                {/* Render the row List */}
                {Object.keys(gridData).sort().map(this.makeRow)}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#982f65',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cell: { height: 50, width: 50, borderColor: '#CC532B', borderWidth: 2 }
});
