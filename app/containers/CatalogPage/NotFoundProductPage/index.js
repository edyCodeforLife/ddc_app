import React from 'react';
import CustomImage from '../../../components/CustomImage/index';

export default (props) => (
    <div className="text-center" style= {{marginTop: '20%' }}>
        <div >
            <CustomImage name="dusdusan-sad.svg" style={{ maxWidth: '200px', maxHeight: '200px' }} />
        </div>
        <div className="mt-15 ContainerNotFoundProduct">
            <p style={{ maxWidth: '53%' }}>Maaf produk yang Anda cari tidak tersedia Silahkan ubah pencarian <strong>Kategori Produk</strong> </p>
        </div>
    </div>
);
