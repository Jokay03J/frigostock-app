import { atom } from 'recoil';

const productAtom = atom({
  key: 'product',
  default: {
    name: "",
    amount: 1,
    place: ""
  }
})

export default productAtom;