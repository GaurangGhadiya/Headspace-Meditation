import React, { useState, useEffect } from "react";
import { Button, Modal, Table } from "react-bootstrap";
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
import { SuccessToast } from "../../helpers/Toast";

const data1 = [
  {
    title: "Love Song",
    description: "This is love songs",
    number: "5",
    date: "11/01/2022",
  },
  {
    title: "Sad Song",
    description: "This is Sad songs",
    number: "2",
    date: "15/01/2022",
  },
  {
    title: "Happy Song",
    description: "This is Happy songs",
    number: "45",
    date: "14/02/2022",
  },
];

const Expplore = () => {
  const [category, setCategory] = useState([]);
  const [add, setadd] = useState(false);
  const [addData, setaddData] = useState({ isPremium: false });
  const [update, setupdate] = useState(false);
  const [updateData, setupdateData] = useState({});
  const [videoId, setvideoId] = useState("");
  const [data, setdata] = useState([]);
  const [image, setimage] = useState("");

  const history = useHistory();
  const location = useLocation();

  const getData = async () => {
    const body = {
      page: 1,
      limit: 1000,
    };
    await ApiGet(`/admin/explore/category/${window.location.pathname?.split("/")[2]}`)
      .then((res) => {
        console.log("res", res);
        setdata(res?.data?.data);
      })
      .catch((e) => {
        console.log("e", e);
      });
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

  const handleEdit = async (v) => {
    setvideoId(v);
    await ApiGet(`/admin/explore/${v}`)
      .then((res) => {
        console.log("res", res);
        setupdateData(res?.data?.data);
        setimage(res?.data?.data?.image);

        setupdate(true);
      })
      .catch((e) => {
        console.log("e", e);
      });
  };

  console.log("updateData", updateData);

  const handleDelete = async (v) => {
    await ApiDelete(`/admin/explore/${v}`)
      .then((res) => {
        SuccessToast(res?.data?.message);

        getData();
        console.log("res", res);
        // setupdateData(res?.data?.data);
      })
      .catch((e) => {
        console.log("e", e);
      });
  };

  const props = {
    name: "file",
    maxCount: 1,
    accept: "image/*",
    listType: "picture",

    customRequest: (options) => {
      const data = new FormData();
      data.append("image", options.file);

      let headers = {
        Authorization: JSON.parse(localStorage.getItem("userinfo"))?.token,
      };
      axios
        .post("https://api.sinnesmeditation.com/upload/explore", data, {
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
  const props1 = {
    name: "file",
    maxCount: 1,
    accept: "image/*",
    listType: "picture",
    defaultFileList: [
      {
        uid: "1",
        name: "",
        status: "done",
        // response: "Server Error 500", // custom error message to show
        url: updateData?.image,
      },
    ],
    // action: "https://jitsi.api.pip-idea.tk/admin/upload/compress_image/profile",
    customRequest: (options) => {
      const data = new FormData();
      data.append("image", options.file);

      // ApiPost("/upload/compress_image/profile", data)
      //   .then((res) => {
      //     console.log("res", res);
      //     setimage(res?.data?.data?.image);
      //     options.onSuccess(res.data, options.file);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });

      let headers = {
        Authorization: JSON.parse(localStorage.getItem("userinfo"))?.token,
      };
      axios
        .post("https://api.sinnesmeditation.com/upload/explore", data, {
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
  const normFile = (e) => {
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

  const onFinish = (values) => {
    console.log("Success1:", values);

    const body = {
      title: values?.title,
      image: image,
      //   image: "1213",
      description: values?.description,
      categoryId: window.location.pathname?.split("/")[2]
    };
    ApiPost("/admin/explore/add", body).then(async (res) => {
      console.log("res add", res);
      SuccessToast(res?.data?.message);
      await getData();
      setaddData(values);
      modalClose();
    });
  };

  const onFinish2 = (values) => {
    console.log("Success:", values);

    const body = {
      title: values?.title,
      image: image,
      description: values?.description,
      //   courseId: ,
      categoryId: window.location.pathname?.split("/")[2],
      exploreId: updateData?._id,
    };
    ApiPut("/admin/explore/update", body).then(async (res) => {
      console.log("res add", res);
      SuccessToast(res?.data?.message);

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
          <h3 className="card-label text-capitalize">
            {" "}
            {location.search?.split("=")[1]} Explore Category list
          </h3>
        </div>
        <div className="card-toolbar">
          {data?.length <= 7 && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setadd(true)}
            >
              Add Items
            </button>
          )}
        </div>
      </div>
      <div className="card-body">
        <Table responsive>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Image</th>
              {/* <th>Episode Count </th> */}
              {/* <th>Created Date</th> */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((v) => {
              return (
                <tr>
                  <td>{v.title}</td>
                  <td>{v.description}</td>
                  <td>
                    <img src={v?.image} height={50} width={50} />
                  </td>

                  {/* <td>{v?.episodeCount}</td> */}

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

                    <a
                      title="Add customer"
                      className="btn btn-icon btn-light btn-hover-primary btn-sm"
                      onClick={() =>
                        history.push(
                          `/explore-episodes/${v._id}?name=${v?.title}?id=${
                            window.location.pathname?.split("/")[2]
                          }`
                        )
                      }
                    >
                      <span className="svg-icon svg-icon-md svg-icon-primary">
                        <SVG
                          src={toAbsoluteUrl(
                            "/media/svg/icons/Files/File-plus.svg"
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
            Add Course
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
            {/* <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "category is requried" }]}
            >
              <Select>
                {category?.map((v) => (
                  <Select.Option value={v?._id}>{v?.name}</Select.Option>
                ))}
              </Select>
            </Form.Item> */}
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "description is requried" }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item label="Document">
              <Form.Item
                name="dragger"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                //   noStyle
                rules={[{ required: true, message: "image is requried" }]}
              >
                <Upload.Dragger {...props}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-hint">
                    Click or drag file to this area to upload
                  </p>
                </Upload.Dragger>
                {/* <Upload {...props}>
                      <aButton icon={<UploadOutlined />}>
                        Click to Upload
                      </aButton>
                    </Upload> */}
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
            Update Course
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
              category: category?.find((v) => v?._id == updateData?.categoryId)
                ?.name,
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
            {/* <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "category is requried" }]}
            >
              <Select>
                {category?.map((v) => (
                  <Select.Option value={v?._id}>{v?.name}</Select.Option>
                ))}
              </Select>
            </Form.Item> */}
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "description is requried" }]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item label="Document">
              <Form.Item
                name="dragger"
                valuePropName="fileList"
                getValueFromEvent={normFile2}
                //   noStyle
                // rules={[{ required: true, message: "please upload file" }]}
              >
                <Upload.Dragger {...props1}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-hint">
                    Click or drag file to this area to upload
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

export default Expplore;
