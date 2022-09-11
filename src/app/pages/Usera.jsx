import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { ApiPost, ApiPut } from "../../helpers/API/ApiData";
import {  toAbsoluteUrl } from "../../_metronic/_helpers";
import SVG from "react-inlinesvg";


const Usera = () => {
     const [data, setdata] = useState([]);
     const [modalShow, setmodalShow] = useState(false);
     const [status, setstatus] = useState("block");
     const [rowId, setrowId] = useState("");

      const modalClose = () => {
        setmodalShow(false);
      };

      const getData = async () => {
        const body = {
          page: 1,
          limit: 999999,
        };
        await ApiPost("/admin/user", body).then((res) => {
          console.log("res", res);
          setdata(res?.data?.data?.user_data);
        });
      };

      useEffect(() => {
        getData();
      }, []);

      const handleModal = (v) => {
        setrowId(v);
        setmodalShow(true);
      };

      console.log("status", status);
      const submit = async () => {
        const body = {
          userId: rowId,
          isBlock: status === "block" ? true : false,
        };
        await ApiPut("/admin/user/block", body).then((res) => {
          getData();
          console.log(res);
        });
        modalClose();
      };
      console.log("data", data);


  return (
    <div>
      {" "}
      <div className="card card-custom gutter-b">
        <div class="card-header">
          <div class="card-title">
            <h3 class="card-label">Users list</h3>
          </div>
          {/* <div class="card-toolbar">
          <button type="button" class="btn btn-primary">
            New User
          </button>
        </div> */}
        </div>
        <div className="card-body">
          <Table responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Profile</th>
                <th>Email</th>
                <th>Status</th>
                {/* <th>Premium</th> */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((v) => {
                return (
                  <tr>
                    <td>{v.firstName}</td>
                    <td>
                      {v?.image ? (
                        <img
                          src={v.image}
                          className="img-fluid"
                          style={{
                            height: "50px",
                            width: "50px",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <img
                          style={{
                            height: "50px",
                            width: "50px",
                            objectFit: "cover",
                          }}
                          src="https://img.icons8.com/clouds/100/000000/user.png"
                          className="img-fluid"
                        />
                      )}
                    </td>
                    <td>{v.email}</td>
                    <td>
                      {v?.isBlock ? (
                        <div class="d-flex align-items-center">
                          <span class="label label-lg label-light-danger label-inline">
                            Blocked
                          </span>
                        </div>
                      ) : (
                        <div class="d-flex align-items-center">
                          <span class="label label-lg label-light-success label-inline">
                            Unblocked
                          </span>
                        </div>
                      )}
                    </td>
                    <td>
                      <a
                        title="Change status"
                        className="btn btn-icon btn-light btn-hover-info btn-sm"
                        onClick={() => handleModal(v._id)}
                      >
                        <span className="svg-icon svg-icon-md svg-icon-info">
                          <SVG
                            src={toAbsoluteUrl(
                              "/media/svg/icons/General/Settings-1.svg"
                            )}
                          ></SVG>
                        </span>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
        <Modal
          show={modalShow}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Status Change
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Select Satus</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => setstatus(e.target.value)}
                >
                  <option value="block">Block</option>
                  <option value="unblock">Unblock</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={modalClose}>Close</Button>
            <Button onClick={submit}>Submit</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Usera;
