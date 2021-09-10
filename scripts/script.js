function bill() {
  return {
    x_signature_key: '',

    bill: {
      id: 'wvwhajzl',
      collection_id: 'r0rakxbm',
      paid: 'true',
      state: 'paid',
      amount: '1000',
      paid_amount: '1000',
      due_at: '2021-5-1',
      email: 'aiman2301@gmail.com',
      mobile: '',
      name: 'AIMAN DANIEL',
      url: 'https: //www.billplz-sandbox.com/bills/wvwhajzl',
      paid_at: '2021-05-01 15:57:18 +0800',
      x_signature: '4a485572f88707ec700246e1870c8a99499da83be36f74ca63ebe1fbb4739ac0',
    },

    get postmanData() {
      let output = [];

      for (const [key, value] of Object.entries(this.bill)) {
        output.push(`${key}:${value}`)
      }

      return output.join("\n")
    },

    get source_string() {
      // let data = [];

      // for (const [key, value] of Object.entries(this.bill)) {
      //   data.push([ key, value ])
      // }

      return this.buildSourceString(this.bill)
    },

    // https://github.com/locutusjs/locutus/blob/master/src/php/array/uksort.js
    uksort (inputArr, sorter) {
      const tmpArr = {}
      const keys = []
      let i = 0
      let k = ''
      let sortByReference = false
      let populateArr = {}

      if (typeof sorter === 'string') {
        sorter = this.window[sorter]
      }

      // Make a list of key names
      for (k in inputArr) {
        if (inputArr.hasOwnProperty(k)) {
          keys.push(k)
        }
      }

      // Sort key names
      try {
        if (sorter) {
          keys.sort(sorter)
        } else {
          keys.sort()
        }
      } catch (e) {
        return false
      }

      const iniVal = 'on'
      sortByReference = iniVal === 'on'
      populateArr = sortByReference ? inputArr : populateArr

      // Rebuild array with sorted key names
      for (i = 0; i < keys.length; i++) {
        k = keys[i]
        tmpArr[k] = inputArr[k]
        if (sortByReference) {
          delete inputArr[k]
        }
      }
      for (i in tmpArr) {
        if (tmpArr.hasOwnProperty(i)) {
          populateArr[i] = tmpArr[i]
        }
      }

      return sortByReference || populateArr
    },

    // https://github.com/locutusjs/locutus/blob/master/src/php/strings/strcasecmp.js
    strcasecmp (fString1, fString2) {
      const string1 = (fString1 + '').toLowerCase()
      const string2 = (fString2 + '').toLowerCase()

      if (string1 > string2) {
        return 1
      } else if (string1 === string2) {
        return 0
      }

      return -1
    },

    // data must be an array
    buildSourceString(data, prefix) {
      prefix = prefix || ''

      const sorter = function (a, b) {
        console.log(`firstItem: ${a} | secondItem: ${b}`)

        let a_len = a.length
        let b_len = b.length

        let result = this.strcasecmp(a, b)

        if (result === 0) {
          result = b_len - a_len
        }

        return result
      }

      // const sorter = (secondItem, firstItem) => {
      //   console.log(`firstItem: ${firstItem} | secondItem: ${secondItem}`)

      //   let key_1 = firstItem[0]
      //   let key_2 = firstItem[1]

      //   let key_1_len = key_1.length
      //   let key_2_len = key_2.length

      //   let result = this.strcasecmp(key_1, key_2)

      //   if (result === 0) {
      //     result = key_2_len - key_1_len
      //   }

      //   return result
      // }

      this.uksort(data, sorter)

      let processed = []

      for (const [key, value] of Object.entries(data)) {
        if (key == 'x_signature') continue;

        if (Array.isArray(value)) {
          processed.push(this.buildSourceString(value, key))
        } else {
          processed.push(prefix + key + value)
        }
      }

      return processed.join("|")
    },

    clickMe() {
      let hash = sha256.hmac.create(this.x_signature_key);
      hash.update(this.source_string);

      let x_signature = hash.hex();

      console.log(this.source_string)
      // console.log("x_sig: " + x_signature)
    }
  }
}