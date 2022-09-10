import React, { useState, useEffect } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../_metronic/_helpers";
import { ApiDelete, ApiGet, ApiPost, ApiPut } from "../../helpers/API/ApiData";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";

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
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";



const Episodes = () => {
  const [add, setadd] = useState(false);
  const [addData, setaddData] = useState({ isPremium: false });
  const [update, setupdate] = useState(false);
  const [updateData, setupdateData] = useState({});
  const [videoId, setvideoId] = useState("");
  const [data, setdata] = useState([]);
  const [image, setimage] = useState("");
const [document, setDocument] = useState("")
  const history = useHistory();
  const location = useLocation();
  console.log("location", location);

  const getData = async () => {
    const body = {
      page: 1,
      limit: 10,
    };
    await ApiGet(`/admin/episode/course/${window.location.pathname?.split("/")[2]}`)
      .then((res) => {
        console.log("res", res);
        setdata(res?.data?.data);
      })
      .catch((e) => {
        console.log("e", e);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const props = {
    name: "file",
    maxCount: 1,
    accept: "image/*",
    listType: "picture",

    // action: "https://jitsi.api.pip-idea.tk/admin/upload/compress_image/profile",
    customRequest: (options) => {
      const data = new FormData();
      data.append("image", options.file);

      let headers = {
        Authorization: JSON.parse(localStorage.getItem("userinfo"))?.token,
      };
      axios
        .post("https://api.sinnesmeditation.com/upload/episode", data, {
          headers: headers,
        })
        .then((res) => {
          console.log("res image", res);
          setimage(res?.data?.data?.image);
          options.onSuccess(res.data, options.file);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    headers: {
      authorization: JSON.parse(localStorage.getItem("userinfo")).token,
    },

    onChange: (info) => {
      console.log(info.fileList);
    },
  };
  const propsDocs = {
    name: "file",
    maxCount: 1,
    accept: ".mp3,.mpeg,audio/*",
    listType: "picture",

    // action: "https://jitsi.api.pip-idea.tk/admin/upload/compress_image/profile",
    customRequest: (options) => {
      const data = new FormData();
      data.append("image", options.file);

      let headers = {
        Authorization: JSON.parse(localStorage.getItem("userinfo"))?.token,
      };
      axios
        .post("https://api.sinnesmeditation.com/upload/video", data, {
          headers: headers,
        })
        .then((res) => {
          console.log("res image", res);
          setDocument(res?.data?.data?.image);
          options.onSuccess(res.data, options.file);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    headers: {
      authorization: JSON.parse(localStorage.getItem("userinfo")).token,
    },

    onChange: (info) => {
      console.log(info.fileList);
    },
  };

  console.log("updateData", updateData);
  const props1 = {
    name: "file",
    maxCount: 1,
    accept: "image/*",
    // accept: "image/*",

    listType: "picture",
    defaultFileList: [
      {
        uid: "1",
        name: "image",
        status: "done",
        url: updateData?.image,
        // url:
        //   "https://meditation-abhi.s3.us-west-1.amazonaws.com/6238af81504e4d302cf97444/category/1648052228552.png",
      },
    ],
    customRequest: (options) => {
      const data = new FormData();
      data.append("image", options.file);

      let headers = {
        Authorization: JSON.parse(localStorage.getItem("userinfo"))?.token,
      };
      axios
        .post("https://api.sinnesmeditation.com/upload/episode", data, {
          headers: headers,
        })
        .then((res) => {
          console.log("res image", res);
          setimage(res?.data?.data?.image);
          options.onSuccess(res.data, options.file);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    headers: {
      authorization: JSON.parse(localStorage.getItem("userinfo")).token,
    },

    onChange: (info) => {
      console.log(info.fileList);
    },
  };
  const propsDocs1 = {
    name: "file",
    maxCount: 1,
    accept: ".mp3,.mpeg,audio/*",
    // accept: "image/*",

    listType: "picture",
    defaultFileList: [
      {
        uid: "1",
        name: "audio file",
        status: "done",
        url: updateData?.audioOrVideo,
        // url:
        //   "https://meditation-abhi.s3.us-west-1.amazonaws.com/6238af81504e4d302cf97444/category/1648052228552.png",
      },
    ],
    customRequest: (options) => {
      const data = new FormData();
      data.append("image", options.file);

      let headers = {
        Authorization: JSON.parse(localStorage.getItem("userinfo"))?.token,
      };
      axios
        .post("https://api.sinnesmeditation.com/upload/audio", data, {
          headers: headers,
        })
        .then((res) => {
          console.log("res image", res);
          setimage(res?.data?.data?.image);
          options.onSuccess(res.data, options.file);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    headers: {
      authorization: JSON.parse(localStorage.getItem("userinfo")).token,
    },

    onChange: (info) => {
      console.log(info.fileList);
    },
  };
  const handleEdit = async (v) => {
    setvideoId(v);
    await ApiGet(`/admin/episode/${v}`)
      .then((res) => {
        console.log("res", res);
        setupdateData(res?.data?.data);
        setimage(res?.data?.data?.audio);
        setDocument(res?.data?.data?.audioOrVideo);
      })
      .catch((e) => {
        console.log("e", e);
      });
    setupdate(true);
  };

  const handleDelete = async (v) => {
    await ApiDelete(`/admin/episode/${v}`)
      .then((res) => {
        getData();
        console.log("res", res);
        // setupdateData(res?.data?.data);
      })
      .catch((e) => {
        console.log("e", e);
      });
  };

  const onFinish = (values) => {
    console.log("Success:", values);

    let id = window.location.pathname?.split("/")[2];
    const body = {
      courseId: id,
      title: values?.title,
      image: image,
      audioOrVideo: document,
      description: values?.description,
    };
    ApiPost("/admin/episode/add", body).then(async (res) => {
      console.log("res add", res);
      await getData();
      // setaddData(values);
      modalClose();
    });
  };

  console.log("image:", image);
  const onFinish2 = (values) => {
    console.log("Success:", values);

    const body = {
      courseId: window.location.pathname?.split("/")[2],
      title: values?.title,
      image: image,
      description: values?.description,
      episodeId: updateData?._id,
      audioOrVideo :document
    };
    ApiPut("/admin/episode/update", body).then(async (res) => {
      console.log("res add", res);
      await getData();
      //  setupdateData(values);
      modalClose2();
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onFinishFailed2 = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const normFileDoc = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const normFileDoc2 = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const normFile2 = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  console.log("addDta", addData);

  const modalClose = () => {
    setadd(false);
  };
  const modalClose2 = () => {
    setupdate(false);
  };
  return (
    <div className="card card-custom gutter-b">
      <div className="card-header">
        <div className="card-title">
          <h3 className="card-label"> {location.search?.split("=")[1]} Episodes list</h3>
        </div>
        <div className="card-toolbar">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setadd(true)}
          >
            Add Episodes
          </button>
        </div>
      </div>
      <div className="card-body">
        <Table responsive>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              {/* <th>No. of songs</th> */}
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((v) => {
              return (
                <tr>
                  <td>{v?.title}</td>
                  <td>{v?.description}</td>
                  {/* <td >{v.number}</td> */}
                  <td>
                    <img src={v?.image} height={50} width={50} />
                  </td>

                  <td className="d-flex">
                    <a
                      title="Edit customer"
                      className="btn btn-icon btn-light btn-hover-primary btn-sm "
                      onClick={() => handleEdit(v._id)}
                    >
                      <span className="svg-icon svg-icon-md svg-icon-primary">
                        <SVG
                          src={toAbsoluteUrl(
                            "/media/svg/icons/Communication/Write.svg"
                          )}
                        />
                      </span>
                    </a>
                    <> </>

                    <a
                      title="Delete customer"
                      className="btn btn-icon btn-light btn-hover-danger btn-sm mx-3"
                      onClick={() => handleDelete(v._id)}
                    >
                      <span className="svg-icon svg-icon-md svg-icon-danger">
                        <SVG
                          src={toAbsoluteUrl(
                            "/media/svg/icons/General/Trash.svg"
                          )}
                        />
                      </span>
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      {/* <AddVideo show={add} onHide={modalClose} /> */}
      <Modal
        show={add}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Episode
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pb-0">
          <Form
            name="basic"
            //   labelCol={{ span: 4 }}
            //   wrapperCol={{ span: 16 }}
            // initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            autoComplete="off"
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "title is requried" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "description is requried" }]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item label="Image">
              <Form.Item
                name="dragger"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                //   noStyle
                rules={[{ required: true, message: "file upload is requried" }]}
              >
                <Upload.Dragger {...props}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-hint">
                    Click or drag audio file to this area to upload
                  </p>
                </Upload.Dragger>
              </Form.Item>
            </Form.Item>
            <Form.Item label="Audio Or Video">
              <Form.Item
                name="dragger1"
                valuePropName="fileList1"
                getValueFromEvent={normFileDoc}
                //   noStyle
                rules={[{ required: true, message: "file upload is requried" }]}
              >
                <Upload.Dragger {...propsDocs}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-hint">
                    Click or drag audio file to this area to upload
                  </p>
                </Upload.Dragger>
              </Form.Item>
            </Form.Item>

            <Form.Item className="text-right pt-3">
              <Button onClick={modalClose} className="mr-2">
                Close
              </Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal.Body>
      </Modal>
      {/* <UpdateVideo show={update} onHide={modalClose2} id={updateid} /> */}
      <Modal
        // {...props}
        show={update}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update Episode
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            name="basic"
            //   labelCol={{ span: 4 }}
            //   wrapperCol={{ span: 16 }}
            // initialValues={{ remember: true }}
            initialValues={{
              title: updateData?.title,
              // dragger: updateData?.image,
              description: updateData?.description,
            }}
            onFinish={onFinish2}
            onFinishFailed={onFinishFailed2}
            layout="vertical"
            autoComplete="off"
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "title is requried" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "description is requried" }]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item label="Image">
              <Form.Item
                name="dragger"
                valuePropName="fileList"
                getValueFromEvent={normFile2}
                //   noStyle
                // rules={[{ required: true, message: "file upload is requried" }]}
              >
                <Upload.Dragger {...props1}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-hint">
                    Click or drag audio file to this area to upload
                  </p>
                </Upload.Dragger>
              </Form.Item>
            </Form.Item>
            <Form.Item label="Audio Or Video">
              <Form.Item
                name="dragger1"
                valuePropName="fileList1"
                getValueFromEvent={normFileDoc2}
                //   noStyle
                // rules={[{ required: true, message: "file upload is requried" }]}
              >
                <Upload.Dragger {...propsDocs1}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-hint">
                    Click or drag audio file to this area to upload
                  </p>
                </Upload.Dragger>
              </Form.Item>
            </Form.Item>

            <Form.Item className="text-right pt-3">
              <Button onClick={modalClose2} className="mr-2">
                Close
              </Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Episodes;
