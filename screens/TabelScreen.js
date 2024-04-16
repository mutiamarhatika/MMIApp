import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';

export default class ExampleFour extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['No', 'MMI', 'Lokasi', 'Foto', 'Koordinat', 'Action'],
            tableData: [
                ['1', '2', '3', '4', '5', '6'],
                ['1', '2', '3', '4', '5', '6'],
                ['1', '2', '3', '4', '5', '6'],
            ]
        }
    }

    _alertIndex(index) {
        Alert.alert(`This is row ${index + 1}`);
    }

    render() {
        const state = this.state;
        const element = (data, index) => (
            <TouchableOpacity onPress={() => this._alertIndex(index)}>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>button</Text>
                </View>
            </TouchableOpacity>
        );

        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 30, textAlign: 'center', color: 'black', marginBottom: 10 }}>Tabel Hasil Input User</Text>
                <Table borderStyle={{ borderColor: 'black', borderWidth: 1 }}>
                    <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
                    {
                        state.tableData.map((rowData, index) => (
                            <TableWrapper key={index} style={styles.row}>
                                {
                                    rowData.map((cellData, cellIndex) => (
                                        <Cell key={cellIndex} data={cellIndex === 5 ? element(cellData, index) : cellData} textStyle={styles.text} />
                                    ))
                                }
                            </TableWrapper>
                        ))
                    }
                </Table>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f8981d' },
    text: { margin: 6, textAlign:'center' },
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
    btn: { width: 58, height: 18, backgroundColor: '#f8981d', borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' }
});