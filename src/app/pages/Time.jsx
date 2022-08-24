import React, { useState, useEffect, useMemo } from "react";
import { Button, Modal, Table } from "react-bootstrap";
// import AddVideo from "./AddVideo";
// import UpdateVideo from "./UpdateVideo";
import SVG from "react-inlinesvg";
import axios from "axios";
import { toAbsoluteUrl } from "../../_metronic/_helpers";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import { Select } from "antd";

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
  // Select,
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
  const { Option } = Select;
  const location = useLocation();
  console.log("location", location);
  const [episodeList, setepisodeList] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [checkedList2, setCheckedList2] = useState([]);
  const [first, setFirst] = useState([]);
  const [apiFlag, setApiFlag] = useState([]);

  const history = useHistory();

  const getData = async () => {
    await ApiGet(`/admin/episode/get_${location?.search?.split("=")[1]}`)
      .then(async (res) => {
        console.log("res", res);
        await setCheckedList(
          res?.data?.data?.filter(
            (v) => v?.isMorning == 1 || v?.isAfternoon == 1 || v?.isNight == 1
          )
        );
        const bbb = res?.data?.data?.filter(
            (v) => v?.isMorning == 1 || v?.isAfternoon == 1 || v?.isNight == 1
          )
          await setCheckedList2([bbb[1]])
        await setepisodeList(res?.data?.data);
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
    setCheckedList([...checkedList, v?._id]);
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

  const save = async () => {
    let session = location?.search?.split("=")[1];
    if (
      (session == "morning" && checkedList?.length == 1 && checkedList2?.length == 1) ||
      session == "afternoon" ||
      session == "night"
    ) {
      const body = {};
      if (location?.search?.split("=")[1] == "morning") {
        body.episodeIds = [checkedList[0]?._id,checkedList2[0]?._id];
      } else {
        body.episodeId = checkedList[0]?._id;
      }
      console.log("body",body);
      ApiPut(`/admin/episode/${location?.search?.split("=")[1]}/add`, body)
        .then((res) => {
          console.log("res", res);
          getData();
          SuccessToast(
            `Meditation added in ${location?.search?.split("=")[1]}`
          );
        })
        .catch((e) => {
          console.log("e", e);
        });
    } else {
      ErrorToast("Both Fields are requried!");
    }
  };
  const onChange = (value) => {
    // setCheckedList([...checkedList, value]);
    const dummy = episodeList?.filter(e => e?._id === value)
    setCheckedList(dummy);
    console.log(`selected ${value}`);
  };
  
  console.log("checkedList", checkedList,checkedList2);
  const onChange2 = (value) => {
    const dummy = episodeList?.filter(e => e?._id === value)
    setCheckedList2(dummy);
    // checkedList[1] = value;
    console.log(`selected ${value}`);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  // const first = useMemo(
  //   () => episodeList?.length > 0 && episodeList?.filter((v) => v?.isMorning == 1),
  //   [episodeList]
  // );

  console.log("first", first);

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
      <div className="card-body d-flex justify-content-around">
        <Select
          showSearch
          placeholder="Select a episode"
          optionFilterProp="children"
          className="w-40"
          onChange={onChange}
          onSearch={onSearch}
          value={checkedList[0]?._id}
          defaultValue={{
            value: first?.[0]?._id,
            label: first?.[0]?.title,
          }}
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
        >
          {episodeList?.map((v) => {
            return <Option value={v?._id}>{v?.title}</Option>;
          })}
        </Select>

        {location?.search?.split("=")[1] == "morning" && (
          <Select
            showSearch
            placeholder="Select a episode"
            optionFilterProp="children"
            className="w-40"
            onChange={onChange2}
            onSearch={onSearch}
            value={checkedList2[0]?._id}
            defaultValue={{ value: first?.[1]?._id, label: first?.[1]?.title }}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            {episodeList?.map((v) => {
              return <Option value={v?._id}>{v?.title}</Option>;
            })}
          </Select>
        )}
        {/* <Table responsive>
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
        </Table> */}
      </div>
    </div>
  );
};

export default Time;
