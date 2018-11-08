//eslint-disable-next-line no-unused-vars
import React from 'react'
import { TextInput } from 'react-native'
import PropTypes from 'prop-types'

function EditableText({
  value,
  name,
  onChangeText,
  style,
  multiline = true,
  placeholder,
  editable,
  autoFocus,
  onBlur
}) {
  const handleChange = text => {
    const o = {}
    o[name] = text
    onChangeText(o)
  }
  return (
    <TextInput
      value={value}
      onChangeText={handleChange}
      style={[style, { borderBottomWidth: 0 }]}
      multiline={multiline}
      placeholder={placeholder}
      editable={editable}
      autoFocus={autoFocus}
      onBlur={onBlur}
      underlineColorAndroid="transparent"
    />
  )
}

EditableText.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  style: PropTypes.any,
  multiline: PropTypes.bool,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  editable: PropTypes.bool,
  autoFocus: PropTypes.bool,
  onBlur: PropTypes.func
}

export default EditableText
