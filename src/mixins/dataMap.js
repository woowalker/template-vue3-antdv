import { get, find } from 'lodash/fp'

export default {
  computed: {
    $$dataMap () {
      return this.$store.getters.dataMap
    }
  },
  methods: {
    $$dataMap_getLabel (dataMapName, value) {
      return get('label')(find(['value', value])(this.$$dataMap[dataMapName])) || value
    }
  }
}
