import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import firebase from '@react-native-firebase/database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class ExampleFour extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['No', 'Nama', 'Tipe MMI', 'Lokasi', 'Latitude', 'Longitude', 'Action1'],
            tableData: []
        }
    }

    componentDidMount() {
        this.fetchMarkerData();
    }

    fetchMarkerData = () => {
        firebase()
            .ref('data')
            .once('value')
            .then(snapshot => {
                const data = snapshot.val();
                const tableData = Object.entries(data).map(([key, marker], index) => ([
                    key, // Gunakan key sebagai id
                    String(index + 1), // Nomor
                    marker.namaPengirim, // Nama Pengirim
                    marker.tipeMMI, // Tipe MMI
                    marker.location, // Lokasi
                    Number(marker.coordinate.latitude).toFixed(4),
                    Number(marker.coordinate.longitude).toFixed(4),
                    // Number(marker.coordinate.longitude).toFixed(4),
                ]));
                this.setState({ tableData });
            })
            .catch(error => {
                console.error('Error fetching marker data:', error);
            });
    };

    deleteMarker = (key) => {
        firebase()
            .ref('data/' + key) // Concatenate the key to form the complete path
            .remove()
            .then(() => {
                this.fetchMarkerData(); // Retrieve data again after deletion
                Alert.alert('Data deleted successfully!');
            })
            .catch(error => {
                console.error('Error deleting marker:', error);
                Alert.alert('Failed to delete data!');
            });
    };


    _alertIndex(index, key) {
        Alert.alert(
            'Delete Data',
            'Are you sure you want to delete this data?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => this.deleteMarker(key) },
            ],
            { cancelable: false }
        );
    }

    render() {
        const { tableHead, tableData } = this.state;
        const element = (data, index, key) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                <TouchableOpacity onPress={() => this._alertIndex(index, key)}>
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>Delete</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this._alertIndex(index)}>
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>button</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );

        return (
            <View>
                <View style={styles.navbar}>
                    <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={styles.buttonNav} activeOpacity={0.8}>
                        <MaterialCommunityIcons name='arrow-left-drop-circle' size={30} color='white' />
                    </TouchableOpacity>
                    <Text style={styles.textNav}>Tabel Input User</Text>
                </View>
                <ScrollView horizontal={false}>
                    <View style={styles.container}>
                        <Text style={{ fontSize: 30, textAlign: 'center', color: 'black', marginBottom: 10 }}>Tabel Hasil Input User</Text>
                        <Table borderStyle={{ borderColor: 'black', borderWidth: 1 }}>
                            <Row data={tableHead} style={styles.head} textStyle={styles.text} />
                            {
                                tableData.map((rowData, index) => (
                                    <TableWrapper key={index} style={styles.row}>
                                        {
                                            rowData.map((cellData, cellIndex) => (
                                                <Cell key={cellIndex} data={cellIndex === 6 ? element(cellData, index, rowData[0]) : cellData} textStyle={styles.text} />
                                            ))
                                        }
                                    </TableWrapper>
                                ))
                            }
                        </Table>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f8981d' },
    text: { margin: 6, textAlign: 'center', fontSize: 12 },
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
    btn: { width: 48, height: 18, backgroundColor: '#f8981d', borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' },
    navbar: {
        backgroundColor: '#f8981d',
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15
    },
    buttonNav: {
        marginRight: '22%',
        marginLeft: '5%'
    },
    textNav: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
});
