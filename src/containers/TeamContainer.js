import { connect } from 'react-redux'
import Team from '../components/Team'
import { addMember } from '../state/actions/memberActions'

const mapDispatchToProps = {
  addMember
}

const mapStateToProps = state => ({
  members: state.members
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Team)
