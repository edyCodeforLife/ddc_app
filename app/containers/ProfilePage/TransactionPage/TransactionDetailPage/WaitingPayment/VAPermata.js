import React from 'react';
import { Collapse } from 'antd';

const Panel = Collapse.Panel;
export default (props) => (
  <div>
    <div className="PaymentHowTo">
      <p>
        <strong>Petunjuk Pembayaran</strong>
      </p>
    </div>
    <div>
      <Collapse accordion bordered={false}>
        <Panel
          bordered={false}
          className="FontWeightHeader"
          header={`Cara Pembayaran via ${props.config.Mandiri.header}`}
          key="1"
        >
          <ol type="1">
            <li
              dangerouslySetInnerHTML={{
                __html: props.config.Mandiri.first,
              }}
            />
            <li
              dangerouslySetInnerHTML={{
                __html: props.config.Mandiri.second,
              }}
            />
            <li
              dangerouslySetInnerHTML={{
                __html: props.config.Mandiri.third,
              }}
            />
            <li
              dangerouslySetInnerHTML={{
                __html: props.config.Mandiri.fourth,
              }}
            />
            <li
              dangerouslySetInnerHTML={{
                __html: props.config.Mandiri.fifth,
              }}
            />
            <li
              dangerouslySetInnerHTML={{
                __html: props.config.Mandiri.sixth,
              }}
            />
            <li
              dangerouslySetInnerHTML={{
                __html: props.config.Mandiri.seventh,
              }}
            />
          </ol>
        </Panel>
        <Panel
          bordered={false}
          className="FontWeightHeader"
          header={`Cara Pembayaran via ${props.config.bankBCA.header}`}
          key="2"
        >
          <ol type="1">
            <li
              dangerouslySetInnerHTML={{
                __html: props.config.bankBCA.first,
              }}
            />
            <li
              dangerouslySetInnerHTML={{
                __html: props.config.bankBCA.second,
              }}
            />
            <li
              dangerouslySetInnerHTML={{
                __html: props.config.bankBCA.third,
              }}
            />
            <li
              dangerouslySetInnerHTML={{
                __html: props.config.bankBCA.fourth,
              }}
            />
            <li
              dangerouslySetInnerHTML={{
                __html: props.config.bankBCA.fifth,
              }}
            />
            <li
              dangerouslySetInnerHTML={{
                __html: props.config.bankBCA.sixth,
              }}
            />
            <li
              dangerouslySetInnerHTML={{
                __html: props.config.bankBCA.seventh,
              }}
            />
          </ol>
        </Panel>
        <Panel
          bordered={false}
          className="FontWeightHeader"
          header={`Cara Pembayaran via ${props.config.permata.header}`}
          key="3"
        >
          <ol type="1">
            <li
              dangerouslySetInnerHTML={{
                __html: props.config.permata.first,
              }}
            />
            <li
              dangerouslySetInnerHTML={{
                __html: props.config.permata.second,
              }}
            />
            <li
              dangerouslySetInnerHTML={{
                __html: props.config.permata.third,
              }}
            />
            <li
              dangerouslySetInnerHTML={{
                __html: props.config.permata.fourth,
              }}
            />
            <li
              dangerouslySetInnerHTML={{
                __html: props.config.permata.fifth,
              }}
            />
            <li
              dangerouslySetInnerHTML={{
                __html: props.config.permata.sixth,
              }}
            />
            <li
              dangerouslySetInnerHTML={{
                __html: props.config.permata.seventh,
              }}
            />
          </ol>
        </Panel>
      </Collapse>
    </div>
  </div>
  );
