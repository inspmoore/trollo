import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

function TextButton({ title, onPress, onLongPress, disabled }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={style.main}
      disabled={disabled}
    >
      <Text style={[style.title, disabled && { color: '#cdcdcd' }]}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
  main: {
    padding: 5
  },
  title: {
    color: '#007aff',
    fontSize: 20,
    fontWeight: 'bold'
  }
})

TextButton.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
  disabled: PropTypes.bool
}

export default TextButton
