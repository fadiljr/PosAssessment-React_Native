import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
} from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pembeli: null,
      judul: null,
      jumlah: null,
      harga: null,
      bayar: null,
      total: null,
      kembalian: null,
      bonus: null,
      keterangan: null,
    };
  }
  updateValue(text, field) {
    if (field === 'pembeli') {
      this.setState({
        pembeli: text,
      });
    } else if (field === 'judul') {
      this.setState({
        judul: text,
      });
    } else if (field === 'jumlah') {
      this.setState({
        jumlah: text,
      });
    } else if (field === 'harga') {
      this.setState({
        harga: text,
      });
    } else if (field === 'bayar') {
      this.setState({
        bayar: text,
      });
    } else if (field === 'total') {
      this.setState({
        total: text,
      });
    } else if (field === 'kembalian') {
      this.setState({
        kembalian: text,
      });
    } else if (field === 'bonus') {
      this.setState({
        bonus: text,
      });
    } else if (field === 'keterangan') {
      this.setState({
        keterangan: text,
      });
    }
  }

  setKembali(total, bayar) {
    let kembali = bayar - total;
    let kurang = total - bayar;
    if (total < bayar) {
      this.updateValue(kembali, 'kembalian');
    } else if (total > bayar) {
      this.updateValue(kurang, 'kembalian');
    }
  }
  setBonus(total) {
    if (total > 500000) {
      this.updateValue('Keyboard', 'bonus');
    } else if (total >= 300000 && total <= 500000) {
      this.updateValue('Mouse', 'bonus');
    } else if (total >= 200000 && total <= 300000) {
      this.updateValue('Flashdisk', 'bonus');
    } else {
      this.updateValue('Tidak dapat bonus', 'bonus');
    }
  }
  setKeterangan(total, bayar, kembali) {
    if (total < bayar) {
      this.updateValue('Tunggu Kembalian', 'keterangan');
    } else if (total > bayar) {
      this.updateValue(`Kurang bayar Rp. ${kembali}`, 'keterangan');
    }
  }
  proses() {
    this.setKembali(this.state.total, this.state.bayar);
    this.setBonus(this.state.total);
    this.setKeterangan(
      this.state.total,
      this.state.bayar,
      this.state.kembalian,
    );
  }
  reset() {
    this.updateValue(null, 'pembeli');
    this.updateValue(null, 'judul');
    this.updateValue(null, 'jumlah');
    this.updateValue(null, 'harga');
    this.updateValue(null, 'bayar');
    this.updateValue(null, 'total');
    this.updateValue(null, 'kembalian');
    this.updateValue(null, 'bonus');
    this.updateValue(null, 'keterangan');
  }
  render() {
    return (
      <>
        <SafeAreaView>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.label}>Nama Pembeli :</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => this.updateValue(text, 'pembeli')}
              value={this.state.pembeli}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.label}>Judul Ebook :</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => this.updateValue(text, 'judul')}
              value={this.state.judul}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.label}>Jumlah Beli :</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => this.updateValue(text, 'jumlah')}
              keyboardType="numeric"
              value={this.state.jumlah}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.label}>Harga : Rp</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => this.updateValue(text, 'harga')}
              keyboardType="numeric"
              value={this.state.harga}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.label}>Uang Bayar : Rp</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => this.updateValue(text, 'bayar')}
              keyboardType="numeric"
              value={this.state.bayar}
            />
          </View>
          <Button title="Proses" color="#00f" onPress={() => this.proses()} />
        </SafeAreaView>

        <SafeAreaView>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.label}>Total Belanja :</Text>
            <Text style={styles.label}>{this.state.total}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.label}>Uang Kembali :</Text>
            {this.state.total < this.state.bayar ? (
              <Text style={styles.label}>{this.state.kembalian}</Text>
            ) : null}
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.label}>Bonus :</Text>
            <Text style={styles.label}>{this.state.bonus}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.label}>Keterangan :</Text>
            <Text style={styles.label}>{this.state.keterangan}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button
              title="Reset Data"
              color="#00f"
              onPress={() => this.reset()}
            />
            <Button
              title="Right button"
              color="#f00"
              onPress={() => alert('Right button pressed')}
            />
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    padding: 10,
    width: 210,
  },
  label: {
    marginTop: 25,
    fontSize: 15,
  },
  hasil: {
    height: 40,
    margin: 12,
    padding: 10,
  },
});

export default App;
