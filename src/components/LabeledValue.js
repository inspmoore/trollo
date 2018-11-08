// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

function LabeledValue({ label, value, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.textContainer}>
      <Text style={styles.textSize}>{label}</Text>
      <Text style={styles.textSize}>{value}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4
  },
  textSize: {
    fontSize: 16
  }
})

LabeledValue.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onPress: PropTypes.func
}

export default LabeledValue
