// eslint-disable-next-line no-unused-vars
import React from 'react'
import {
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  View
} from 'react-native'
import PropTypes from 'prop-types'

function ListItem({ id, label, checked = false, onPress }) {
  const handlePress = () => {
    onPress(id)
  }
  return (
    <TouchableOpacity onPress={handlePress} style={styles.listItem}>
      <Text style={styles.textSize}>{label}</Text>
      {checked && <Text style={[styles.check, styles.textSize]}>✓</Text>}
    </TouchableOpacity>
  )
}

function SelectList({ value, data, onSelect }) {
  const handlePress = id => {
    onSelect(id)
  }

  const listItem = item => {
    const { id, label } = item.item
    return (
      <ListItem
        id={id}
        label={label}
        checked={id === value}
        onPress={handlePress}
      />
    )
  }

  return (
    <View style={styles.main}>
      <FlatList
        data={data}
        renderItem={listItem}
        keyExtractor={(item, i) => 's' + i + item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    flex: 1,
    backgroundColor: 'white'
  },
  listItem: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  check: {
    color: 'red'
  },
  separator: {
    height: 1,
    width: '100%',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  textSize: {
    fontSize: 16
  }
})

SelectList.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  data: PropTypes.array.isRequired,
  onSelect: PropTypes.func
}

export default SelectList
