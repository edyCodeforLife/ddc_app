import React from 'react';
import moment from 'moment';

const TrackingTable = (props) => (
  <React.Fragment>
    <table className="ddc_table">
      <thead>
        <tr>
          <th>Tanggal</th>
          <th>Status Tracking</th>
        </tr>
      </thead>
      <tbody>
        {props.trackings &&
          props.trackings.map((track) => (
            <tr key={track.id}>
              <td>
                <div>{moment(track.manifestDate).format('DD MMMM  YYYY')}</div>
                <div>{track.manifestTime}</div>
              </td>
              <td>{track.manifestDescription}</td>
            </tr>
          ))}
      </tbody>
    </table>
  </React.Fragment>
);

export default TrackingTable;
