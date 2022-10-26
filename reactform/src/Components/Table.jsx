import React, { useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import {
  addNewStudent,
  deleteStudent,
  currentUser,
  editStudent,
} from "../redux/userStudent/UserStudent";

export default function Table() {
  const { arrStudent, user } = useSelector((state) => state.userStudent);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  console.log(arrStudent);
  const frm = useFormik({
    initialValues: {
      maSV: user.maSV,
      hoTen: user.hoTen,
      email: user.email,
      soDienThoai: user.soDienThoai,
    },
    validationSchema: yup.object().shape({
      email: yup.string().email("Email không đúng định dạng !"),
      maSV: yup
        .number()
        .typeError("Phải là số")
        .required("Mã sinh viên không được bỏ trống"),
      soDienThoai: yup
        .string()
        .required("Số điện thoại không được bỏ trống")
        .min(10, "Ít nhất 10 kí tự"),
      hoTen: yup.string().required("Họ tên không được bỏ trống"),
    }),
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: (values) => {
      if (edit) {
        dispatch(editStudent(values));
        setEdit(false);
        dispatch(
          currentUser({
            maSV: "",
            hoTen: "",
            email: "",
            soDienThoai: "",
          })
        );
      } else {
        const action = addNewStudent(values);
        dispatch(action);
      }
      frm.handleReset();
    },
  });

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-6 mx-auto">
          <h3 className="display-4 text-center">Thông tin sinh viên</h3>
          <form onSubmit={frm.handleSubmit}>
            <div className="row">
              <div className="col-6 form-group">
                <label>Mã Sinh Viên</label>
                <input
                  type="text"
                  className="form-control"
                  name="maSV"
                  onChange={frm.handleChange}
                  value={frm.values.maSV}
                  onBlur={frm.handleBlur}
                  disabled={edit}
                />
                {frm.touched.maSV && (
                  <p className="text text-danger">{frm.errors.maSV}</p>
                )}
              </div>
              <div className="col-6 form-group">
                <label>Tên Sinh Viên</label>
                <input
                  type="text"
                  className="form-control"
                  name="hoTen"
                  onChange={frm.handleChange}
                  value={frm.values.hoTen}
                  onBlur={frm.handleBlur}
                />
                {frm.touched.hoTen && (
                  <p className="text text-danger">{frm.errors.hoTen}</p>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-6 form-group">
                <label>Số điện thoại </label>
                <input
                  type="text"
                  className="form-control"
                  name="soDienThoai"
                  onChange={frm.handleChange}
                  value={frm.values.soDienThoai}
                  onBlur={frm.handleBlur}
                />
                {frm.touched.soDienThoai && (
                  <p className="text text-danger">{frm.errors.soDienThoai}</p>
                )}
              </div>
              <div className="col-6 form-group">
                <label>Email </label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  onChange={frm.handleChange}
                  value={frm.values.email}
                  onBlur={frm.handleBlur}
                />
                {frm.touched.email && (
                  <p className="text text-danger">{frm.errors.email}</p>
                )}
              </div>
            </div>
            <div className="form-group text-center mt-3">
              <div>
                <button type="submit" className="btn btn-success">
                  {edit ? "Chỉnh sửa" : "Thêm Sinh Viên"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="container">
        <div>
          {/* <label>Tìm kiếm </label>
          <input
            onChange={handleInputChange}
            placeholder="Search by username"
            enterButton
          /> */}
          <table className="table">
            <thead className="bg-danger">
              <tr>
                <th>Mã sinh viên</th>
                <th>Tên sinh viên</th>
                <th>Số điện thoại</th>
                <th>Email</th>
              </tr>
            </thead>
            {arrStudent.map((item, index) => (
              <tbody key={index}>
                <tr>
                  <th>{item.maSV}</th>
                  <th>{item.hoTen}</th>
                  <th>{item.soDienThoai}</th>
                  <th>{item.email}</th>
                  <th>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        const action = deleteStudent(item.maSV);
                        dispatch(action);
                      }}
                    >
                      Xóa
                    </button>
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        setEdit(true);
                        const action = currentUser(item);
                        dispatch(action);
                      }}
                    >
                      Sửa
                    </button>
                  </th>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}
