import React, { useState, useEffect } from "react";
import { Button, Modal, Table } from "react-bootstrap";

import { useHistory, useLocation } from "react-router-dom";

import {  SuccessToast } from "../../helpers/Toast";
import Search from "antd/lib/transfer/search";



const Feature = () => {
  const [courseList, setCourseList] = useState([])
  const [apiFlag, setApiFlag] = useState([])
    const [checkedList, setCheckedList] = useState([]);
    const [search, setSearch] = useState("")



  const history = useHistory();
  const location = useLocation()

  const getData = async (s) => {
 
const body = {
  id: window.location.pathname?.split("/")[2],
  search :s
};
    await ApiPost(`/admin/course/category`, body)
      .then((res) => {
        console.log("res", res);
        setCourseList(res?.data?.data);
        setApiFlag(res?.data?.data?.filter((v) => v?.isFeatured == true)) ;
      })
      .catch((e) => {
        console.log("e", e);
      });
  };

  useEffect(() => {

    getData(search);
  }, []);
   const onSearch = (e) => {
     setSearch(e);
     getData(e.target.value);
   };
console.log("apiFlag", apiFlag);
  const handleChecked = async(e,v) =>{
    // if(apiFlag?.length > 3 ){
    //     ErrorToast("You have only 4 course limit!")
    // }else{
      setCourseList(
        courseList?.map((u) =>
          u?._id == v?._id ? { ...u, isFeatured: e.target.checked } : u
        )
      );
      setCheckedList([
        ...checkedList,
        { courseId: v?._id, isFeatured: e.target.checked },
      ]);
       
    // }
  }

  const save = async () => {
    for (let v = 0; v < checkedList?.length; v++) {
       const body = {
         courseId: checkedList[v]?.courseId,
         isFeatured: checkedList[v]?.isFeatured,
       };
       await ApiPut(`/admin/feature/course`, body)
         .then((res) => {
           console.log("res", res);
           getData(search);
           // setCourseList(res?.data?.data);
           if (v == checkedList?.length - 1) {
             SuccessToast(`Feature list update sucessfully!`);
           }
         })
         .catch((e) => {
           console.log("e", e);
         });
    }
  };

 
  return (
    <div className="card card-custom gutter-b">
      <div className="card-header">
        <div className="card-title">
          <h3 className="card-label text-capitalize">
            {location.search?.split("=")[1]} Featured Course list
          </h3>
        </div>
        <div className="card-toolbar">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => save()}
          >
            Save
          </button>
        </div>
      </div>
      <div className="card-body">
        <Search
          placeholder=" Search..."
          onChange={(e) => onSearch(e)}
          enterButton
        />
        <Table responsive className="mt-3">
          <thead>
            <tr>
              <th>Feature </th>
              <th>Title</th>
              <th>Description</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {courseList?.map((v) => {
              return (
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      checked={v?.isFeatured}
                      onChange={(e) => handleChecked(e, v)}
                    />
                  </td>
                  <td>{v.title}</td>
                  <td>{v.description}</td>
                  <td>
                    <img src={v?.image} height={50} width={50} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Feature;
