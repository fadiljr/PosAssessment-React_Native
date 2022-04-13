import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Button,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setForm} from './redux';

const PosComponent = () => {
  const PosReducer = useSelector(state => state.PosReducer);
  const dispatch = useDispatch();
  const [totaltemp, setTotalTemp] = useState(null);
  const [total, setTotal] = useState(null);
  const [kembali, setKembali] = useState(null);
  const [bonus, setBonus] = useState(null);
  const [kurang, setKurang] = useState(null);
  const [keterangan, setKeterangan] = useState(null);

  useEffect(() => {
    console.log('PosReducer: ', PosReducer);
    setTotalTemp(PosReducer.form.harga * PosReducer.form.jumlah);
    setKurang(totaltemp - PosReducer.form.bayar);
  });
  const sendData = () => {
    console.log('data yang dikirim: ', PosReducer.form);
    setTotal(totaltemp);
    if (totaltemp > PosReducer.form.bayar) {
      setKembali('Tidak ada kembali');
    } else if (totaltemp < PosReducer.form.bayar) {
      setKembali(PosReducer.form.bayar - totaltemp);
    }
    if (totaltemp > 500000) {
      setBonus('Keyboard');
    } else if (totaltemp >= 300000 && totaltemp <= 500000) {
      setBonus('Mouse');
    } else if (totaltemp >= 200000 && totaltemp <= 300000) {
      setBonus('Flashdisk');
    } else {
      setBonus('Tidak dapat bonus');
    }
    if (totaltemp > PosReducer.form.bayar) {
      setKeterangan('Kurang bayar Rp. ' + kurang);
    } else if (totaltemp < PosReducer.form.bayar) {
      setKeterangan('Tunggu kembalian');
    }
    console.log('data masuk', totaltemp, kembali, bonus, keterangan);
  };
  const onInputChange = (value, inputType) => {
    dispatch(setForm(inputType, value));
  };
  const reset = () => {
    onInputChange(null, 'pembeli');
    onInputChange(null, 'judul');
    onInputChange(null, 'jumlah');
    onInputChange(null, 'harga');
    onInputChange(null, 'bayar');
    setTotal(null);
    setTotalTemp(null);
    setKembali(null);
    setKurang(null);
    setBonus(null);
    setKeterangan(null);
  };
  return (
    <>
      <SafeAreaView>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.labelinput}>Nama Pembeli :</Text>
          <TextInput
            style={styles.input}
            onChangeText={value => onInputChange(value, 'pembeli')}
            value={PosReducer.form.pembeli}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.labelinput}>Judul Ebook :</Text>
          <TextInput
            style={styles.input}
            onChangeText={value => onInputChange(value, 'judul')}
            value={PosReducer.form.judul}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.labelinput}>Jumlah Beli :</Text>
          <TextInput
            style={styles.input}
            onChangeText={value => onInputChange(value, 'jumlah')}
            keyboardType="numeric"
            value={PosReducer.form.jumlah}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.labelinput}>Harga : Rp</Text>
          <TextInput
            style={styles.input}
            onChangeText={value => onInputChange(value, 'harga')}
            keyboardType="numeric"
            value={PosReducer.form.harga}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.label}>Uang Bayar : Rp</Text>
          <TextInput
            style={styles.input}
            onChangeText={value => onInputChange(value, 'bayar')}
            keyboardType="numeric"
            value={PosReducer.form.bayar}
          />
        </View>
        <Button
          title="Proses"
          color="#00f"
          onPress={() => {
            sendData();
          }}
        />
      </SafeAreaView>

      <SafeAreaView>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.label}>Total Belanja :</Text>
          <Text style={styles.label}>{total}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.label}>Uang Kembali :</Text>
          <Text style={styles.label}>{kembali}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.label}>Bonus :</Text>
          <Text style={styles.label}>{bonus}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.label}>Keterangan :</Text>
          <Text style={styles.label}>{keterangan}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button title="Reset Data" color="#00f" onPress={reset} />
          <Button
            title="Keluar"
            color="#f00"
            onPress={() => {
              console.log('clicked');
              reset();
              return BackHandler.exitApp();
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    padding: 10,
    width: 210,
  },
  labelinput: {
    marginTop: 25,
    fontSize: 15,
  },
  label: {
    marginTop: 15,
    marginBottom: 10,
    fontSize: 15,
  },
  hasil: {
    height: 40,
    margin: 12,
    padding: 10,
  },
});

export default PosComponent;
