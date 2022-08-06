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
import { useHistory, useLocation } from "react-router-dom";

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
import { ka } from "date-fns/locale";

const Time = () => {
    const location = useLocation()
    console.log("location", location);
  const [episodeList, setepisodeList] = useState([]);
  const [checkedList, setCheckedList] = useState([])
  const [apiFlag, setApiFlag] = useState([]);

  const history = useHistory();
  console.log("checkedList", checkedList);

  const getData = async () => {
    await ApiGet(`/admin/episode/get_${location?.search?.split("=")[1]}`)
      .then((res) => {
        console.log("res", res);
        setepisodeList(res?.data?.data);
        // setApiFlag(res?.data?.data?.filter((v) => v?.isFeatured == true));
      })
      .catch((e) => {
        console.log("e", e);
      });


  };

  useEffect(() => {
    getData();
  }, []);
  console.log("apiFlag", apiFlag);
  const handleChecked = async (e, v) => {
    // if (apiFlag?.length > 3) {
    //   ErrorToast("You have only 4 course limit!");
    // } else {
      setCheckedList([...checkedList, v?._id])
let changeedData = episodeList?.map((k) => {
  if (k?._id == v?._id) {
    return { ...k, isMorning: e.target.checked ? 1 : 0 };
  } else {
    return k;
  }
});
console.log("changeedData", changeedData);
setepisodeList(changeedData);
      
    // }
  };

  console.log("episodeList", episodeList);

  const save = async() => {
   for(let v=0; v<checkedList?.length; v++){
    const body = {
      episodeId: checkedList[v],
    };
    ApiPut(`/admin/episode/${location?.search?.split("=")[1]}/add`, body)
      .then((res) => {
        console.log("res", res);
        getData();
        // setepisodeList(res?.data?.data);
        if (v == checkedList?.length-1){
            SuccessToast(`Meditation added in ${location?.search?.split("=")[1]}`);
        }
          
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
          <h3 className="card-label">Episode list</h3>
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
        <Table responsive>
          <thead>
            <tr>
              <th>Episode </th>
              <th>Title</th>
             
            </tr>
          </thead>
          <tbody>
            {episodeList?.map((v) => {
              return (
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      checked={(v?.isMorning ==1|| v?.isNight ==1 || v?.isAfternoon == 1) ? true : false}
                      onChange={(e) => handleChecked(e, v)}
                    />
                  </td>
                  <td>{v.title}</td>
                 
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Time;
