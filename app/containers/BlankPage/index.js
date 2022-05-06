import React from 'react';
import { connect } from 'react-redux';
import Invoice from '../../components/InvoicePage/invoice';
import * as actions from '../../actions/index';


class InvoicePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: this.props.match.params.uuid,
    };
  }

  componentDidMount() {
    console.log('a');
    const query = `uuid:${this.state.uuid}`;
    const data = {
      query,
    };
    this.props.getTDSOrders(data);
    console.log(this.props.order);
  }

  render() {
    const bodyTag = document.getElementsByTagName('BODY')[0];
    bodyTag.classList.add('no-overflow');
    const order = this.props.order;
    console.log(order);
    return (
      order && this.props.order.map( ((i) => (
        <div
          id="invoiceBlankPage"
          key={i.id}
        >
          <div id="containerInvoice">
            <Invoice config={i} />
          </div>
        </div>
      )))
    );
  }
}

const mapStateToProps = (state) => ({
  order: state.get('requestTDS').orders,
});


const mapDispatchToProps = (dispatch) => ({
  getTDSOrders: (data) => dispatch(actions.getTDSOrders(data)),
  putTDSOrder: (data) => dispatch(actions.putTDSOrder(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvoicePage);
