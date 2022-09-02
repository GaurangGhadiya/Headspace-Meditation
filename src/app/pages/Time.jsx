import React, { useState, useEffect } from "react";
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

import { ErrorToast, SuccessToast } from "../../helpers/Toast";
import { ka } from "date-fns/locale";

const Time = () => {
  const { Option } = Select;
  const location = useLocation();
  const [episodeList, setepisodeList] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [checkedList2, setCheckedList2] = useState([]);
  const [first, setFirst] = useState([]);
  const [apiFlag, setApiFlag] = useState([]);


  const getData = async () => {
    await ApiGet(`/admin/episode/get_${location?.search?.split("=")[1]}`)
      .then(async (res) => {
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
  const handleChecked = async (e, v) => {
    setCheckedList([...checkedList, v?._id]);
    let changeedData = episodeList?.map((k) => {
      if (k?._id == v?._id) {
        return { ...k, isMorning: e.target.checked ? 1 : 0 };
      } else {
        return k;
      }
    });
    setepisodeList(changeedData);

    // }
  };


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
      ApiPut(`/admin/episode/${location?.search?.split("=")[1]}/add`, body)
        .then((res) => {
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
    const dummy = episodeList?.filter(e => e?._id === value)
    setCheckedList(dummy);
  };
  
  const onChange2 = (value) => {
    const dummy = episodeList?.filter(e => e?._id === value)
    setCheckedList2(dummy);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };



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
       
      </div>
    </div>
  );
};

export default Time;
