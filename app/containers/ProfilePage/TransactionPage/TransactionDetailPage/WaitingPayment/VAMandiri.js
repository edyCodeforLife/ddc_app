import React from 'react';
import {Row, Col, Collapse} from 'antd';

const Panel = Collapse.Panel;
export default (props) => {
    return (
        <div>
            <div className="PaymentHowTo">
                <p><strong>Petunjuk Pembayaran</strong></p>
            </div>
            <div>
                <Collapse accordion bordered={false}>
                    <Panel bordered={false} className="FontWeightHeader" header={`Cara Pembayaran via ${props.config.atmMandiri.header}`} key="1">
                        <ol type="1">
                            <li dangerouslySetInnerHTML={{
                            __html: props.config.atmMandiri.first,
                            }}>
                            </li>
                            <li dangerouslySetInnerHTML={{
                            __html: props.config.atmMandiri.second,
                            }}>
                            </li>
                            <li dangerouslySetInnerHTML={{
                            __html: props.config.atmMandiri.third,
                            }}>
                            </li>
                            <li dangerouslySetInnerHTML={{
                            __html: props.config.atmMandiri.fourth,
                            }}>
                            </li>
                            <li dangerouslySetInnerHTML={{
                            __html: props.config.atmMandiri.fifth,
                            }}>
                            </li>
                        </ol>
                    </Panel>
                    <Panel bordered={false} className="FontWeightHeader" header={`Cara Pembayaran via ${props.config.inetBankMandiri.header}`} key="2">
                        <ol type="1">
                            <li dangerouslySetInnerHTML={{
                            __html: props.config.inetBankMandiri.first,
                            }}>
                            </li>
                            <li dangerouslySetInnerHTML={{
                            __html: props.config.inetBankMandiri.second,
                            }}>
                            </li>
                            <li dangerouslySetInnerHTML={{
                            __html: props.config.inetBankMandiri.third,
                            }}>
                            </li>
                            <li dangerouslySetInnerHTML={{
                            __html: props.config.inetBankMandiri.fourth,
                            }}>
                            </li>
                            <li dangerouslySetInnerHTML={{
                            __html: props.config.inetBankMandiri.fifth,
                            }}>
                            </li>
                        </ol>
                    </Panel>
                </Collapse>
            </div>
        </div>
    )
}