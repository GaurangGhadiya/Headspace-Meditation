import React, { useState, useEffect } from "react";
import { Button, Modal, Table } from "react-bootstrap";
// import AddVideo from "./AddVideo";
// import UpdateVideo from "./UpdateVideo";
import SVG from "react-inlinesvg";
import axios from "axios";
import { toAbsoluteUrl } from "../../_metronic/_helpers";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";

import {
  ApiDelete,
  ApiGet,
  ApiPost,
  ApiPut,
  Bucket,
} from "../../helpers/API/ApiData";
import { useHistory } from "react-router-dom";

import {
  Form,
  Input,
  // Button,
  Checkbox,
  Select,
  InputNumber,
  Col,
  Row,
  Radio,
  Upload,
  DatePicker,
  TimePicker,
} from "antd";
import { ErrorToast, SuccessToast } from "../../helpers/Toast";



const Feature = () => {
  const [courseList, setCourseList] = useState([])
  const [apiFlag, setApiFlag] = useState([])


  const history = useHistory();

  const getData = async () => {
 

    await ApiGet(`/admin/course/category/${window.location.pathname?.split("/")[2]}`)
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

    getData();
  }, []);
console.log("apiFlag", apiFlag);
  const handleChecked = async(e,v) =>{
    if(apiFlag?.length > 3 ){
        ErrorToast("You have only 4 course limit!")
    }else{
        const body = {
          courseId: v?._id,
          isFeatured: e.target.checked,
        };
        await ApiPut(`/admin/feature/course`, body)
          .then((res) => {
            console.log("res", res);
            getData();
            // setCourseList(res?.data?.data);
          })
          .catch((e) => {
            console.log("e", e);
          });
    }
  }

 
  return (
    <div className="card card-custom gutter-b">
      <div className="card-header">
        <div className="card-title">
          <h3 className="card-label">Course list</h3>
        </div>
        {/* <div className="card-toolbar">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setadd(true)}
          >
            Add Course
          </button>
        </div> */}
      </div>
      <div className="card-body">
        <Table responsive>
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
