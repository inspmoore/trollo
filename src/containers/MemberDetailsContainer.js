import { connect } from 'react-redux'
import { deleteMember, updateMember } from '../state/actions/memberActions'
import MemberDetails from '../components/MemberDetails'

const mapStateToProps = (state, ownProps) => {
  const { navigation } = ownProps
  const memberID = navigation.getParam('memberID')
  return {
    member: state.members.find(m => m.id === memberID)
  }
}

const mapDispatchToProps = {
  deleteMember,
  updateMember
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberDetails)
