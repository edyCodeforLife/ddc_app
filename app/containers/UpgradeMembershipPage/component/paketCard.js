import React from 'react';
import { Row, Col, Icon, Button } from 'antd';
import NumberFormat from 'react-number-format';
import Placeholder from '../.././../../assets/images/CrashKatalog.png';

export class paketCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const hargaSRP = {
      fontSize: '14px',
      color: '#282828',
      fontWeight: 'bolder',
      letterSpacing: 'normal',
      fontStyle: 'normal',
      fontStretch: 'normal',
      paddingBottom: '15px',
      width: '100%',
    };
    const _this = this
    // console.log(this.props);
    return (
      <React.Fragment>
        <Row
          type="flex"
          justify="center"
          align="middle"
          style={{ paddingBottom: '30px' }}
        />
        <Row>
          {this.props.pilihPaket &&
            this.props.pilihPaket.map((data) => (
              data.quantity > 0 ? (
              <Row
                key={data.id}
                type="flex"
                justify="center"
                style={{
                  padding: 15,
                  background: '#cccccc29',
                  margin: '10px 0px',
                }}
              >
                {data.imageList && data.imageList[0] ? (
                  <div
                    style={{
                      backgroundImage: `url(${encodeURI(data.imageList[0].imagePath)})`,
                      width: '100%',
                      minHeight: 350,
                      backgroundSize: 'cover',
                      backgroundRepeatY: 'no-repeat',
                      borderRadius: '3px',
                      backgroundPosition: 'center center',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      backgroundImage: `url(${Placeholder})`,
                      width: '100%',
                      height: 375,
                      backgroundSize: 'cover',
                      backgroundRepeatY: 'no-repeat',
                      borderRadius: '3px',
                      backgroundPosition: 'center center',
                    }}
                  />
                )}
                <div className="describe__paket-item">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data.description,
                    }}
                  />
                  {data.isTrial == 0 && (
                    <Row className="standard__retail-price">
                      <Col span={8}>
                        <span style={hargaSRP}>Harga Normal : </span>
                      </Col>
                      <Col span={16}>
                        <strike>
                          <NumberFormat
                            value={data.standardRetailPrice}
                            displayType={'text'}
                            thousandSeparator
                            prefix={'Rp '}
                            style={hargaSRP}
                          />
                        </strike>
                      </Col>
                    </Row>
                  )}
                </div>
                <div className="describe__paket-item-price">
                  <NumberFormat
                    value={data.typePriceStarterKit}
                    displayType={'text'}
                    thousandSeparator
                    prefix={'Rp '}
                  />
                </div>
                <Button
                  type="primary"
                  className="btn-block"
                  onClick={() => this.props.onClickSelectProduct(data ,_this.props.isVoucher)}
                >
                  {data.name}
                </Button>
              </Row> ) : null
            ))}
        </Row>
      </React.Fragment>
    );
  }
}
export default paketCard;
