import React from 'react';
import {Collapse} from 'antd';

const Panel = Collapse.Panel;
export default (props) => {
    return (
        <div>
            <div className="PaymentHowTo">
                <p style={{width: '100%'}}><strong>Petunjuk Pembayaran</strong></p>
            </div>
            <div>
                <Collapse accordion bordered={false}>
                    <Panel className="FontWeightHeader" bordered={false} header={`Cara Pembayaran via ${props.config.atmBCA.header}`} key="1">
                        <ol type="1">
                            <li dangerouslySetInnerHTML={{
                            __html: props.config.atmBCA.first,
                            }}>
                            </li>
                            <li dangerouslySetInnerHTML={{
                            __html: props.config.atmBCA.second,
                            }}>
                            </li>
                            <li dangerouslySetInnerHTML={{
                            __html: props.config.atmBCA.third,
                            }}>
                            </li>
                            <li dangerouslySetInnerHTML={{
                            __html: props.config.atmBCA.fourth,
                            }}>
                            </li>
                            <li dangerouslySetInnerHTML={{
                            __html: props.config.atmBCA.fifth,
                            }}>
                            </li>
                        </ol>
                    </Panel>
                    <Panel bordered={false} className="FontWeightHeader" header={`Cara Pembayaran via ${props.config.mBCA.header}`} key="2">
                        <ol type="1">
                            <li dangerouslySetInnerHTML={{
                            __html: props.config.mBCA.first,
                            }}>
                            </li>
                            <li dangerouslySetInnerHTML={{
                            __html: props.config.mBCA.second,
                            }}>
                            </li>
                            <li dangerouslySetInnerHTML={{
                            __html: props.config.mBCA.third,
                            }}>
                            </li>
                            <li dangerouslySetInnerHTML={{
                            __html: props.config.mBCA.fourth,
                            }}>
                            </li>
                            <li dangerouslySetInnerHTML={{
                            __html: props.config.mBCA.fifth,
                            }}>
                            </li>
                            <li dangerouslySetInnerHTML={{
                            __html: props.config.mBCA.sixth,
                            }}>
                            </li>
                            <li dangerouslySetInnerHTML={{
                            __html: props.config.mBCA.seventh,
                            }}>
                            </li>
                            <li dangerouslySetInnerHTML={{
                            __html: props.config.mBCA.eighth,
                            }}>
                            </li>
                            <li dangerouslySetInnerHTML={{
                            __html: props.config.mBCA.ninth,
                            }}>
                            </li>
                        </ol>
                    </Panel>
                    <Panel bordered={false} className="FontWeightHeader" header={`Cara Pembayaran via ${props.config.klikBCA.header}`} key="3">
                        <ol type="1">
                            <li dangerouslySetInnerHTML={{
                                __html: props.config.klikBCA.first,
                            }}>
                            </li>
                            <li dangerouslySetInnerHTML={{
                                __html: props.config.klikBCA.second,
                            }}>
                            </li>
                            <li dangerouslySetInnerHTML={{
                            __html: props.config.klikBCA.third,
                            }}>
                            </li>
                            <li dangerouslySetInnerHTML={{
                            __html: props.config.klikBCA.fourth,
                            }}>
                            </li>
                            <li dangerouslySetInnerHTML={{
                            __html: props.config.klikBCA.fifth,
                            }}>
                            </li>
                            <li dangerouslySetInnerHTML={{
                            __html: props.config.klikBCA.sixth,
                            }}>
                            </li>
                        </ol>
                    </Panel>
                </Collapse>
            </div>
        </div>
    )
}