import api from '@/store/api.js'

import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import isDate from 'date-fns/isDate'

export default {
    computed: {
        $api() {
          return api
        },
        mvDate() {
          return function (date) {
            if(!date) {
              return "";
            }
            let dateParsed = parseISO(date)
            if(isNaN(Date.parse(date))) {
              return dateParsed
            }
      
            return format(dateParsed, 'dd-MM-yyy')
          }
        }
      }
  }