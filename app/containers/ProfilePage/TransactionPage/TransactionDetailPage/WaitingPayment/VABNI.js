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
                    <Panel bordered={false} className="FontWeightHeader" header={`Cara Pembayaran via ${props.config.atmBNI.header}`} key="1">
                        <ol type="1">
                            <li dangerouslySetInnerHTML={{
                            __html: props.config.atmBNI.first,
                            }}>
                            </li>
                            <li dangerouslySetInnerHTML={{
                            __html: props.config.atmBNI.second,
                            }}>
                            </li>
                            <li dangerouslySetInnerHTML={{
                            __html: props.config.atmBNI.third,
                            }}>
                            </li>
                            <li dangerouslySetInnerHTML={{
                            __html: props.config.atmBNI.fourth,
                            }}>
                            </li>
                            <li dangerouslySetInnerHTML={{
                            __html: props.config.atmBNI.fifth,
                            }}>
                            </li>
                            <li dangerouslySetInnerHTML={{
                            __html: props.config.atmBNI.sixth,
                            }}>
                            </li>
                            <li dangerouslySetInnerHTML={{
                            __html: props.config.atmBNI.seventh,
                            }}>
                            </li>
                        </ol>
                    </Panel>
                </Collapse>
            </div>
        </div>
    )
}