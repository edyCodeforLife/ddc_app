import React from 'react';
import { Helmet } from 'react-helmet';

const Midtrans = (props) => (
  <Helmet>
    {/* GET midtrans */}
    <script
      src="https://api.midtrans.com/v2/assets/js/midtrans.min.js"
      type="text/javascript"
    />
  </Helmet>
);

export default Midtrans;
