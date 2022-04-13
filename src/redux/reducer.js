import {combineReducers} from 'redux';

const initialStatePos = {
  form: {
    pembeli: null,
    judul: null,
    jumlah: null,
    harga: null,
    bayar: null,
  },
};

const PosReducer = (state = initialStatePos, action) => {
  if (action.type === 'SET_FORM') {
    return {
      ...state,
      form: {
        ...state.form,
        [action.inputType]: action.inputValue,
      },
    };
  }
  return state;
};

const reducer = combineReducers({
  PosReducer,
});

export default reducer;
