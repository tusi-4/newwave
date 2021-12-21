import { connect } from 'react-redux';
import { getConcerts, getRequest, loadConcertsRequest } from '../../../redux/concertsRedux';
import PricesPage from './PricesPage';

const mapStateToProps = state => ({
  concerts: getConcerts(state),
  request: getRequest(state),
});

const mapDispatchToProps = dispatch => ({
  loadConcerts: () => dispatch(loadConcertsRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PricesPage);