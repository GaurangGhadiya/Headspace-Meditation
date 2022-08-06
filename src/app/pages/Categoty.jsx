import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { ApiGet } from '../../helpers/API/ApiData';

const Categoty = () => {
    const history = useHistory()
      const [category, setCategory] = useState([]);
 const getData = async () => {
   
   await ApiGet("/admin/category")
     .then((res) => {
       console.log("res", res);
       setCategory(res?.data?.data);
     })
     .catch((e) => {
       console.log("e", e);
     });
 };

 useEffect(() => {
   getData();
 }, []);
  return (
    <div>
      <h2>Feature</h2>
      <div className="row m-0 mt-3">
        {category?.map((v,i) => {
          return (
            <div
              className={`col  px-6 py-16  mr-7 mb-7  cursor-pointer d-flex justify-content-center align-items-center ${
                i == 0 ? "focus" : i == 1 ? "sleep" : "meditation"
              }`}
              onClick={() => history.push(`/feature/${v?._id}?name=${v?.name}`)}
            >
              <h2
                href="#"
                className="text-white text-capitalize font-weight-bold font-size-h2"
              >
                {v?.name}
              </h2>
            </div>
          );
        })}
      </div>

      {/* exploer section */}
      <h2 className='mt-4'>Explore</h2>
      <div className="row m-0 mt-3">
        {category?.map((v,i) => {
          return (
            <div
              className={`col  px-6 py-16  mr-7 mb-7  cursor-pointer d-flex justify-content-center align-items-center ${
                i == 0 ? "focus" : i == 1 ? "sleep" : "meditation"
              }`}
              onClick={() => history.push(`/explore/${v?._id}?name=${v?.name}`)}
            >
              <h2
                href="#"
                className="text-white text-capitalize font-weight-bold font-size-h2"
              >
                {v?.name}
              </h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Categoty