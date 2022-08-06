import React from "react";
import { useHistory } from "react-router-dom";

export function Demo1Dashboard() {
  const history = useHistory();
  return (
    <>
      <div className="row">
        <div className="col-lg-12 col-xxl-12">
          {/* <MixedWidget1 className="card-stretch gutter-b" /> */}
          <div className={`card card-custom bg-gray-100 card-stretch gutter-b`}>
            <div
              className="card-body p-0 position-relative overflow-hidden"
              style={{ background: "#EEF0F8" }}
            >
              {/* Stat */}
              <div className="">
                <div className="row m-0">
                  <div
                    className="col focus px-6 py-20  mr-7 mb-7  cursor-pointer d-flex justify-content-center align-items-center"
                    onClick={() => history.push("/time?slug=morning")}
                  >
                    <p
                      href="#"
                      className="text-white font-weight-bold font-size-h2"
                    >
                      Start Your Day
                    </p>
                  </div>
                  <div
                    className="col sleep px-6 py-20  mr-7 mb-7  cursor-pointer d-flex justify-content-center align-items-center"
                    onClick={() => history.push("/time?slug=afternoon")}
                  >
                    <p
                      href="#"
                      className="text-white font-weight-bold font-size-h2"
                    >
                      Afternoon Lift
                    </p>
                  </div>
                  <div
                    className="col meditation px-6 py-20  mb-7  cursor-pointer d-flex justify-content-center align-items-center"
                    onClick={() => history.push("/time?slug=night")}
                  >
                    <p
                      href="#"
                      className="text-white font-weight-bold font-size-h2"
                    >
                      At Night
                    </p>
                  </div>
                </div>
              </div>

              {/* Resize */}
              <div className="resize-triggers">
                <div className="expand-trigger">
                  <div style={{ width: "411px", height: "461px" }} />
                </div>
                <div className="contract-trigger" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
